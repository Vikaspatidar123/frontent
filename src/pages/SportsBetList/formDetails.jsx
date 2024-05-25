import * as Yup from 'yup';

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

const staticFiltersFields = () => [
	{
		name: 'type',
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
	status: null,
	fromDate: null,
	toDate: null,
	type: null,
	settlementStatus: null,
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
		type: Yup.string().nullable(),
		settlementStatus: Yup.string().nullable(),
	});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	sportsBookStatus,
	BET_TYPES,
};
