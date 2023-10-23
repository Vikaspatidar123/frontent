import * as Yup from 'yup';

// Language filter
const staticFiltersFields = () => [
	{
		name: 'name',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search language',
	},
];

const filterValues = () => ({
	name: '',
});

const filterValidationSchema = () =>
	Yup.object({
		name: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
