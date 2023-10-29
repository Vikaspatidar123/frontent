import * as Yup from 'yup';

// Filters
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by template name',
	},
];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	customValue: '',
	search: '',
});

const createWageringTemplate = Yup.object().shape({
	name: Yup.string().required('Template Name Required'),
	customValue: Yup.string().required('Custom Value Required'),
	search: Yup.string().nullable(),
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
		name: 'customValue',
		fieldType: 'textField',
		label: 'Custom Value',
		placeholder: 'Custom Value',
		type: 'number',
		minimum: 0,
	},
	{
		name: 'search',
		fieldType: 'textField',
		label: 'Search',
		placeholder: 'Search Game Name',
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
