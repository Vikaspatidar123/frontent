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

const getInitialValues = (cmsData) => ({
	slug: cmsData ? cmsData?.slug : '',
	isActive: cmsData ? !!cmsData?.isActive : true,
});

const initialData = {
	title: {
		EN: '',
	},
	slug: '',
	content: {
		EN: '',
	},
	isActive: true,
};

const createCmsNewSchema = Yup.object().shape({
	slug: Yup.string()
		.required('Slug is required')
		.min(3, 'Slug must be at least 3 characters')
		.max(30, 'Slug must be at most 30 characters')
		.matches(/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/, 'Enter a valid url slug'),
});

const staticFormFields = (isView) => [
	{
		name: 'slug',
		label: 'Enter Slug',
		fieldType: 'textField',
		placeholder: 'Enter Slug',
		isDisabled: isView || false,
		fieldColOptions: { lg: 3 },
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Is Active',
		placeholder: 'Status',
		isDisabled: isView || false,
		containerClass: 'form-switch-md mt-4',
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
