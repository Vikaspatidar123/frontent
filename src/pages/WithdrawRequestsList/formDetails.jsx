import * as Yup from 'yup';
import { STATUS } from './constants';

const staticFiltersFields = () => [
	{
		name: 'search',
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
	search: '',
	status: null,
	startDate: null,
	endDate: null,
	paymentProvider: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		paymentProvider: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
