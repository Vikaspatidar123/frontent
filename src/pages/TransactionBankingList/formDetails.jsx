import * as Yup from 'yup';
import { statusType, transactionType } from './constants';

const staticFiltersFields = () => [
	{
		name: 'transactionType',
		fieldType: 'select',
		label: '',
		placeholder: 'Transaction type',
		optionList: transactionType.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'actioneeType',
		fieldType: 'select',
		label: '',
		placeholder: 'Actionee Type',
		optionList: [
			{
				value: 'user',
				optionLabel: 'User',
			},
			{
				value: 'admin',
				optionLabel: 'Admin',
			},
		],
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: statusType.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'paymentProvider',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by payment provider',
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];

const filterValues = () => ({
	paymentProvider: '',
	status: null,
	actioneeType: null,
	startDate: null,
	endDate: null,
	currencyCode: null,
	transactionType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		paymentProvider: Yup.string().nullable(),
		status: Yup.string().nullable(),
		actioneeType: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
