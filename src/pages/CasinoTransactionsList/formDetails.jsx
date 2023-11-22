import * as Yup from 'yup';
import moment from 'moment';
import { transactionType } from './constants';

const staticFiltersFields = () => [
	{
		name: 'transactionType',
		fieldType: 'select',
		label: '',
		placeholder: 'Transaction Type',
		optionList: transactionType.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
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
const startDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
const endDate = new Date(); // Do not define it inside filterValue function

const filterValues = () => ({
	email: '',
	// status: null,
	startDate,
	endDate,
	currencyCode: null,
	transactionType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		// status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
