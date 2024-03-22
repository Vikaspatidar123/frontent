import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	bannerId: defaultValue?.bannerId || '',
	file: defaultValue?.file || '',
});

const staticFormFields = [
	{
		name: 'file',
		fieldType: 'file',
		label: 'Banner',
		showThumbnail: true,
	},
];

Yup.addMethod(
	Yup.mixed,
	'imageDimensions',
	(minW, minH, maxW, maxH, errorMessage) =>
		Yup.mixed().test(
			'imageDimensions',
			errorMessage,
			(value) =>
				!value ||
				(value &&
					value.type.startsWith('image/') &&
					new Promise((resolve) => {
						const img = new Image();
						img.onerror = () => resolve(false);
						img.onload = () => {
							if (
								img.width >= minW &&
								img.height >= minH &&
								img.width <= maxW &&
								img.height <= maxH
							) {
								resolve(true);
							} else {
								resolve(false);
							}
						};
						img.src = URL.createObjectURL(value);
					}))
		)
);

const validationSchema = ({
	minRequiredWidth,
	minRequiredHeight,
	maxRequiredWidth,
	maxRequiredHeight,
}) =>
	Yup.object().shape({
		file: Yup.mixed()
			.required('Banner Required')
			.imageDimensions(
				minRequiredWidth,
				minRequiredHeight,
				maxRequiredWidth,
				maxRequiredHeight,
				`Image dimensions must be between ${minRequiredWidth}x${minRequiredHeight} and ${maxRequiredWidth}x${maxRequiredHeight}.`
			)
			.when(
				'$isFilePresent',
				(isFilePresent, schema) =>
					isFilePresent &&
					schema.test(
						'FILE_SIZE',
						'Please select any file.',
						(value) =>
							value && (typeof value === 'string' ? true : value.size > 0)
					)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							[
								'image/png',
								'image/jpeg',
								'image/jpg',
								'image/svg+xml',
							].includes(value.type))
			),
	});

export { getInitialValues, staticFormFields, validationSchema };
