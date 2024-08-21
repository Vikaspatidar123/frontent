import * as Yup from 'yup';

// CMS Filter
const staticFiltersFields = () => [
	// {
	// 	name: 'searchString',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by title or Slug',
	// },
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

const getInitialValues = (cmsData) => ({
	content: cmsData?.content || {},
	isActive: cmsData ? !!cmsData?.isActive : true,
	language: 'EN',
	slug: cmsData ? cmsData?.slug : '',
	title: cmsData?.title || { EN: '' },
});

const createCmsNewSchema = () =>
	Yup.object().shape({
		content: Yup.object().shape({
			EN: Yup.string().required('Content is required'),
		}),
		slug: Yup.string()
			.required('Slug is required')
			.min(3, 'Slug must be at least 3 characters')
			.max(30, 'Slug must be at most 30 characters')
			.matches(/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/, 'Enter a valid URL slug'),

		title: Yup.object().shape({
			EN: Yup.string()
				.required('Provider Name Required')
				.max(100, 'Name must be less than 100 characters'),
		}),
	});

const staticFormFields = (isView, isEdit, languageOptions) => [
	{
		name: 'slug',
		label: 'Enter Slug',
		fieldType: 'textField',
		placeholder: 'Enter Slug',
		isDisabled: isView || false,
		fieldColOptions: { lg: 3 },
		containerClass: 'mt-4',
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Status',
		placeholder: 'Status',
		isDisabled: isView || false,
		fieldColOptions: { xl: 2, lg: 2, md: 3 },
		switchSizeClass:
			'd-flex justify-content-between form-switch-md px-0 pt-2 mt-4',
	},
	{
		name: 'language',
		fieldType: 'buttonGroup',
		isDisabled: false,
		labelClass: 'btn btn-primary mt-3 me-2 mx-0 px-3',
		inputClassName: 'btn-check',
		fieldColOptions: { xxl: 6, xl: 8, lg: 10, md: 12, sm: 12 },
		optionList: languageOptions || [],
		isNewRow: true,
	},
];

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getInitialValues,
	createCmsNewSchema,
	staticFormFields,
};
