import * as Yup from 'yup';
import { PAYMENT_PROVIDER_CATEGORY } from './constants';

// Filter
const staticFiltersFields = () => [
	// {
	// 	name: 'isActive',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Status',
	// 	optionList: IS_ACTIVE_TYPES?.map(({ id, label, value }) => ({
	// 		id,
	// 		optionLabel: label,
	// 		value,
	// 	})),
	// },
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name',
	},
];

const filterValues = () => ({
	// isActive: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		// isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

const generaFromFields = [
	{
		name: 'name',
		fieldType: 'textField',
		type: 'text',
		label: 'Provider Name',
		isRequired: true,
		placeholder: 'Provider Name',
	},
	{
		name: 'aggregator',
		fieldType: 'textField',
		type: 'text',
		label: 'Aggregator',
		isRequired: true,
		placeholder: 'Aggregator',
	},
	{
		name: 'category',
		fieldType: 'select',
		label: 'Category',
		isRequired: true,
		placeholder: 'Category',
		optionList: PAYMENT_PROVIDER_CATEGORY.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
	},
	// {
	// 	name: 'displayName',
	// 	fieldType: 'textField',
	// 	type: 'text',
	// 	label: 'Title',
	// 	isRequired: true,
	// 	placeholder: 'Title',
	// },
	{
		name: 'description',
		fieldType: 'textField',
		type: 'text',
		label: 'Description',
		isRequired: true,
		placeholder: 'Description',
	},
	{
		name: 'depositAllowed',
		fieldType: 'toggle',
		label: 'Deposit Allowed',
		isNewRow: true,
		tooltipContent: 'If True Status is Deposit will be Active else In-Active',
	},
	{
		name: 'withdrawAllowed',
		fieldType: 'toggle',
		label: 'Withdraw Allowed',
		isNewRow: false,
		tooltipContent: 'If True Status is Withdraw will be Active else In-Active',
	},
	{
		name: 'image',
		fieldType: 'file',
		type: '',
		label: 'Payment Provider Image',
		placeholder: 'Select payment provider image',
		isNewRow: true,
		showThumbnail: true,
	},
	// {
	// 	name: 'depositImage',
	// 	fieldType: 'file',
	// 	type: '',
	// 	label: 'Deposit Image',
	// 	placeholder: 'Select deposit image',
	// 	isNewRow: true,
	// 	showThumbnail: true,
	// },
	// {
	// 	name: 'withdrawImage',
	// 	fieldType: 'file',
	// 	type: '',
	// 	label: 'Withdraw Image',
	// 	placeholder: 'Select withdraw image',
	// 	isNewRow: false,
	// 	showThumbnail: true,
	// },
];

const getInitialValues = (paymentDetails, allCurrencies) => {
	const providerLimit = {};
	if (paymentDetails?.providerLimits?.length)
		paymentDetails?.providerLimits?.forEach((item) => {
			providerLimit[parseFloat(item?.currencyId)] = {
				...item,
				currencyName: allCurrencies?.[item?.currencyId]?.name || '',
			};
		});

	return {
		name: paymentDetails?.name?.EN || '',
		// displayName: paymentDetails?.displayName?.EN || '',
		description: paymentDetails?.description?.EN || '',
		aggregator: paymentDetails?.aggregator || '',
		category: paymentDetails?.category || null,
		depositAllowed: paymentDetails?.depositAllowed
			? paymentDetails?.depositAllowed
			: false,
		withdrawAllowed: paymentDetails?.withdrawAllowed
			? paymentDetails?.withdrawAllowed
			: false,
		image: paymentDetails?.image || '',
		// depositImage: paymentDetails?.depositImage || null,
		// withdrawImage: paymentDetails?.withdrawImage || null,
		providerLimit,
		blockedCountries: paymentDetails?.blockedCountries || [],
		currencyDetails: {
			currencyId: null,
			minDeposit: null,
			maxDeposit: null,
			minWithdraw: null,
			maxWithdraw: null,
		},
	};
};

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generaFromFields,
	getInitialValues,
};
