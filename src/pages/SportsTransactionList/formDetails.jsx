import * as Yup from 'yup';
import {
	LEDGER_PURPOSE,
	LEDGER_TYPES,
	statusType,
} from '../CasinoTransactionsList/constants';

const staticFiltersFields = () => [
	{
		name: 'email',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email',
	},
	{
		name: 'transactionType',
		fieldType: 'select',
		label: '',
		placeholder: 'Transaction Type',
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

const filterValues = () => ({
	email: '',
	status: null,
	startDate: null,
	endDate: null,
	transactionType: null,
	ledgerPurpose: null,
	// currencyCode: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		// currencyCode: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
		ledgerPurpose: Yup.string().nullable(),
	});

const sportsBookStatus = [
	{ label: 'Pending', value: 'pending' },
	{ label: 'Won', value: 'won' },
	{ label: 'Lost', value: 'lost' },
	{ label: 'Refund', value: 'refund' },
	{ label: 'Cashout', value: 'cashout' },
	{ label: 'Half_won', value: 'half_won' },
	{ label: 'Half_lost', value: 'half_lost' },
];

const BET_TYPES = [
	{ label: 'Single', value: 'single' },
	{ label: 'Multiple', value: 'multiple' },
];
export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	sportsBookStatus,
	BET_TYPES,
};
