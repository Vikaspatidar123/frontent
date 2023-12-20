import * as Yup from 'yup';
import moment from 'moment';
import { statusType, LEDGER_TYPES, LEDGER_PURPOSE } from './constants';

const staticFiltersFields = () => [
	{
		name: 'transactionType',
		fieldType: 'select',
		label: '',
		placeholder: 'Transaction type',
		optionList: LEDGER_TYPES.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'ledgerPurpose',
		fieldType: 'select',
		label: '',
		placeholder: 'Ledger Purpose',
		optionList: LEDGER_PURPOSE.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	// {
	// 	name: 'actioneeType',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Actionee Type',
	// 	optionList: [
	// 		{
	// 			value: 'user',
	// 			optionLabel: 'User',
	// 		},
	// 		{
	// 			value: 'admin',
	// 			optionLabel: 'Admin',
	// 		},
	// 	],
	// },
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
		name: 'actineeName',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by Actionee',
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
	paymentProvider: '',
	status: null,
	// actioneeType: null,
	startDate,
	endDate,
	currency: null,
	transactionType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		paymentProvider: Yup.string().nullable(),
		status: Yup.string().nullable(),
		// actioneeType: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currency: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
