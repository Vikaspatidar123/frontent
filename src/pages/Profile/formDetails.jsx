/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';

const adminSiteConfigSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Name must be atleast 3 characters')
		.max(200)
		.required('Name Required'),
	url: Yup.string()
		.matches(
			/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
			'Enter correct url!'
		)
		.required('Url Required'),
	supportEmail: Yup.string()
		.email('Invalid Email')
		.max(50)
		.required('Email Required'),
	sendgridEmail: Yup.string()
		.email('Invalid sendgridEmail')
		.max(50)
		.required('sendgridEmail Required'),
	sendgridKey: Yup.string().required('sendgridKey Required'),
	logo: Yup.mixed()
		.test(
			'File Size',
			'File Size Should be Less Than 1MB',
			(value) => !value || (value && value.size <= 1024 * 1024)
		)
		.test(
			'FILE_FORMAT',
			'Uploaded file has unsupported format.',
			(value) =>
				!value ||
				(value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
		),
	lang: Yup.mixed().required('Language Required'),
});

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email')
		.max(200)
		.required('Email Required'),
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
	adminUsername: Yup.string()
		.matches(/^[A-Za-z]+$/, 'Only Alphabets Allowed')
		.min(8)
		.max(100)
		.required('User Name Required'),
});

const adminProfileSchema = Yup.object().shape({
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
	phone: Yup.string()
		.min(10, 'Phone must be at least 10 digits')
		.max(20, 'Phone must be at most 20 digits')
		.matches(
			/^((\\+[1-9]{1,10}[ \\-]*)|(\\([0-9]{1,10}\\)[ \\-]*)|([0-9]{1,10})[ \\-]*)*?[0-9]{1,10}?[ \\-]*[0-9]{1,10}?$/,
			'Enter a valid Phone Number'
		),
});

const profilePasswordSchema = Yup.object().shape({
	password: Yup.string().required('Old Password Required!'),
	newPassword: Yup.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Invalid Password'
		)
		.test(
			'match',
			'Old and New Password Must be Different!',
			function (newPassword) {
				return newPassword !== this.options.parent.password;
			}
		)
		.max(50)
		.required('New Password Required!'),
	confirmPassword: Yup.string()
		.max(50)
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match!')
		.required('Confirm Password Required!'),
});

export {
	adminSiteConfigSchema,
	adminProfileSchema,
	validationSchema,
	profilePasswordSchema,
};
