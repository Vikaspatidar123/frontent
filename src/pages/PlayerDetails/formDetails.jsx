import * as Yup from 'yup';
import { formatDateYMD } from '../../utils/helpers';
import { statusType } from '../TransactionBankingList/constants';
import {
	BET_SLIP_SETTLEMENT_STATUS,
	BET_TYPES,
	LEDGER_PURPOSE,
	LEDGER_TYPES,
	bonusStatus,
	bonusTypes,
} from './constants';

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
		label: 'Note',
		required: true,
		placeholder: 'Enter Note',
	},
];

const limitsSchema = ({ minimum, currLabel, label }) =>
	Yup.object().shape({
		limit: Yup.number()
			.positive('Limit must be positive number')
			.integer('Limit must be an integer')
			.min(
				parseInt(minimum, 10) + 1,
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
		countryCode: Yup.string()?.required('Country Code Required'),
	});

const getInitialValuesUpdateUser = (defaultValue) => {
	const address = defaultValue?.addresses?.[0];
	return {
		userId: defaultValue?.id,
		firstName: defaultValue?.firstName,
		lastName: defaultValue?.lastName,
		username: defaultValue?.username,
		email: defaultValue?.email,
		countryCode: address?.countryCode || null,
		address: address?.address,
		city: address?.city,
		zipCode: address?.zipCode,
		dateOfBirth: formatDateYMD(defaultValue?.dateOfBirth),
		gender: defaultValue?.gender,
		currencyCode: defaultValue?.currencyCode,
		phoneCode: defaultValue?.phoneCode || '',
		phone: defaultValue?.phone || '',
		preferredLanguage: defaultValue?.preferredLanguage || '',
		newsLetter: defaultValue?.newsLetter || false,
		sms: defaultValue?.sms || false,
	};
};

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

// Bet History filters
const staticFiltersFields = () => [
	// {
	// 	name: 'gameId',
	// 	fieldType: 'textField',
	// 	placeholder: 'Search by gameId',
	// 	type: 'search',
	// },
	{
		name: 'walletId',
		fieldType: 'textField',
		placeholder: 'Search by walletId',
		type: 'search',
	},
	// {
	// 	name: 'actioneeId',
	// 	fieldType: 'textField',
	// 	placeholder: 'Search by actioneeId',
	// 	type: 'search',
	// },
	{
		name: 'transactionId',
		fieldType: 'textField',
		placeholder: 'Search by transactionId',
		type: 'search',
	},
	{
		name: 'conversionRate',
		fieldType: 'textField',
		placeholder: 'Search by conversionRate',
		type: 'search',
	},
	// {
	// 	name: 'previousTransactionId',
	// 	fieldType: 'textField',
	// 	placeholder: 'Search by previousTransactionId',
	// 	type: 'search',
	// },
	// {
	// 	name: 'transactionType',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Action Type',
	// 	optionList: ACTION_TYPES.map(({ value, label }) => ({
	// 		id: value,
	// 		value,
	// 		optionLabel: label,
	// 	})),
	// },
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: statusType.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];

const filterValues = () => ({
	startDate: '',
	endDate: '',
	// gameId: '',
	walletId: '',
	// actioneeId: '',
	transactionId: '',
	conversionRate: '',
	// previousTransactionId: '',
	// transactionType: null,
	status: null,
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		transactionType: Yup.string().nullable(),
		gameId: Yup.string().nullable(),
		walletId: Yup.string().nullable(),
		actioneeId: Yup.string().nullable(),
		transactionId: Yup.string().nullable(),
		conversionRate: Yup.string().nullable(),
		previousTransactionId: Yup.string().nullable(),
	});

// Sports Bet History filters
const sportsBetFiltersFields = () => [
	{
		name: 'type',
		fieldType: 'select',
		label: '',
		placeholder: 'Bet Slip Type',
		optionList: BET_TYPES.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'settlementStatus',
		fieldType: 'select',
		label: '',
		placeholder: 'Bet Slip Settlement Status',
		optionList: BET_SLIP_SETTLEMENT_STATUS.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];

const sportsBetFilterValues = () => ({
	type: null,
	settlementStatus: null,
	startDate: null,
	endDate: null,
});

const sportsBetFilterValidationSchema = () =>
	Yup.object({
		type: Yup.string().nullable(),
		settlementStatus: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
	});

// Transaction filters

const transactionFiltersFields = () => [
	{
		name: 'type',
		fieldType: 'select',
		label: '',
		placeholder: 'Ledger type',
		optionList: LEDGER_TYPES.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'purpose',
		fieldType: 'select',
		label: '',
		placeholder: 'Ledger Purpose',
		optionList: LEDGER_PURPOSE.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];

const transactionFilterValues = () => ({
	startDate: null,
	endDate: null,
	currencyCode: null,
	type: null,
	purpose: null,
});

const transactionFilterValidationSchema = () =>
	Yup.object({
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		type: Yup.string().nullable(),
		purpose: Yup.string().nullable(),
	});

// Bonus filters

const bonusFiltersFields = () => [
	{
		name: 'bonusType',
		fieldType: 'select',
		label: '',
		placeholder: 'Bonus type',
		optionList: bonusTypes.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: bonusStatus.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
];

const bonusFilterValues = () => ({
	bonusType: null,
	status: null,
});

const bonusFilterValidationSchema = () =>
	Yup.object({
		bonusType: Yup.string().nullable(),
		status: Yup.string().nullable(),
	});

// Comments filter
// search: anil
// userId: 72
// role: admin
// status: false
const commentsFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by Title, Description or Agent',
	},
	{
		name: 'role',
		fieldType: 'select',
		label: '',
		placeholder: 'Select Role',
		optionList: [
			{
				value: 'admin',
				optionLabel: 'Admin',
			},
		],
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				value: true,
				optionLabel: 'Active',
			},
			{
				value: false,
				optionLabel: 'Resolved',
			},
		],
	},
];

const commentsFilterValues = () => ({
	search: '',
	role: null,
	status: null,
});

const commentsFilterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		role: Yup.string().nullable(),
		status: Yup.string().nullable(),
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
	staticFiltersFields,
	filterValidationSchema,
	filterValues,
	sportsBetFiltersFields,
	sportsBetFilterValues,
	sportsBetFilterValidationSchema,
	transactionFiltersFields,
	transactionFilterValues,
	transactionFilterValidationSchema,
	bonusFiltersFields,
	bonusFilterValues,
	bonusFilterValidationSchema,
	commentsFilterValidationSchema,
	commentsFilterValues,
	commentsFiltersFields,
};
