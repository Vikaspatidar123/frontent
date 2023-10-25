import * as Yup from 'yup';
import { transactionType } from './constants';

const staticFiltersFields = () => [
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
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

const filterValues = () => ({
	email: '',
	status: null,
	startDate: null,
	endDate: null,
	currencyCode: null,
	transactionType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
