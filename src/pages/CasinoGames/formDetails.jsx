import * as Yup from 'yup';
import { selectedLanguage } from '../../constants/config';

const getInitialValues = (defaultValue) => ({
	id: defaultValue?.id || '',
	name: defaultValue?.name?.[selectedLanguage] || '',
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
		name: 'searchString',
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

const filterValues = () => ({
	isActive: null,
	searchString: '',
	casinoSubCategoryId: null,
	casinoProviderId: null,
	gameSubCategoryId: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
		casinoSubCategoryId: Yup.string().nullable(),
		casinoProviderId: Yup.string().nullable(),
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
