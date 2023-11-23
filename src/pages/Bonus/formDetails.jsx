import * as Yup from 'yup';
import moment from 'moment';
import { bonusTypes } from './constants';

const currentDate = moment().toDate();
const nextDayDate = moment().add('days', 1).toDate();

const generalStepInitialValues = ({ bonusDetails }) => ({
	promotionTitle: bonusDetails?.promotionTitle?.EN || '',
	depositBonusPercent: bonusDetails?.depositBonusPercent || 1,
	//  change to ValidFrom and validTo
	startDate: bonusDetails?.validFrom || currentDate,
	endDate: bonusDetails?.validTo || nextDayDate,
	bonusType: bonusDetails?.bonusType || 'deposit',
	wageringMultiplier: bonusDetails?.wageringMultiplier || 1,
	isSticky: bonusDetails?.isSticky || false,
	wageringRequirementType: bonusDetails?.wageringRequirementType || 'bonus',
	daysToClear: bonusDetails?.daysToClear || 1,
	isActive: bonusDetails?.isActive || false,
	visibleInPromotions: bonusDetails?.visibleInPromotions || false,
	showBonusValidity: bonusDetails?.other?.showBonusValidity || true,
	validOnDays: bonusDetails?.validOnDays || [],
	termCondition: bonusDetails?.termCondition?.EN || '',
	description: bonusDetails?.description?.EN || '',
	bonusImage: bonusDetails?.imageUrl || null,
	quantity: bonusDetails?.quantity || 1,
	betLevel: bonusDetails?.other?.betLevel || 1,
	timePeriod: bonusDetails?.other?.timePeriod || '1',
	currency: {
		EUR: {
			maxBonusThreshold: '',
			minDeposit: '',
			maxWinAmount: '',
			zeroOutThreshold: '',
		},
	},
});

const getCreateBonusInitialValues = () => ({
	promotionTitle: '',
	bonusType: 'deposit',
	//  change to ValidFrom and validTo
	startDate: currentDate,
	endDate: nextDayDate,
	termCondition: '',
	quantity: 1,
	wageringMultiplier: 1,
	currency: {
		EUR: {
			maxBonusThreshold: '',
			minDeposit: '',
			maxWinAmount: '',
			zeroOutThreshold: '',
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

const generalStaticFormFieldsWithoutPercent = (isDisabled) => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: '',
		label: 'Promotion Title',
		placeholder: 'Promotion Title',
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: 'Bonus Validity',
		placeholder: 'Select Range',
		minDate: moment().utc().startOf('day').toDate(),
		maxDate: moment().add(100, 'years').utc().toDate(),
		isDisabled,
	},
];

const generalStaticFormFields = (isDisabled) => [
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
		isDisabled,
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: 'Bonus Validity',
		placeholder: 'Select Range',
		minDate: moment().utc().startOf('day').toDate(),
		maxDate: moment().add(100, 'years').utc().toDate(),
		isDisabled,
	},
];

const commonFields = (isDisabled) => [
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Active',
		isNewRow: true,
		isDisabled,
		tooltipContent: 'If True Status is Active else In-Active',
	},
	{
		name: 'visibleInPromotions',
		fieldType: 'toggle',
		label: 'Visible in Promotions',
		isDisabled,
		tooltipContent: 'If true visible in promotions else not',
	},
	{
		name: 'showBonusValidity',
		fieldType: 'toggle',
		label: 'Hide Validity',
		tooltipContent: 'If true bonus validity will be hidden to user',
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
		showThumbnail: true,
	},
];

const typeDepositAdditionalFields = (isDisabled) => [
	{
		name: 'wageringMultiplier',
		fieldType: 'textField',
		type: 'number',
		label: 'Wagering Multiplier',
		placeholder: 'Wagering Multiplier',
		isDisabled,
	},
	{
		name: 'isSticky',
		fieldType: 'select',
		label: 'Is Sticky',
		placeholder: 'Is Sticky',
		isDisabled,
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
				value: 'bonus',
			},
			{
				id: 2,
				optionLabel: 'Bonus+Deposit',
				value: 'bonusdeposit',
			},
		],
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		type: 'number',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
		isDisabled,
	},
	...commonFields(isDisabled),
];

const typeFreeSpinAdditionalFields = (isDisabled) => [
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
				value: 'bonus',
			},
			{
				id: 2,
				optionLabel: 'Bonus+Deposit',
				value: 'bonusdeposit',
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
		isDisabled,
	},
	...commonFields(isDisabled),
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
	generalStepInitialValues,
	generalStaticFormFieldsWithoutPercent,
};
