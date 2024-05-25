import * as Yup from 'yup';
import { STATUS_TYPE, LEDGER_PURPOSE } from './constants';

const staticFiltersFields = () => [
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
	status: null,
	fromDate: null,
	toDate: null,
	type: null,
	purpose: null,
	tagId: null,
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		type: Yup.string().nullable(),
		purpose: Yup.string().nullable(),
		tagId: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
