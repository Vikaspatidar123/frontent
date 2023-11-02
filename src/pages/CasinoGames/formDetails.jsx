/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	casinoGameId: defaultValue?.casinoGameId || '',
	name: defaultValue?.name || '',
	gameSubCategoryId: defaultValue?.gameSubCategoryId || '',
	casinoProviderId: defaultValue?.casinoProviderId || '',
	isActive: defaultValue?.isActive || false,
	thumbnail: defaultValue?.thumbnail || null,
});

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Game Name Required'),
	gameSubCategoryId: Yup.string().required('Sub-Category  Required').nullable(),
	casinoProviderId: Yup.string()
		.required('Casino Provider Id Required')
		.nullable(),
});

const staticFormFields = [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Game Name',
	},
	{
		name: 'thumbnail',
		fieldType: 'file',
		label: 'Thumbnail',
		showThumbnail: true,
	},
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
];

// Filters

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name',
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
	{
		name: 'isFeatured',
		fieldType: 'select',
		label: '',
		placeholder: 'Is Featured',
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
];

// casinoCategoryId: 2
// search: anil
// isActive: true
// providerId: 2
// freespins:
// bonusId:
// addGames: false
// gameSubCategoryId:

const filterValues = () => ({
	isActive: null,
	search: '',
	casinoCategoryId: null,
	providerId: null,
	gameSubCategoryId: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
		casinoCategoryId: Yup.string().nullable(),
		providerId: Yup.string().nullable(),
		gameSubCategoryId: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
