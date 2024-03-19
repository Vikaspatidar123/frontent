import * as Yup from 'yup';
import moment from 'moment';
import { statusType, LEDGER_TYPES, LEDGER_PURPOSE } from './constants';

const staticFiltersFields = () => [
	{
		name: 'type',
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
		name: 'purpose',
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

const startDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
const endDate = new Date(); // Do not define it inside filterValue function

const filterValues = () => ({
	status: null,
	startDate,
	endDate,
	type: null,
	purpose: null,
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		type: Yup.string().nullable(),
		purpose: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
