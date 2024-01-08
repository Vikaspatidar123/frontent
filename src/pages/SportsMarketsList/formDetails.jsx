import * as Yup from 'yup';

// Filters
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		// type: 'search',
		label: '',
		placeholder: 'Search by name',
	},
];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
