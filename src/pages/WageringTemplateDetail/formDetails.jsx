import * as Yup from 'yup';

// Filters
const staticFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		label: '',
		placeholder: 'Search by template name',
	},
];

const filterValues = () => ({
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
	});

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	contributionPercentage: '',
	searchString: '',
});

const createWageringTemplate = Yup.object().shape({
	name: Yup.string().required('Template Name Required'),
	contributionPercentage: Yup.string().required('Custom Value Required'),
	searchString: Yup.string().nullable(),
});

const leftStaticFormFields = () => [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Template Name',
		placeholder: 'Enter name',
	},
];

const rightStaticFormFields = () => [
	{
		name: 'contributionPercentage',
		fieldType: 'textField',
		label: 'Contribution Percentage',
		placeholder: 'Contribution Percentage',
		type: 'number',
		minimum: 0,
	},
	{
		name: 'searchString',
		fieldType: 'textField',
		label: 'Search',
		placeholder: 'Search by game name',
	},
];

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getInitialValues,
	createWageringTemplate,
	leftStaticFormFields,
	rightStaticFormFields,
};
