import * as Yup from 'yup';
import { formatDateYMD } from '../../utils/helpers';

const getInitialValues = (defaultValue) => ({
	title: defaultValue?.title || '',
	comment: defaultValue?.comment || '',
});

const validationSchema = () =>
	Yup.object().shape({
		title: Yup.string().required('Title Required'),
		comment: Yup.string().required('Comment Required'),
	});

const staticFormFields = [
	{
		name: 'title',
		fieldType: 'textField',
		label: 'Title',
		required: true,
		placeholder: 'Enter the Title',
	},
	{
		name: 'comment',
		fieldType: 'textField',
		label: 'Comment',
		required: true,
		placeholder: 'Enter Comment',
	},
];

const limitsSchema = ({ minimum, currLabel, label }) =>
	Yup.object().shape({
		limit: Yup.number()
			.positive('Limit must be positive number')
			.integer('Limit must be an integer')
			.min(
				minimum + 1,
				`${currLabel} Must Be Greater Than ${label} (${minimum})`
			)
			.required('Limit Required'),
	});

const setDisableUserlimitsSchema = () =>
	Yup.object().shape({
		limit: Yup.number()
			.positive('Time Period must be positive number')
			.integer('Time Period must be an integer')
			.required('Time Period Required'),
	});

const selfExclusionSchema = () =>
	Yup.object().shape({
		days: Yup.number()
			.positive('Month must be positive number')
			.integer('Month must be an integer')
			.required('Month Required'),
	});

const getLimitInitialValues = (defaultValue) => ({
	limit: defaultValue?.limit || '',
});

const depositSchema = () =>
	Yup.object().shape({
		addAmount: Yup.number()
			.typeError('Only numbers are allowed')
			.min(0, 'Amount should be greater than 0')
			.required('Amount Required'),
		transactionType: Yup.string().required('Transaction type required'),
		walletType: Yup.string().required('Wallet type required'),
	});

const userSchema = () =>
	Yup.object().shape({
		email: Yup.string()
			.email('Invalid Email')
			.max(50)
			.required('Email Required'),
		firstName: Yup.string()
			.min(3, 'Minimum 3 Characters Required')
			.max(50, 'Maximum 50 Characters Allowed')
			.required('First Name Required'),
		lastName: Yup.string()
			.min(3, 'Minimum 3 Characters Required')
			.max(50, 'Maximum 50 Characters Allowed')
			.required('Last Name Required'),
		phone: Yup.string().required(),
		// .test('Invalid', 'Invalid Phone', (value, context) => {
		//   if (value && (value?.charAt(
		//     context.phoneCode?.length
		//   ) === '0' || context.phoneCode?.format?.replace(/[+ ()-]/g, '').length !== value?.length)) {
		//     return 'Invalid Number'
		//   }
		//   return true
		// }
		// ),
		dateOfBirth: Yup.date()
			.max(
				new Date(
					new Date().getFullYear() - 18,
					new Date().getMonth(),
					new Date().getDate() - 1
				),
				'Must Be 18 Years Old'
			)
			.required('DOB Required'),
		gender: Yup.string().required('Gender Required'),
		username: Yup.string()
			.max(20, 'Maximum 20 Characters Allowed')
			.min(3, 'Minimum 3 Characters Required')
			.required('User Name Required'),
		address: Yup.string()
			.max(100, 'Maximum 100 Characters Allowed')
			.required('Address Required'),
		city: Yup.string()
			.max(50, 'Maximum 50 Characters Allowed')
			.required('City Required'),
		zipCode: Yup.string().required('ZipCode Required'),
		currencyCode: Yup.string(),
		countryCode: Yup.string().nullable(),
	});

const getInitialValuesUpdateUser = (defaultValue) => ({
	userId: defaultValue?.userId,
	firstName: defaultValue?.firstName,
	lastName: defaultValue?.lastName,
	username: defaultValue?.username,
	email: defaultValue?.email,
	countryCode: defaultValue?.countryCode,
	address: defaultValue?.address,
	city: defaultValue?.city,
	zipCode: defaultValue?.zipCode,
	dateOfBirth: formatDateYMD(defaultValue?.dateOfBirth),
	gender: defaultValue?.gender,
	currencyCode: defaultValue?.currencyCode,
	phoneCode: defaultValue?.phoneCode || '',
	phone: defaultValue?.phone || '',
	preferredLanguage: defaultValue?.preferredLanguage || '',
	newsLetter: defaultValue?.newsLetter || false,
	sms: defaultValue?.sms || false,
});

const passwordValidation = () =>
	Yup.object().shape({
		password: Yup.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Invalid Password'
			)
			.max(50)
			.required('Password Required'),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	limitsSchema,
	selfExclusionSchema,
	getLimitInitialValues,
	setDisableUserlimitsSchema,
	depositSchema,
	userSchema,
	getInitialValuesUpdateUser,
	passwordValidation,
};
