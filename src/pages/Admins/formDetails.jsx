import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Add staff and edit staff
const getInitialValues = (defaultValue) => ({
	email: defaultValue?.email || '',
	password: '',
	username: defaultValue?.username || '',
	firstName: defaultValue?.firstName || '',
	lastName: defaultValue?.lastName || '',
	role: defaultValue?.adminRole?.name || null,
	adminId: defaultValue?.parentAdminId || null,
	permission: defaultValue?.permissions?.[0]?.permission || {},
});
const initialValueInstance = {
	email: PropTypes.string,
	password: PropTypes.string,
	username: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	role: PropTypes.string,
	adminId: PropTypes.string,
	permission: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
};

const validationSchema = (isEdit) =>
	Yup.object({
		email: Yup.string()
			.email('Invalid email')
			.max(200)
			.required('Email Required'),
		password: !isEdit
			? Yup.string()
					.matches(
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
						'Invalid Password'
					)
					.max(50)
					.required('Password Required')
			: Yup.string().nullable(),
		firstName: Yup.string()
			.min(3, 'First Name must be atleast 3 characters')
			.max(200)
			.matches(
				/^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
				'Only Alphabets and Space Allowed and Must Start with Alphabet'
			)
			.required('First Name Required'),
		lastName: Yup.string()
			.min(3, 'Last Name must be atleast 3 characters')
			.max(200)
			.matches(
				/^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
				'Only Alphabets and Space Allowed and Must Start with Alphabet'
			)
			.required('Last Name Required'),
		role: Yup.string().required('Role Required'),
		// adminId: Yup.string().when('role', {
		// 	is: (role) => role === 'Support',
		// 	then: Yup.string().required('Parent Admin is required').nullable(),
		// 	otherwise: Yup.string().nullable(),
		// }),
		username: Yup.string()
			.matches(/^[A-Za-z]+$/, 'Only Alphabets Allowed')
			.min(8)
			.max(100)
			.required('User Name Required'),
		roleId: Yup.number().required('Admin role id is required'),
		// group: Yup.string()
		//   .min(3, 'Group Name must be atleast 3 characters')
		//   .max(200)
		//   .matches(/^[A-Za-z0-9 ]+$/, 'Only Alphabets, Numbers and Space Allowed')
		//   .required('Group Name Required'),
	});

const leftStaticFormFields = () => [
	{
		name: 'username',
		fieldType: 'textField',
		label: 'Username',
		placeholder: 'Enter username',
	},
	{
		name: 'firstName',
		fieldType: 'textField',
		label: 'First Name',
		placeholder: 'Enter first name',
	},
];

const rightStaticFormFields = (isEdit) => [
	{
		name: 'email',
		fieldType: 'textField',
		label: 'Email',
		placeholder: 'Enter your email',
		isDisabled: isEdit,
	},
	{
		name: 'lastName',
		fieldType: 'textField',
		label: 'Last Name',
		placeholder: 'Enter last name',
	},
	{
		name: 'password',
		fieldType: 'textField',
		label: 'Password',
		placeholder: 'Enter password',
		isPassword: true, // for showing visibility (if needed)
		isHide: isEdit,
	},
];

// Staff Filter
const staticFiltersFields = () => [
	{
		name: 'status',
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
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email or name',
	},
];

const filterValues = () => ({
	status: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	leftStaticFormFields,
	rightStaticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	initialValueInstance,
};
