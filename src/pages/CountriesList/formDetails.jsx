import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	countryName: defaultValue?.countryName || '',
	languageId: defaultValue?.languageId || '',
});

const validationSchema = Yup.object().shape({
	countryName: Yup.string().required('Language cannot be Empty'),
});

const staticFormFields = [
	{
		name: 'countryName',
		fieldType: 'textField',
		label: 'Country Name',
		isDisabled: true,
	},
];

// Country filter
const staticFiltersFields = () => [
	{
		name: 'name',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email, name or group',
	},
];

const filterValues = () => ({
	name: '',
});

const filterValidationSchema = () =>
	Yup.object({
		name: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
