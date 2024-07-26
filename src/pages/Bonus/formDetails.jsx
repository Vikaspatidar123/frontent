import * as Yup from 'yup';
import moment from 'moment';
import {
	BONUS_KEY_RELATION,
	BONUS_TYPES,
	bonusTypes,
	daysOfWeek,
} from './constants';
import { IS_ACTIVE_TYPES } from '../CasinoTransactionsList/constants';

const currentDate = moment().toDate();
const nextDayDate = moment().add(1, 'days').toDate();

const getBonusInitialValues = (bonusDetails) => {
	const validOnDays = bonusDetails?.validOnDays
		? daysOfWeek.map(({ value, id }) => {
				if (`${bonusDetails.validOnDays}`?.[id]) {
					return value;
				}
				return '';
		  })
		: [];

	const {
		zeroOutThreshold,
		currencyId,
		joiningAmount,
		maxBonusClaimed,
		minBetAmount,
		minDepositAmount,
	} = bonusDetails?.bonusCurrencies?.[0] || {};

	const currencyDetails = bonusDetails?.bonusCurrencies?.length
		? {
				currencyId,
				zeroOutThreshold,
				joiningAmount,
				maxBonusClaimed,
				minBetAmount,
				minDepositAmount,
		  }
		: {
				zeroOutThreshold: null,
				currencyId: null,
				joiningAmount: null,
				maxBonusClaimed: null,
				minBetAmount: null,
				minDepositAmount: null,
		  };

	const wageringTemplateId =
		bonusDetails?.[BONUS_KEY_RELATION[bonusDetails?.bonusType]]
			?.wageringTemplateId || '';
	const quantity =
		bonusDetails?.[BONUS_KEY_RELATION[bonusDetails?.bonusType]]
			?.freespinQuantity || null;
	const gameIds =
		bonusDetails?.[BONUS_KEY_RELATION[bonusDetails?.bonusType]]?.gameIds || [];
	const percentage =
		bonusDetails?.[BONUS_KEY_RELATION[bonusDetails?.bonusType]]?.percentage ||
		null;

	return {
		promotionTitle: bonusDetails?.promotionTitle?.EN || '',
		description: bonusDetails?.description?.EN || '',
		termAndCondition: bonusDetails?.termAndCondition?.EN || '',

		wageringTemplateId,
		percentage,
		validFrom: new Date(bonusDetails?.validFrom || currentDate),
		validTo: new Date(bonusDetails?.validTo || nextDayDate),
		bonusType: bonusDetails?.bonusType || BONUS_TYPES.JOINING,
		daysToClear: bonusDetails?.daysToClear || 1,
		quantity,
		isActive: bonusDetails?.isActive || true,
		visibleInPromotions: bonusDetails?.visibleInPromotions || false,
		validOnDays,
		bonusImage: bonusDetails?.imageUrl || null,
		currencyDetails,
		gameIds,
	};
};

const commonFields = (bonusDetails, handleBonusTypeChange = () => {}) => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: 'text',
		label: 'Bonus Title',
		placeholder: 'Bonus Title',
	},
	{
		name: 'bonusType',
		fieldType: 'select',
		label: 'Bonus Type',
		placeholder: 'Select Bonus type',
		optionList: bonusTypes.map(({ label, value, id }) => ({
			optionLabel: label,
			value,
			id,
		})),
		isDisabled: bonusDetails?.bonusType,
		callBack: handleBonusTypeChange,
	},
	{
		name: 'percentage',
		fieldType: 'textField',
		type: 'number',
		label: 'Bonus Percentage',
		placeholder: 'Bonus Percentage',
		isHidable: (form) =>
			form.bonusType === BONUS_TYPES.JOINING ||
			form.bonusType === BONUS_TYPES.FREESPINS,
	},
	{
		name: 'validFrom',
		fieldType: 'dateRangeSelector',
		label: 'Bonus Validity',
		placeholder: 'Select Range',
		minDate: '',
		maxDate: '',
		rangeKeys: ['validFrom', 'validTo'],
		// isHidable: (form) => form.bonusType === BONUS_TYPES.JOINING,
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
		isHidable: (form) => form.bonusType === BONUS_TYPES.JOINING,
	},
	{
		name: 'quantity',
		fieldType: 'textField',
		type: 'number',
		label: 'Quantity',
		placeholder: 'Enter quantity',
		isHidable: (form) =>
			form.bonusType === BONUS_TYPES.JOINING ||
			form.bonusType === BONUS_TYPES.DEPOSIT,
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Active',
		isNewRow: true,
		tooltipContent: 'If True Status is Active else Inactive',
		isHidable: (form) => form.bonusType === BONUS_TYPES.JOINING,
	},
	{
		name: 'visibleInPromotions',
		fieldType: 'toggle',
		label: 'Visible in Promotions',
		tooltipContent: 'If true visible in promotions else not',
		isHidable: (form) => form.bonusType === BONUS_TYPES.JOINING,
	},
	{
		name: 'validOnDays',
		fieldType: 'radioGroupMulti',
		label: 'Valid On Days',
		optionList: daysOfWeek.map(({ label, value, id }) => ({
			optionLabel: label,
			value,
			id,
		})),
		dependsOn: 'visibleInPromotions',
		fieldColOptions: { lg: 12 },
		isNewRow: true,
		isHidable: (form) => form.bonusType === BONUS_TYPES.JOINING,
	},
	{
		name: 'description',
		fieldType: 'textEditor',
		type: '',
		label: 'Description',
		placeholder: 'Enter Description',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
		defaultValue: bonusDetails?.description?.EN,
	},
	{
		name: 'termAndCondition',
		fieldType: 'textEditor',
		type: '',
		label: 'Terms and Conditions',
		placeholder: 'Enter Terms and Conditions',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
		defaultValue: bonusDetails?.termAndCondition?.EN,
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
		optionList: IS_ACTIVE_TYPES.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
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
	getBonusInitialValues,
	commonFields,
};
