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
				id: 0,
				optionLabel: 'Not Started',
				value: 0,
			},
			{
				id: 1,
				optionLabel: 'In Progress',
				value: 1,
			},
			{
				id: 2,
				optionLabel: 'Finished',
				value: 2,
			},
			{
				id: 3,
				optionLabel: 'Cancelled',
				value: 3,
			},
			{
				id: 4,
				optionLabel: 'Postponed',
				value: 4,
			},
			{
				id: 5,
				optionLabel: 'Interrupted',
				value: 5,
			},
			{
				id: 6,
				optionLabel: 'Abondoned',
				value: 6,
			},
			{
				id: 7,
				optionLabel: 'Coverage Lost',
				value: 7,
			},
		],
	},
	// {
	// 	name: 'isLive',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Is Live',
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
	// isLive: null,
	isFeatured: null,
	eventStatus: null,
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		providerSportId: Yup.string().nullable(),
		// isLive: Yup.string().nullable(),
		isFeatured: Yup.string().nullable(),
		eventStatus: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
