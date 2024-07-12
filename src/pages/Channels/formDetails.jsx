import * as Yup from 'yup';

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title and description',
	},
];

const filterValues = () => ({
	isActive: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
