import * as Yup from 'yup';

const staticFiltersFields = () => [
	{
		name: 'email',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email',
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];

const filterValues = () => ({
	email: '',
	status: null,
	startDate: null,
	endDate: null,
	currencyCode: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
