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
		name: 'searchString',
		fieldType: 'textField',
		// type: 'search',
		label: '',
		placeholder: 'Search by country name',
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
