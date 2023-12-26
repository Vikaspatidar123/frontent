/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	selectedLang: defaultValue?.selectedLang || '',
	isActive: defaultValue?.isActive || false,
	name: defaultValue?.name || {},
});

const validateName = (name) => {
	const validationObject = {};
	for (const file in name) {
		validationObject[file] = Yup.string()
			.required('Label Name Required!')
			.nullable();
	}
	return Yup.object(validationObject);
};

const validationSchema = (name) =>
	Yup.object().shape({
		name: validateName(name),
	});

const staticFormFields = [
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
];

// Category filters
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		// type: 'search',
		label: '',
		placeholder: 'Search by category',
	},
];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
