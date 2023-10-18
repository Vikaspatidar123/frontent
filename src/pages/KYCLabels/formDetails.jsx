/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	selectedLang: defaultValue?.selectedLang || '',
	isRequired: defaultValue?.isRequired || false,
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
		name: 'isRequired',
		fieldType: 'switch',
		label: 'Required',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
