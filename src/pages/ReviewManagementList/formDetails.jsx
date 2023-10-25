import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	userName: defaultValue?.username || '',
	description: defaultValue?.description || '',
	rating: defaultValue?.rating || 1,
	status: defaultValue?.status || false,
});

const validationSchema = () =>
	Yup.object().shape({
		userName: Yup.string()
			.max(50, 'User Name must be less than 50 characters')
			.matches(/^[A-Za-z0-9 ]+$/, 'Only Alpha-Numeric Values Allowed')
			.required('UserName Required'),
		description: Yup.string().required('Description Required'),
		rating: Yup.number().required().positive(),
		status: Yup.boolean().required(),
	});

const staticFormFields = [
	{
		name: 'userName',
		fieldType: 'textField',
		label: 'Username',
		placeholder: 'Enter Provider name',
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
		name: 'status',
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
