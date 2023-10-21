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

export { validationSchema, getInitialValues, staticFormFields };
