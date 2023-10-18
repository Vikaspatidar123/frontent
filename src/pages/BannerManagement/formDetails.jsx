/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import * as Yup from 'yup';
import { bannerType } from './constants';

const getInitialValues = (defaultValue) => ({
	bannerType: defaultValue?.type || '',
	thumbnail: defaultValue?.thumbnail || '',
});

const staticFormFields = [
	{
		name: 'thumbnail',
		fieldType: 'file',
		label: 'Banner',
	},
];

const validationSchema = ({
	type,
	minRequiredWidth,
	minRequiredHeight,
	maxRequiredWidth,
	maxRequiredHeight,
}) =>
	Yup.object().shape({
		bannerType: Yup.string().required('Banner Type Required'),
		thumbnail:
			type === 'Create'
				? Yup.mixed()
						.required('Banner Required')
						.imageDimensionCheck(
							'Banner Required',
							minRequiredWidth,
							minRequiredHeight,
							maxRequiredWidth,
							maxRequiredHeight
						)
						.test(
							'FILE_FORMAT',
							'Uploaded file has unsupported format.',
							(value) =>
								!value ||
								(value &&
									[
										'image/png',
										'image/jpeg',
										'image/jpg',
										'image/svg+xml',
									].includes(value.type))
						)
				: Yup.mixed()
						.imageDimensionCheck(
							'Banner Required',
							minRequiredWidth,
							minRequiredHeight,
							maxRequiredWidth,
							maxRequiredHeight
						)
						.test(
							'FILE_FORMAT',
							'Uploaded file has unsupported format.',
							(value) =>
								!value ||
								(value &&
									[
										'image/png',
										'image/jpeg',
										'image/jpg',
										'image/svg+xml',
									].includes(value.type))
						),
	});

const imageWidthAndHeight = (provideFile) => {
	// take the given file (which should be an image) and return the width and height
	const imgDimensions = { width: null, height: null };

	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.readAsDataURL(provideFile);
		reader.onload = function () {
			const img = new Image();
			img.src = reader.result;

			img.onload = function () {
				imgDimensions.width = img.width;
				imgDimensions.height = img.height;

				resolve(imgDimensions);
			};
		};
	});
};

const imageDimensionCheck = Yup.addMethod(
	Yup.mixed,
	'imageDimensionCheck',
	function (
		message,
		minRequiredWidth,
		minRequiredHeight,
		maxRequiredWidth,
		maxRequiredHeight
	) {
		return this.test(
			'image-width-height-check',
			message,
			async function (value) {
				const { path, createError } = this;

				if (!value) {
					return;
				}

				const imgDimensions = await imageWidthAndHeight(value);

				if (
					imgDimensions.width < minRequiredWidth ||
					imgDimensions.width > maxRequiredWidth
				) {
					return createError({
						path,
						message: `The image width needs to be between ${minRequiredWidth}px - ${maxRequiredWidth}px!`,
					});
				}

				if (
					imgDimensions.height < minRequiredHeight ||
					imgDimensions.height > maxRequiredHeight
				) {
					return createError({
						path,
						message: `The image height needs to be between ${minRequiredHeight}px - ${maxRequiredHeight}px!`,
					});
				}
				return true;
			}
		);
	}
);

export { getInitialValues, staticFormFields, validationSchema };
