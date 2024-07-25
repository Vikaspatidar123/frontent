import * as Yup from 'yup';
import { defaultCurrencyId } from '../../constants/config';

const sportsBookStatus = [
	{ label: 'Pending', value: 'pending' },
	{ label: 'Won', value: 'won' },
	{ label: 'Lost', value: 'lost' },
	{ label: 'Refund', value: 'refund' },
	{ label: 'Cashout', value: 'cashout' },
	{ label: 'Half_won', value: 'half_won' },
	{ label: 'Half_lost', value: 'half_lost' },
];

const BETSLIP_TYPES = [
	{ label: 'Single', value: 'single' },
	{ label: 'Multiple', value: 'multiple' },
];

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
		name: 'type',
		fieldType: 'select',
		label: '',
		placeholder: 'Bet Type',
		optionList: BETSLIP_TYPES.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'settlementStatus',
		fieldType: 'select',
		label: '',
		placeholder: 'Bet Settlement Status',
		optionList: sportsBookStatus.map(({ value, label }) => ({
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
	searchString: '',
	currencyId: defaultCurrencyId,
	status: null,
	fromDate: null,
	toDate: null,
	type: null,
	settlementStatus: null,
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
		type: Yup.string().nullable(),
		settlementStatus: Yup.string().nullable(),
		currencyId: Yup.string().nullable(),
	});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	sportsBookStatus,
	BETSLIP_TYPES,
};
