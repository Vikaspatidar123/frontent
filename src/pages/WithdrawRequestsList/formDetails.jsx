import * as Yup from 'yup';
import { STATUS } from './constants';

const staticFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name and email',
	},
	{
		name: 'paymentProvider',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by payment provider',
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: STATUS,
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];

const filterValues = () => ({
	searchString: '',
	status: null,
	fromDate: null,
	toDate: null,
	paymentProvider: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
		status: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		paymentProvider: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
