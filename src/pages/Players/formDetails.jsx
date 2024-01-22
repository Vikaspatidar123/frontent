import * as Yup from 'yup';

// Player Filters
export const kycLabels = [
	// { value: '', label: 'All' },
	// { value: 'APPROVED', label: 'Approved' },
	{ value: false, label: 'Pending' },
	{ value: true, label: 'Approved' },
	// { value: 'REJECTED', label: 'Rejected' },
	// { value: 'REQUESTED', label: 'Requested' },
	// { value: 'RE_REQUESTED', label: 'Re Requested' },
];

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email, name or group',
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
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Range',
	},
	{
		name: 'phoneNumber',
		fieldType: 'textField',
		type: 'tel',
		label: '',
		placeholder: 'Search by Phone number',
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
];

const filterValues = () => ({
	search: '',
	kycStatus: null,
	// affiliateName: '',
	startDate: null,
	endDate: null,
	userId: '',
	phoneNumber: '',
	orderBy: null,
	sort: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		kycStatus: Yup.string().nullable(),
		// affiliateName: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		userId: Yup.string().nullable(),
		phoneNumber: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		sort: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
