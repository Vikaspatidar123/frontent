import * as Yup from 'yup';
import {
	GENDER_TYPES,
	IS_ACTIVE_TYPES,
} from '../CasinoTransactionsList/constants';

// Player Filters
export const kycLabels = [
	{ value: false, label: 'Pending' },
	{ value: true, label: 'Approved' },
];

const staticFiltersFields = () => [
	// {
	// 	name: 'searchString',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by email, username',
	// },
	// {
	// 	name: 'affiliateName',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by Affiliate',
	// },
	// {
	// 	name: 'userId',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: '',
	// 	placeholder: 'Search by Player Id',
	// },
	// {
	// 	name: 'pincode',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: '',
	// 	placeholder: 'Search by Pincode',
	// },
	// {
	// 	name: 'fromDate',
	// 	fieldType: 'datePicker',
	// 	label: '',
	// 	placeholder: 'Registration from date',
	// },
	// {
	// 	name: 'toDate',
	// 	fieldType: 'datePicker',
	// 	label: '',
	// 	placeholder: 'Registration to date',
	// 	minDateField: 'fromDate',
	// },
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Registration date range',
	},
	{
		name: 'kycStatus',
		fieldType: 'select',
		label: '',
		placeholder: 'KYC Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Pending',
				value: false,
			},
			{
				id: 2,
				optionLabel: 'Approved',
				value: true,
			},
		],
	},
	{
		name: 'gender',
		fieldType: 'select',
		label: '',
		placeholder: 'Gender',
		optionList: GENDER_TYPES?.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
	},
	{
		name: 'dateOfBirth',
		fieldType: 'datePicker',
		label: '',
		placeholder: 'Date of Birth',
	},
	{
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: IS_ACTIVE_TYPES?.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
	},
];

const filterValues = (tagIds) => ({
	searchString: '',
	pincode: '',
	kycStatus: null,
	userId: '',
	tagIds: tagIds || null,
	orderBy: null,
	isActive: null,
	fromDate: '',
	toDate: '',
	sort: '',
});
const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
		kycStatus: Yup.string().nullable(),
		userId: Yup.string().nullable(),
		tagIds: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		sort: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		pincode: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
