/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as Yup from 'yup';
import {
	TocRounded,
	CurrencyExchangeRounded,
	PeopleOutlineRounded,
	AdminPanelSettingsRounded,
	AccessibilityTwoTone,
	PaletteTwoTone,
	ReviewsTwoTone,
	FactCheckTwoTone,
	ReceiptLongTwoTone,
	MonetizationOnTwoTone,
	SportsSoccerTwoTone,
	CommentTwoTone,
	CollectionsTwoTone,
	AccountBalanceWalletTwoTone,
	ContactMailTwoTone,
	GTranslateTwoTone,
	ManageAccountsTwoTone,
	PlaceTwoTone,
	ViewCarouselTwoTone,
	CasinoTwoTone,
	AssessmentTwoTone,
	LiveTvTwoTone,
	SynagogueTwoTone,
	LocalAtmTwoTone,
	CardMembershipTwoTone,
	SpeakerNotesTwoTone,
	LocationOffTwoTone,
	QrCode2TwoTone,
	PsychologyTwoTone,
	ManageHistoryTwoTone,
} from '@mui/icons-material';

// {
//   "email": "anil@yopmail.com",
//   "password": "QW5pbHNnc0AyNg==",
//   "adminUsername": "anilchawda",
//   "firstName": "Anil",
//   "lastName": "chawd",
//   "role": "Admin",
//   "adminId": 1,
//   "permission": {
//       "CMS": [
//           "R"
//       ],
//       "Bonus": [
//           "R"
//       ],
//       "Users": [
//           "R"
//       ],
//       "Admins": [
//           "R"
//       ],
//       "Reviews": [
//           "R"
//       ],
//       "KycLabel": [
//           "R"
//       ],
//       "KpiReport": [
//           "R"
//       ],
//       "Currencies": [
//           "R"
//       ],
//       "EmailTemplate": [
//           "R"
//       ]
//   },
//   "group": "Tag"
// }

const getInitialValues = (defaultValue, isEdit) => ({
	email: defaultValue?.email || '',
	...(!isEdit && { password: '' }), // edit does not required password
	adminUsername: defaultValue?.adminUsername || '',
	firstName: defaultValue?.firstName || '',
	lastName: defaultValue?.lastName || '',
	role: defaultValue?.AdminRole?.name || null,
	adminId: defaultValue?.parentId || null,
	permission: defaultValue?.userPermission?.permission || {},
	group: defaultValue?.group || null,
});

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

const leftStaticFormFields = (isEdit) => [
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
		name: 'password',
		fieldType: 'textField',
		label: 'Password',
		placeholder: 'Enter password',
		isPassword: true, // for showing visibility (if needed)
		isHide: isEdit,
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
];

const permissionIcons = () => ({
	CMS: <TocRounded />,
	Bonus: <CurrencyExchangeRounded />,
	Users: <PeopleOutlineRounded />,
	Admins: <AdminPanelSettingsRounded />,
	Tenant: <AccessibilityTwoTone />,
	Themes: <PaletteTwoTone />,
	Reviews: <ReviewsTwoTone />,
	KycLabel: <FactCheckTwoTone />,
	KpiReport: <ReceiptLongTwoTone />,
	Currencies: <MonetizationOnTwoTone />,
	GameReport: <SportsSoccerTwoTone />,
	UserComment: <CommentTwoTone />,
	ImageGallery: <CollectionsTwoTone />,
	Transactions: <AccountBalanceWalletTwoTone />,
	EmailTemplate: <ContactMailTwoTone />,
	MultiLanguage: <GTranslateTwoTone />,
	TenantSettings: <ManageAccountsTwoTone />,
	DemographReport: <PlaceTwoTone />,
	BannerManagement: <ViewCarouselTwoTone />,
	CasinoManagement: <CasinoTwoTone />,
	KpiSummaryReport: <AssessmentTwoTone />,
	LivePlayerReport: <LiveTvTwoTone />,
	WageringTemplate: <SynagogueTwoTone />,
	CashierManagement: <LocalAtmTwoTone />,
	LoyaltyManagement: <CardMembershipTwoTone />,
	RegistrationField: <SpeakerNotesTwoTone />,
	RestrictedCountry: <LocationOffTwoTone />,
	TenantCredentials: <QrCode2TwoTone />,
	TenantConfigurations: <PsychologyTwoTone />,
	PlayerLiabilityReport: <AssessmentTwoTone />,
	PlayerManagementReport: <ManageHistoryTwoTone />,
});

const permissionLabel = (label) => {
	switch (label) {
		case 'C':
			return 'Create';
		case 'R':
			return 'Read';
		case 'U':
			return 'Update';
		case 'D':
			return 'Delete';
		case 'T':
			return 'Toggle Status';
		case 'A':
			return 'Apply';
		case 'CC':
			return 'Create Custom';
		case 'AB':
			return 'Manage Money';
		case 'SR':
			return 'Limit';
		case 'TE':
			return 'Test Email';
		case 'EV':
			return 'Verify Email';
		case 'UP':
			return 'Reset Password';
		default:
			return label;
	}
};

export {
	validationSchema,
	getInitialValues,
	leftStaticFormFields,
	rightStaticFormFields,
	permissionIcons,
	permissionLabel,
};
