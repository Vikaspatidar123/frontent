/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	isActive: defaultValue?.isActive || false,
	subcategoryImage: defaultValue?.subcategoryImage || '',
	gameCategoryId: defaultValue?.gameCategoryId || '',
});

const validateName = (name) => {
	const validationObject = {};
	for (const file in name) {
		validationObject[file] = Yup.string()
			.required('Label Name Required!')
			.nullable();
	}
	return Yup.object(validationObject);
};

const validationSchema = (name) =>
	Yup.object().shape({
		name: validateName(name),
		subcategoryImage: Yup.mixed()
			.required('Image Required')
			.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
		gameCategoryId: Yup.string().required('Game Category Required'),
	});

const staticFormFields = [
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
	{
		name: 'subcategoryImage',
		fieldType: 'file',
		label: 'Thumbnail',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
