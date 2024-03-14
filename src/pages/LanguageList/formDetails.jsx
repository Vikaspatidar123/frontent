import * as Yup from 'yup';

// Language filter
const staticFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		// type: 'search',
		label: '',
		placeholder: 'Search language',
	},
];

const filterValues = () => ({
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
