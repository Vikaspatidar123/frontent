import * as Yup from 'yup';

// CMS Filter
const staticFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title or Slug',
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
	isActive: null,
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
	});

const pageCategories = {
	ABOUT: 'about',
	OTHERS: 'others',
	SUPPORT: 'support',
	RESPONSIBLE_GAMBLING: 'responsible_gambling',
};

const getInitialValues = (cmsData) => ({
	title: cmsData ? cmsData?.title?.EN : '',
	slug: cmsData ? cmsData?.slug : '',
	content: cmsData ? cmsData?.content?.EN : '',
	category: cmsData ? cmsData?.category : 'about',
	isActive: cmsData ? !!cmsData?.isActive : true,
	language: '',
});

const initialData = {
	title: {
		EN: '',
	},
	slug: '',
	content: {
		EN: '',
	},
	category: pageCategories?.ABOUT,
	isActive: true,
	language: 'EN',
};

const createCmsNewSchema = Yup.object().shape({
	title: Yup.string().required('Title for English is required'),
	slug: Yup.string()
		.required('Slug is required')
		.min(3, 'Slug must be at least 3 characters')
		.max(30, 'Slug must be at most 30 characters')
		.matches(/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/, 'Enter a valid url slug'),
});

const staticFormFields = (isView) => [
	{
		name: 'slug',
		fieldType: 'textField',
		placeholder: 'Enter Slug',
		isDisabled: isView || false,
	},
	{
		name: 'category',
		fieldType: 'select',
		placeholder: 'Category',
		isDisabled: isView || false,
		optionList: [
			{
				optionLabel: pageCategories.ABOUT,
				value: pageCategories.ABOUT,
			},
			{
				optionLabel: pageCategories.OTHERS,
				value: pageCategories.OTHERS,
			},
			{
				optionLabel: pageCategories.SUPPORT,
				value: pageCategories.SUPPORT,
			},
			{
				optionLabel: pageCategories.RESPONSIBLE_GAMBLING,
				value: pageCategories.RESPONSIBLE_GAMBLING,
			},
		],
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Status',
		placeholder: 'Status',
		isDisabled: isView || false,
	},
];

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getInitialValues,
	createCmsNewSchema,
	staticFormFields,
	initialData,
};
