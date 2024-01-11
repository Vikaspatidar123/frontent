import * as Yup from 'yup';

// Filters
const staticFiltersFields = () => [
	{
		name: 'eventStatus',
		fieldType: 'select',
		label: '',
		placeholder: 'Match Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Cancelled',
				value: '4',
			},
			{
				id: 2,
				optionLabel: 'Finished',
				value: '5',
			},
			{
				id: 3,
				optionLabel: 'In Progress',
				value: '1',
			},
			{
				id: 4,
				optionLabel: 'Not Started',
				value: '2',
			},
		],
	},
	{
		name: 'isLive',
		fieldType: 'select',
		label: '',
		placeholder: 'Is Live',
		optionList: [
			{
				id: 1,
				optionLabel: 'Yes',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'No',
				value: false,
			},
		],
	},
	// {
	// 	name: 'isFeatured',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Is Featured',
	// 	optionList: [
	// 		{
	// 			id: 1,
	// 			optionLabel: 'Yes',
	// 			value: true,
	// 		},
	// 		{
	// 			id: 2,
	// 			optionLabel: 'No',
	// 			value: false,
	// 		},
	// 	],
	// },
	// {
	// 	name: 'search',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by name',
	// },
];

const filterValues = () => ({
	search: '',
	providerSportId: null,
	isLive: null,
	isFeatured: null,
	eventStatus: null,
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		providerSportId: Yup.string().nullable(),
		isLive: Yup.string().nullable(),
		isFeatured: Yup.string().nullable(),
		eventStatus: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
