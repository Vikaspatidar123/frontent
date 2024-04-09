import * as Yup from 'yup';

// Player Filters
export const kycLabels = [
	{ value: false, label: 'Pending' },
	{ value: true, label: 'Approved' },
];

const staticFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email, name, phone or user id',
	},
	// {
	// 	name: 'affiliateName',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by Affiliate',
	// },
	{
		name: 'userId',
		fieldType: 'textField',
		type: 'number',
		label: '',
		placeholder: 'Search by user Id',
	},
	{
		name: 'pincode',
		fieldType: 'textField',
		type: 'number',
		label: '',
		placeholder: 'Search by Pincode',
	},
	{
		name: 'fromDate',
		fieldType: 'datePicker',
		label: '',
		placeholder: 'Registration from date',
	},
	{
		name: 'toDate',
		fieldType: 'datePicker',
		label: '',
		placeholder: 'Registration to date',
		minDateField: 'fromDate',
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
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'In Active',
				value: false,
			},
		],
	},
];

const filterValues = () => ({
	searchString: '',
	pincode: '',
	kycStatus: null,
	userId: '',
	tagId: null,
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
		tagId: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		sort: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		pincode: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
