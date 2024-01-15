import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	userId: defaultValue?.userId || '',
	description: defaultValue?.comment || '',
	rating: defaultValue?.rating || 1,
	isActive: defaultValue?.isActive || false,
});

const validationSchema = () =>
	Yup.object().shape({
		userId: Yup.string().required('UserId Required'),
		description: Yup.string().required('Description Required'),
		rating: Yup.number().required().positive(),
		isActive: Yup.boolean().required(),
	});

const staticFormFields = [
	{
		name: 'userId',
		fieldType: 'textField',
		label: 'User Id',
		placeholder: 'Enter User Id',
	},
	{
		name: 'description',
		fieldType: 'textField',
		label: 'Description',
		placeholder: 'Enter description',
	},
	{
		name: 'rating',
		fieldType: 'select',
		label: 'Rating',
		placeholder: 'Select rating',
		optionList: [
			{
				id: 1,
				optionLabel: 1,
				value: 1,
			},
			{
				id: 2,
				optionLabel: 1.5,
				value: 1.5,
			},
			{
				id: 3,
				optionLabel: 2,
				value: 2,
			},
			{
				id: 4,
				optionLabel: 2.5,
				value: 2.5,
			},
			{
				id: 5,
				optionLabel: 3,
				value: 3,
			},
			{
				id: 6,
				optionLabel: 3.5,
				value: 3.5,
			},
			{
				id: 7,
				optionLabel: 4,
				value: 4,
			},
			{
				id: 8,
				optionLabel: 4.5,
				value: 4.5,
			},
			{
				id: 9,
				optionLabel: 5,
				value: 5,
			},
		],
	},
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
];

// Filters
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title and description',
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: 'true',
			},
			{
				id: 2,
				optionLabel: 'In Active',
				value: 'false',
			},
		],
	},
];

const filterValues = () => ({
	status: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
