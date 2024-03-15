/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

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
		name: 'searchString',
		fieldType: 'textField',
		// type: 'search',
		label: '',
		placeholder: 'Search by category',
	},
];

const filterValues = () => ({
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
