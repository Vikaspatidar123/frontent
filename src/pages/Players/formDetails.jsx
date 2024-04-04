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
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Range',
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
	searchString: '',
	kycStatus: null,
	// affiliateName: '',
	fromDate: null,
	toDate: null,
	userId: '',
	tagId: null,
	orderBy: null,
	sort: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
		kycStatus: Yup.string().nullable(),
		// affiliateName: Yup.string().nullable(),
		fromDate: Yup.string().nullable(),
		toDate: Yup.string().nullable(),
		userId: Yup.string().nullable(),
		tagId: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		sort: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
