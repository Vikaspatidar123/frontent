import * as Yup from 'yup';
import { PAYMENT_PROVIDER_CATEGORY, PAYMENT_PROVIDERS } from './constants';
import { selectedLanguage } from '../../constants/config';

const { VITE_APP_API_URL } = import.meta.env;

// Filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name',
	},
];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

const generaFromFields = (isEdit) => [
	{
		name: 'name',
		fieldType: isEdit ? 'textField' : 'select',
		label: 'Provider Name',
		isRequired: true,
		isDisabled: isEdit,
		placeholder: ' Select Provider Name',
		optionList: PAYMENT_PROVIDERS.map(({ label, value }) => ({
			optionLabel: label,
			value,
		})),
	},
	{
		name: 'aggregator',
		fieldType: 'textField',
		type: 'text',
		label: 'Aggregator',
		isRequired: true,
		placeholder: 'Aggregator',
		maximum: 51,
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
		maximum: 201,
	},
	{
		name: 'depositAllowed',
		fieldType: 'toggle',
		label: 'Deposit Allowed',
		isNewRow: true,
		tooltipContent: 'If True Status is Deposit will be Active else Inactive',
	},
	{
		name: 'withdrawAllowed',
		fieldType: 'toggle',
		label: 'Withdraw Allowed',
		isNewRow: false,
		tooltipContent: 'If True Status is Withdraw will be Active else Inactive',
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

const PaymentProviderStaticFormFields = (isDisabled) => [
	{
		name: 'name',
		fieldType: 'select',
		label: 'Provider Name',
		isRequired: true,
		isDisabled,
		placeholder: ' Select Provider Name',
		optionList: PAYMENT_PROVIDERS.map(({ label, value }) => ({
			optionLabel: label,
			value,
		})),
	},
	// {
	// 	name: 'Privatekey',
	// 	fieldType: 'textField',
	// 	type: 'text',
	// 	label: 'Private key',
	// 	// isRequired: true,
	// 	placeholder: 'Private key',
	// },
	// {
	// 	name: 'SecretKey',
	// 	fieldType: 'textField',
	// 	type: 'text',
	// 	label: 'Secret Key',
	// 	// isRequired: true,
	// 	placeholder: 'Secret Key',
	// },
	// {
	// 	name: 'MerchantId',
	// 	fieldType: 'textField',
	// 	type: 'text',
	// 	label: 'Merchant Id',
	// 	// isRequired: true,
	// 	placeholder: 'Merchant Id',
	// },
	{
		name: 'BaseURL',
		fieldType: 'textField',
		type: 'text',
		label: 'Base URL',
		// isRequired: true,
		placeholder: 'BaseURL',
		// isDisabled: true,
	},
	// {
	// 	name: 'isActive',
	// 	fieldType: 'switch',
	// 	label: 'Set Active/Inacative',
	// 	isNewRow: false,
	// },
	// {
	// 	name: 'icon',
	// 	fieldType: 'file',
	// 	type: '',
	// 	label: 'Payment Provider icon',
	// 	placeholder: 'Upload payment provider icon',
	// 	showThumbnail: true,
	// },
];

const getInitialNewConfigure = (defaultValue) => ({
	name: defaultValue?.name || null,
	icon: defaultValue?.icon || '',
	// Privatekey: defaultValue?.credentials?.Privatekey || '',
	// SecretKey: defaultValue?.credentials?.SecretKey || '',
	// MerchantId: defaultValue?.credentials?.MerchantId || '',
	BaseURL: defaultValue?.credentials?.BaseURL || VITE_APP_API_URL,
	isActive: defaultValue?.isActive || false,
});

const isRequired = (value) => {
	if (typeof value === 'string' && value?.length > 0) return true;
	// if (!value || !value.size) return false;
	return true;
};

const getInitialValues = (paymentDetails) => {
	const providerLimit = {};
	if (paymentDetails?.providerLimits?.length)
		paymentDetails?.providerLimits?.forEach((item) => {
			providerLimit[parseFloat(item?.currencyId)] = {
				...item,
				currencyName: item?.currency?.name || '',
			};
		});

	return {
		name: paymentDetails?.name?.[selectedLanguage] || '',
		// displayName: paymentDetails?.displayName?.[selectedLanguage] || '',
		description: paymentDetails?.description?.[selectedLanguage] || '',
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

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	icon: Yup.mixed()
		.required('icon is required')
		.test('required', 'Image Required', isRequired)
		// .imageDimensionCheck('Image Required', {
		// 	exactWidth: 442,
		// 	exactHeight: 240,
		// })
		.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
			typeof value === 'string'
				? true
				: !value || (value && value.size <= 1024 * 1024)
		)
		.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
			typeof value === 'string'
				? true
				: !value ||
				  (value &&
						['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
		),
	// Privatekey: Yup.string().notRequired(),
	// SecretKey: Yup.string().notRequired(),
	// Merchantid: Yup.string().notRequired(),
	BaseURL: Yup.string()
		.matches(
			/^((https?):\/\/)?(www\.)?(([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?(\?[^\s]*)?|((https?):\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*)?(\?[^\s]*)?$/,
			'Enter correct URL!'
		)
		.nullable(),
	isActive: Yup.boolean().notRequired(),
});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generaFromFields,
	getInitialValues,
	getInitialNewConfigure,
	PaymentProviderStaticFormFields,
	validationSchema,
};
