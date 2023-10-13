import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	username: defaultValue?.username || '',
	description: defaultValue?.description || '',
	rating: defaultValue?.rating || 1,
	status: defaultValue?.status || '',
});

const validationSchema = () =>
	Yup.object().shape({
		userName: Yup.string()
			.max(50, 'User Name must be less than 50 characters')
			.matches(/^[A-Za-z0-9 ]+$/, 'Only Alpha-Numeric Values Allowed')
			.required('UserName Required'),
		description: Yup.string().required('Description Required'),
		rating: Yup.number().required().positive(),
		status: Yup.boolean().required(),
	});

const staticFormFields = [
	{
		name: 'username',
		fieldType: 'textField',
		label: 'Username',
		placeholder: 'Enter Provider name',
	},
	{
		name: 'description',
		fieldType: 'textField',
		label: 'Description',
		placeholder: 'Enter description',
	},
	{
		name: 'rating',
		fieldType: 'select',
		label: 'Rating',
		placeholder: 'Select rating',
	},
	{
		name: 'status',
		fieldType: 'switch',
		label: 'Active',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
