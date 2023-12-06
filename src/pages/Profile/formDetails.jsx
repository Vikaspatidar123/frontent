/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */

import * as Yup from 'yup';
import React from 'react';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

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
		.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
			typeof value === 'string'
				? true
				: !value || (value && value.size <= 1024 * 1024)
		)
		.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
			typeof value === 'string'
				? true
				: value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)
		),
	lang: Yup.mixed().required('Language Required'),
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

const getAdminInitialValues = (details, isTenant) => ({
	firstName: details?.firstName,
	lastName: details?.lastName,
	email: details?.email,
	adminUsername: details?.adminUsername || '',
	phone: isTenant ? details?.phone : '',
	role:
		details?.AdminRole?.name === 'Super Admin'
			? 'Admin'
			: details?.SuperadminRole?.name,
	agentName: details?.agentName || '',
	group: details?.group || '',
});

const getPasswordInitialValues = () => ({
	password: '',
	newPassword: '',
	confirmPassword: '',
});

const getSiteConfigInitialValues = (details, formLanguage) => ({
	name: details[1]?.value.name || '',
	url: details[1]?.value.url || '',
	supportEmail: details[1]?.value.supportEmail || '',
	sendgridEmail: details[0]?.value.SENDGRID_EMAIL || '',
	sendgridKey: details[0]?.value.SENDGRID_API_KEY || '',
	logo: details[1]?.value?.logo
		? `${VITE_APP_AWS_GALLERY_URL}/${details[1]?.value?.logo}`
		: null,
	lang: formLanguage || null,
	maintenance: !!details[1]?.value.maintenance,
});

const leftStaticAdminFormFields = (isEditable) => [
	{
		name: 'firstName',
		fieldType: 'textField',
		label: 'First Name',
		isDisabled: isEditable,
		placeholder: 'Enter First Name',
	},
	{
		name: 'email',
		fieldType: 'textField',
		label: 'Email',
		isDisabled: true,
		placeholder: 'Enter Email',
	},
	{
		name: 'role',
		fieldType: 'textField',
		label: 'Role',
		isDisabled: true,
		placeholder: 'Enter Role',
	},
];

const rightStaticAdminFormFields = (isEditable) => [
	{
		name: 'lastName',
		fieldType: 'textField',
		label: 'Last Name',
		isDisabled: isEditable,
		placeholder: 'Enter Last Name',
	},
	{
		name: 'adminUsername',
		fieldType: 'textField',
		label: 'User Name',
		isDisabled: true,
		placeholder: 'Enter User Name',
	},
];

const staticPasswordFormFields = (passwordShow, setPasswordShow) => {
	const { oldPassword, newPassword, confirmPassword } = passwordShow;
	return [
		{
			name: 'password',
			fieldType: 'password',
			type: oldPassword ? 'text' : 'password',
			label: 'OLD PASSWORD',
			icon: oldPassword ? (
				<i className="mdi mdi-eye-outline" />
			) : (
				<i className="mdi mdi-eye-off-outline" />
			),
			callBack: () =>
				setPasswordShow((prev) => ({
					...prev,
					oldPassword: !prev.oldPassword,
				})),
		},
		{
			name: 'newPassword',
			fieldType: 'password',
			type: newPassword ? 'text' : 'password',
			label: 'NEW PASSWORD',
			icon: newPassword ? (
				<i className="mdi mdi-eye-outline" />
			) : (
				<i className="mdi mdi-eye-off-outline" />
			),
			callBack: () =>
				setPasswordShow((prev) => ({
					...prev,
					newPassword: !prev.newPassword,
				})),
		},
		{
			name: 'confirmPassword',
			fieldType: 'password',
			type: confirmPassword ? 'text' : 'password',
			label: 'CONFIRM PASSWORD',
			icon: confirmPassword ? (
				<i className="mdi mdi-eye-outline" />
			) : (
				<i className="mdi mdi-eye-off-outline" />
			),
			callBack: () =>
				setPasswordShow((prev) => ({
					...prev,
					confirmPassword: !prev.confirmPassword,
				})),
		},
	];
};

const leftStaticSiteConfigFormFields = (editableSiteConfig) => [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Site Name',
		isDisabled: editableSiteConfig,
		placeholder: 'Enter Site Name',
	},
	{
		name: 'supportEmail',
		fieldType: 'textField',
		label: 'Support Email Address',
		isDisabled: editableSiteConfig,
		placeholder: 'Enter Support Email Address',
	},
	{
		name: 'sendgridKey',
		fieldType: 'textField',
		label: 'Send grid Api Key',
		isDisabled: editableSiteConfig,
		placeholder: 'Enter Send grid Api Key',
	},
	{
		name: 'logo',
		fieldType: 'file',
		label: 'Site Logo',
		isDisabled: editableSiteConfig,
		placeholder: 'Enter Site Logo',
		showThumbnail: true,
		customThumbnailBackground: '#1A1D29',
		customPadding: '8px',
	},
];

const rightStaticSiteConfigFormFields = (editableSiteConfig) => [
	{
		name: 'url',
		fieldType: 'textField',
		label: 'Site Url',
		isDisabled: editableSiteConfig,
		placeholder: 'Enter Site Url',
	},
	{
		name: 'sendgridEmail',
		fieldType: 'textField',
		label: 'Send grid Email',
		isDisabled: editableSiteConfig,
		placeholder: 'Enter Send grid Email',
	},
];

export {
	adminSiteConfigSchema,
	adminProfileSchema,
	profilePasswordSchema,
	leftStaticAdminFormFields,
	rightStaticAdminFormFields,
	getAdminInitialValues,
	getPasswordInitialValues,
	staticPasswordFormFields,
	getSiteConfigInitialValues,
	leftStaticSiteConfigFormFields,
	rightStaticSiteConfigFormFields,
};
