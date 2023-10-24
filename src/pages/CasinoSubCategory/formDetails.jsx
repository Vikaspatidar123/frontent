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
		showThumbnail: true,
	},
];

// Filters

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title or Slug',
	},
	{
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'In Active',
				value: false,
			},
		],
	},
];

const filterValues = () => ({
	isActive: null,
	search: '',
	gameCategoryId: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
		gameCategoryId: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
