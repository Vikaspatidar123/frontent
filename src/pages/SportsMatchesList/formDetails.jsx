import * as Yup from 'yup';

export const MATCH_STATUS = [
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
];
// Filters
const staticFiltersFields = () => [
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Match Status',
		optionList: MATCH_STATUS,
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
];

const filterValues = () => ({
	searchString: '',
	sportId: null,
	// isLive: null,
	isFeatured: null,
	status: null,
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
		sportId: Yup.string().nullable(),
		// isLive: Yup.string().nullable(),
		isFeatured: Yup.string().nullable(),
		status: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
