import * as Yup from 'yup';
import { BET_TYPES, LEDGER_PURPOSE, STATUS_TYPE } from './constants';
import { defaultCurrencyId } from '../../constants/config';

const staticFiltersFields = (userId = '') => [
	{
		name: 'searchString',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email or username',
		isHide: !!userId,
	},
	{
		name: 'transactionId',
		fieldType: 'textField',
		placeholder: 'Search by transaction id',
		type: 'search',
	},
	{
		name: 'betId',
		fieldType: 'textField',
		placeholder: 'Search by bet id',
		type: 'search',
	},
	{
		name: 'betType',
		fieldType: 'select',
		label: '',
		placeholder: 'Bet Type',
		optionList: BET_TYPES.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'purpose',
		fieldType: 'select',
		label: '',
		placeholder: 'Transaction Type',
		optionList: LEDGER_PURPOSE.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: STATUS_TYPE.map(({ value, label }) => ({
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
// const fromDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
// const toDate = new Date(); // Do not define it inside filterValue function

const filterValues = () => ({
	searchString: '',
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
	currencyId: defaultCurrencyId,
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
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
		currencyId: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
