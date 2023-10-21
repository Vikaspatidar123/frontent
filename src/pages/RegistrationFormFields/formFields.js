const getInitialValues = (defaultValue) => ({
	email: defaultValue?.email || 0,
	password: defaultValue?.password || 0,
	confirmPassword: defaultValue?.confirmPassword || 0,
	username: defaultValue?.username || 0,
	firstName: defaultValue?.firstName || 0,
	lastName: defaultValue?.lastName || 0,
	dateOfBirth: defaultValue?.dateOfBirth || 0,
	address: defaultValue?.address || 0,
	phone: defaultValue?.phone || 0,
	gender: defaultValue?.gender || 0,
	preferredLanguage: defaultValue?.preferredLanguage || 0,
	countryCode: defaultValue?.countryCode || 0,
	newsLetter: defaultValue?.newsLetter || 0,
	currencyCode: defaultValue?.currencyCode || 0,
	sms: defaultValue?.sms || 0,
});

const leftStaticFormFields = (formFields) => [
	{
		name: 'email',
		fieldType: 'toggle',
		label: 'Email',
		isDisabled: formFields?.disable?.includes('email'),
	},
	{
		name: 'confirmPassword',
		fieldType: 'toggle',
		label: 'Confirm Password',
		isDisabled: formFields?.disable?.includes('confirmPassword'),
	},
	{
		name: 'firstName',
		fieldType: 'toggle',
		label: 'First Name',
		isDisabled: formFields?.disable?.includes('firstName'),
	},
	{
		name: 'dateOfBirth',
		fieldType: 'toggle',
		label: 'Date of Birth',
		isDisabled: formFields?.disable?.includes('dateOfBirth'),
	},
	{
		name: 'phone',
		fieldType: 'toggle',
		label: 'Phone',
		isDisabled: formFields?.disable?.includes('phone'),
	},
	{
		name: 'preferredLanguage',
		fieldType: 'toggle',
		label: 'Preferred Language',
		isDisabled: formFields?.disable?.includes('preferredLanguage'),
	},
	{
		name: 'countryCode',
		fieldType: 'toggle',
		label: 'Country',
		isDisabled: formFields?.disable?.includes('countryCode'),
	},
	{
		name: 'currencyCode',
		fieldType: 'toggle',
		label: 'Currency Code',
		isDisabled: formFields?.disable?.includes('currencyCode'),
	},
];

const rightStaticFormFields = (formFields) => [
	{
		name: 'password',
		fieldType: 'toggle',
		label: 'Password',
		isDisabled: formFields?.disable?.includes('password'),
	},
	{
		name: 'username',
		fieldType: 'toggle',
		label: 'Username',
		isDisabled: formFields?.disable?.includes('username'),
	},
	{
		name: 'lastName',
		fieldType: 'toggle',
		label: 'Last Name',
		isDisabled: formFields?.disable?.includes('lastName'),
	},
	{
		name: 'address',
		fieldType: 'toggle',
		label: 'Address',
		isDisabled: formFields?.disable?.includes('address'),
	},
	{
		name: 'gender',
		fieldType: 'toggle',
		label: 'Gender',
		isDisabled: formFields?.disable?.includes('gender'),
	},
	{
		name: 'newsLetter',
		fieldType: 'toggle',
		label: 'News Letter',
		isDisabled: formFields?.disable?.includes('newsLetter'),
	},
	{
		name: 'sms',
		fieldType: 'toggle',
		label: 'SMS',
		isDisabled: formFields?.disable?.includes('sms'),
	},
];
export { getInitialValues, leftStaticFormFields, rightStaticFormFields };
