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

const leftStaticFormFields = (formFields, callBack) => {
	const disable = formFields?.disable;
	return [
		{
			name: 'email',
			fieldType: 'toggle',
			label: 'Email',
			isDisabled: disable?.includes('email'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'email'),
		},
		{
			name: 'confirmPassword',
			fieldType: 'toggle',
			label: 'Confirm Password',
			isDisabled: disable?.includes('confirmPassword'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'confirmPassword'),
		},
		{
			name: 'firstName',
			fieldType: 'toggle',
			label: 'First Name',
			isDisabled: disable?.includes('firstName'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'firstName'),
		},
		{
			name: 'dateOfBirth',
			fieldType: 'toggle',
			label: 'Date of Birth',
			isDisabled: disable?.includes('dateOfBirth'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'dateOfBirth'),
		},
		{
			name: 'phone',
			fieldType: 'toggle',
			label: 'Phone',
			isDisabled: disable?.includes('phone'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'phone'),
		},
		{
			name: 'preferredLanguage',
			fieldType: 'toggle',
			label: 'Preferred Language',
			isDisabled: disable?.includes('preferredLanguage'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'preferredLanguage'),
		},
		{
			name: 'countryCode',
			fieldType: 'toggle',
			label: 'Country',
			isDisabled: disable?.includes('countryCode'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'countryCode'),
		},
		{
			name: 'currencyCode',
			fieldType: 'toggle',
			label: 'Currency Code',
			isDisabled: disable?.includes('currencyCode'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'currencyCode'),
		},
	];
};
const rightStaticFormFields = (formFields, callBack) => {
	const disable = formFields?.disable;
	return [
		{
			name: 'password',
			fieldType: 'toggle',
			label: 'Password',
			isDisabled: disable?.includes('password'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'password'),
		},
		{
			name: 'username',
			fieldType: 'toggle',
			label: 'Username',
			isDisabled: disable?.includes('username'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'username'),
		},
		{
			name: 'lastName',
			fieldType: 'toggle',
			label: 'Last Name',
			isDisabled: disable?.includes('lastName'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'lastName'),
		},
		{
			name: 'address',
			fieldType: 'toggle',
			label: 'Address',
			isDisabled: disable?.includes('address'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'address'),
		},
		{
			name: 'gender',
			fieldType: 'toggle',
			label: 'Gender',
			isDisabled: disable?.includes('gender'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'gender'),
		},
		{
			name: 'newsLetter',
			fieldType: 'toggle',
			label: 'News Letter',
			isDisabled: disable?.includes('newsLetter'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'newsLetter'),
		},
		{
			name: 'sms',
			fieldType: 'toggle',
			label: 'SMS',
			isDisabled: disable?.includes('sms'),
			switchSizeClass: 'd-flex justify-content-between px-4',
			callBack: (e) => callBack(e, 'sms'),
		},
	];
};
export { getInitialValues, leftStaticFormFields, rightStaticFormFields };
