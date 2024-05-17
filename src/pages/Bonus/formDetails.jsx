import * as Yup from 'yup';
import moment from 'moment';
import { BONUS_TYPES, bonusTypes, daysOfWeek } from './constants';
import { IS_ACTIVE_TYPES } from '../CasinoTransactionsList/constants';

const currentDate = moment().toDate();
const nextDayDate = moment().add(1, 'days').toDate();

const getCreateBonusInitialValues = () => ({
	promotionTitle: '',
	description: '',
	termAndCondition: '',

	wageringTemplateId: '',
	percentage: '',
	validFrom: currentDate,
	validTo: nextDayDate,
	bonusType: BONUS_TYPES.JOINING,
	daysToClear: '1',
	isActive: false,
	visibleInPromotions: false,
	validOnDays: [],
	bonusImage: null,
	currencyDetails: {
		zeroOutThreshold: '',
		currencyId: '',
		joiningAmount: '',
		maxAmountClaimed: '',
		minBetAmount: '',
		minDepositAmount: '',
	},
});

const commonFields = (
	values,
	presetDates = [],
	handleBonusTypeChange = () => {}
) => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: 'text',
		label: 'Promotion Title',
		placeholder: 'Promotion Title',
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
		callBack: handleBonusTypeChange,
	},
	{
		name: 'percentage',
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
		minDate: presetDates?.length
			? moment(presetDates[0]).utc().startOf('day').toDate()
			: moment().utc().startOf('day').toDate(),
		maxDate: presetDates?.length
			? moment(presetDates[1]).add(100, 'years').utc().toDate()
			: moment().add(100, 'years').utc().toDate(),
		rangeKeys: ['validFrom', 'validTo'],
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Active',
		isNewRow: true,
		tooltipContent: 'If True Status is Active else In-Active',
	},
	{
		name: 'visibleInPromotions',
		fieldType: 'toggle',
		label: 'Visible in Promotions',
		tooltipContent: 'If true visible in promotions else not',
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
		name: 'termAndCondition',
		fieldType: 'textEditor',
		type: '',
		label: 'Terms and Conditions',
		placeholder: 'Enter Terms and Conditions',
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
		name: 'searchString',
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
		optionList: IS_ACTIVE_TYPES?.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
	},
];

const filterValues = () => ({
	isActive: null,
	searchString: '',
	bonusType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
		bonusType: Yup.string().nullable(),
	});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getCreateBonusInitialValues,
	commonFields,
};
