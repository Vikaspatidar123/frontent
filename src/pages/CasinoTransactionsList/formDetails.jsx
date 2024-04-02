import * as Yup from 'yup';
import moment from 'moment';
import { ACTION_TYPES, statusType } from './constants';

const staticFiltersFields = () => [
	// {
	// 	name: 'gameId',
	// 	fieldType: 'textField',
	// 	placeholder: 'Search by gameId',
	// 	type: 'search',
	// },
	{
		name: 'walletId',
		fieldType: 'textField',
		placeholder: 'Search by walletId',
		type: 'search',
	},
	// {
	// 	name: 'actioneeId',
	// 	fieldType: 'textField',
	// 	placeholder: 'Search by actioneeId',
	// 	type: 'search',
	// },
	{
		name: 'transactionId',
		fieldType: 'textField',
		placeholder: 'Search by transactionId',
		type: 'search',
	},
	{
		name: 'conversionRate',
		fieldType: 'textField',
		placeholder: 'Search by conversionRate',
		type: 'search',
	},
	// {
	// 	name: 'previousTransactionId',
	// 	fieldType: 'textField',
	// 	placeholder: 'Search by previousTransactionId',
	// 	type: 'search',
	// },
	// {
	// 	name: 'transactionType',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Action Type',
	// 	optionList: ACTION_TYPES.map(({ value, label }) => ({
	// 		id: value,
	// 		value,
	// 		optionLabel: label,
	// 	})),
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
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];
const fromDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
const toDate = new Date(); // Do not define it inside filterValue function

const filterValues = () => ({
	fromDate: '',
	toDate: '',
	gameId: '',
	walletId: '',
	actioneeId: '',
	transactionId: '',
	conversionRate: '',
	previousTransactionId: '',
	// transactionType: null,
	status: null,
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
		gameId: Yup.string().nullable(),
		walletId: Yup.string().nullable(),
		actioneeId: Yup.string().nullable(),
		transactionId: Yup.string().nullable(),
		conversionRate: Yup.string().nullable(),
		previousTransactionId: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
