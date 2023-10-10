import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	email: defaultValue?.email || '',
	password: defaultValue?.password || '',
	adminUsername: defaultValue?.adminUsername || '',
	firstName: defaultValue?.firstName || '',
	lastName: defaultValue?.lastName || '',
	role: defaultValue?.role || null,
	adminId: defaultValue?.adminId || null,
	permission: defaultValue?.permission || {},
	group: defaultValue?.group || null,
});

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email')
		.max(200)
		.required('Email Required'),
	password: Yup.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Invalid Password'
		)
		.max(50)
		.required('Password Required'),
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
	role: Yup.string().required('Role Required').nullable(),
	// adminId: Yup.string().when('role', {
	//   is: (role) => role === 'Support',
	//   then: Yup.string().required('Parent Admin is required').nullable(),
	//   otherwise: Yup.string().nullable()
	// }),
	adminUsername: Yup.string()
		.matches(/^[A-Za-z]+$/, 'Only Alphabets Allowed')
		.min(8)
		.max(100)
		.required('User Name Required'),
	group: Yup.string()
		.min(3, 'Group Name must be atleast 3 characters')
		.max(200)
		.matches(/^[A-Za-z0-9 ]+$/, 'Only Alphabets, Numbers and Space Allowed')
		.required('Group Name Required'),
});

const formFields = [
	{
		name: 'email',
		fieldType: 'textField',
		label: 'Email',
		placeholder: 'Enter your email',
	},
	{
		name: 'adminUsername',
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
	},
	{
		name: 'group',
		fieldType: 'select',
		label: 'Group',
		placeholder: 'Select group',
		optionList: [{}],
	},
	{
		name: 'role',
		fieldType: 'select',
		label: 'Role',
		placeholder: 'Select Role',
		optionList: [{}],
	},
];

export { validationSchema, getInitialValues, formFields };
