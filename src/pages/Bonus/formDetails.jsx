import * as Yup from 'yup';
import moment from 'moment';
import { bonusTypes } from './constants';

const currentDate = moment().toDate();

const getCreateBonusInitialValues = () => ({
	promotionTitle: '',
	bonusType: 'deposit',
	//  change to ValidFrom and validTo
	startDate: currentDate,
	endDate: currentDate,
	termCondition: '',
	quantity: 1,
	wageringMultiplier: 1,
	currency: {
		EUR: {
			maxBonusThreshold: '',
			minDeposit: '',
			maxWinAmount: '',
			zeroOutThreshold: '',
			minBalance: '',
			joiningAmount: '',
		},
	},
	providers: '',
	daysToClear: 1,
	games: '',
	maxBonusThreshold: '',
	status: '',
	minDeposit: '',
	wageringRequirementType: 1,
	maxWinAmount: '',
	isWinCashAmt: '',
	isBonusWagering: '',
	depositBonusPercent: 1,
	isMultipleAllowed: '',
	// tenantIds: [],
	validOnDays: [],
	bonusImage: null,
	isActive: false,
	showBonusValidity: true,
	visibleInPromotions: false,
	isSticky: false,
	paymentMethods: {},
	// wageringTemplateId: wageringTemplateList?.[0]?.wageringTemplateId,
	appliedBonusId: '',
	appliedBonusVal: '',
	// adminId: '',
	description: '',
	loyaltyLevel: null,
	other: null,
	minBalance: '',
	timePeriod: '1',
	betLevel: 1,
});

const createBonusValidationSchema = () => ({
	// bonusSchema(curr, { bonusDetail: null })[
	//   tabLabels.findIndex((val) => val === selectedTab)
	// ]
});

const generalStaticFormFields = () => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: '',
		label: 'Promotion Title',
		placeholder: 'Promotion Title',
	},
	{
		name: 'depositBonusPercent',
		fieldType: 'textField',
		type: 'number',
		label: 'Bonus Percentage',
		placeholder: 'Bonus Percentage',
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: 'Bonus Validity',
		placeholder: 'Select Range',
		minDate: moment().utc().startOf('day').toDate(),
		maxDate: moment().add(100, 'years').utc().toDate(),
	},
];

const commonFields = () => [
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Active',
		isNewRow: true,
	},
	{
		name: 'visibleInPromotions',
		fieldType: 'toggle',
		label: 'Visible in Promotions',
	},
	{
		name: 'showBonusValidity',
		fieldType: 'toggle',
		label: 'Hide Validity',
	},
	{
		name: 'termCondition',
		fieldType: 'textEditor',
		type: '',
		label: 'Terms and Conditions',
		placeholder: 'Enter Terms and Conditions',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
	},
	{
		name: 'description',
		fieldType: 'textEditor',
		type: '',
		label: 'Description',
		placeholder: 'Enter Description',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
	},
	{
		name: 'bonusImage',
		fieldType: 'file',
		type: '',
		label: 'Bonus Image',
		placeholder: 'Select bonus image',
		isNewRow: true,
	},
];

const typeDepositAdditionalFields = () => [
	{
		name: 'wageringMultiplier',
		fieldType: 'textField',
		type: 'number',
		label: 'Wagering Multiplier',
		placeholder: 'Wagering Multiplier',
	},
	{
		name: 'isSticky',
		fieldType: 'select',
		label: 'Is Sticky',
		placeholder: 'Is Sticky',
		optionList: [
			{
				id: 1,
				optionLabel: 'Yes',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'No',
				value: false,
			},
		],
	},
	{
		name: 'wageringRequirementType',
		fieldType: 'select',
		label: 'Wagering Type',
		placeholder: 'Wagering Type',
		isDisabled: true,
		optionList: [
			{
				id: 1,
				optionLabel: 'Bonus',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'Bonus+Deposit',
				value: false,
			},
		],
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		type: 'number',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
	},
	...commonFields(),
];

const typeFreeSpinAdditionalFields = () => [
	{
		name: 'quantity',
		fieldType: 'textField',
		type: 'number',
		label: 'Quantity',
		placeholder: 'Quantity',
	},
	{
		name: 'wageringMultiplier',
		fieldType: 'textField',
		type: 'number',
		label: 'Wagering Multiplier',
		placeholder: 'Wagering Multiplier',
	},
	{
		name: 'wageringRequirementType',
		fieldType: 'select',
		label: 'Wagering Type',
		placeholder: 'Wagering Type',
		isDisabled: true,
		optionList: [
			{
				id: 1,
				optionLabel: 'Bonus',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'Bonus+Deposit',
				value: false,
			},
		],
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		type: 'number',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
	},
	{
		name: 'betLevel',
		fieldType: 'textField',
		type: 'number',
		label: 'Bet Level',
		placeholder: 'Bet Level',
	},
	...commonFields(),
];

// Filters
const staticFiltersFields = () => [
	{
		name: 'bonusType',
		fieldType: 'select',
		label: '',
		placeholder: 'Bonus type',
		optionList: bonusTypes.map(({ label, value, id }) => ({
			optionLabel: label,
			value,
			id,
		})),
	},
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title and description',
	},
	{
		name: 'isActive',
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
];

const filterValues = () => ({
	isActive: null,
	search: '',
	bonusType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
		bonusType: Yup.string().nullable(),
	});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getCreateBonusInitialValues,
	createBonusValidationSchema,
	generalStaticFormFields,
	typeDepositAdditionalFields,
	typeFreeSpinAdditionalFields,
	commonFields,
};
