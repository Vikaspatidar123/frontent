import * as Yup from 'yup';

const BOOL = {
	true: 'true',
	false: 'false',
};

const getSiteConfigInitialValues = (details) => ({
	userEndUrl: details?.userEndUrl?.value || '',
	applicationName: details?.applicationName?.value || '',
	adminEndUrl: details?.adminEndUrl?.value || '',
	defaultSupport: details?.defaultSupport?.value || '',
	logo: details?.logo?.value || '',
	maxOdds: details?.maxOdds?.value || '',
	minOdds: details?.minOdds?.value || '',
	exchangeBetCommission: details?.exchangeBetCommission?.value || '',
	minStakeAmount: details?.minStakeAmount?.value || '',

	gallery: details?.gallery?.value || '',
	siteLayout: details?.siteLayout?.value || '',
});

const getAppSettingInitialValues = (details) => ({
	allowBetting: details?.allowBetting?.value === BOOL.true || false,
	casino: details?.casino?.value === BOOL.true || false,
	sportsbook: details?.sportsbook?.value === BOOL.true || false,
	maintenance: details?.maintenance?.value === BOOL.true || false,
});

const adminSiteConfigSchema = Yup.object().shape({
	applicationName: Yup.string()
		.min(3, 'Name must be atleast 3 characters')
		.max(200)
		.required('Name Required'),
	userEndUrl: Yup.string()
		.matches(
			/((https?):\/\/)?(www\.)?(([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?(\?[^\s]*)?|((https?):\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*)?(\?[^\s]*)?/,
			'Enter correct url!'
		)
		.required('Url Required'),
	adminEndUrl: Yup.string().matches(
		/((https?):\/\/)?(www\.)?(([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?(\?[^\s]*)?|((https?):\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*)?(\?[^\s]*)?/,
		'Enter correct url!'
	),
	defaultSupport: Yup.string()
		.email('Invalid Email')
		.max(50)
		.required('Email Required'),
	logo: Yup.mixed()
		.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
			typeof value === 'string'
				? true
				: !value || (value && value.size <= 1024 * 1024)
		)
		.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
			typeof value === 'string'
				? true
				: value && ['image/png', 'image/jpeg', 'image/svg'].includes(value.type)
		),
	maxOdds: Yup.number(),
	minOdds: Yup.number(),
	minStakeAmount: Yup.number(),
	exchangeBetCommission: Yup.number(),
});

const appSettingValidation = Yup.object().shape({});

const leftStaticSiteConfigFormFields = (details, customBlurHandler) => [
	{
		name: 'applicationName',
		fieldType: 'textField',
		description: details?.applicationName?.description,
		label: 'Application name',
		placeholder: 'Enter application name',
		customBlurHandler,
	},
	{
		name: 'defaultSupport',
		fieldType: 'textField',
		description: details?.defaultSupport?.description,
		label: 'Support email',
		placeholder: 'Enter support email',
		customBlurHandler,
	},
	{
		name: 'minOdds',
		fieldType: 'textField',
		description: details?.minOdds?.description,
		label: 'Min odds',
		placeholder: 'Enter min odds',
		customBlurHandler,
	},
	{
		name: 'minStakeAmount',
		fieldType: 'textField',
		description: details?.minStakeAmount?.description,
		label: 'Minimum stake amount',
		placeholder: 'Enter minimum stake amount',
		customBlurHandler,
	},
	{
		name: 'logo',
		fieldType: 'file',
		description: details?.logo?.description,
		label: 'Application Logo',
		placeholder: 'Enter application logo',
		showThumbnail: true,
		customThumbnailBackground: '#1A1D29',
		customPadding: '8px',
		callBack: customBlurHandler,
	},
];

const rightStaticSiteConfigFormFields = (details, customBlurHandler) => [
	{
		name: 'userEndUrl',
		fieldType: 'textField',
		label: 'User end Url',
		description: details?.userEndUrl?.description,
		placeholder: 'Enter user end url',
		customBlurHandler,
	},
	{
		name: 'adminEndUrl',
		fieldType: 'textField',
		label: 'Admin End Url',
		description: details?.adminEndUrl?.description || 'Url for admin end',
		placeholder: 'Enter admin end url',
		customBlurHandler,
	},
	{
		name: 'maxOdds',
		fieldType: 'textField',
		label: 'Max odds',
		description: details?.maxOdds?.description,
		placeholder: 'Enter max odds',
		customBlurHandler,
	},
	{
		name: 'exchangeBetCommission',
		fieldType: 'textField',
		label: 'Exchange bet commission',
		description: details?.exchangeBetCommission?.description,
		placeholder: 'Enter exchange bet commission',
		customBlurHandler,
	},
];

const leftAppSettingsFormFields = (details, customOnChange) => [
	{
		name: 'allowBetting',
		fieldType: 'toggle',
		description: details?.allowBetting?.description,
		label: 'Allow betting',
		switchSizeClass: 'd-flex justify-content-between form-switch-md px-0 py-1',
		containerClass: 'false',
		callBack: customOnChange,
		divClass: 'mb-5',
	},
	{
		name: 'casino',
		fieldType: 'toggle',
		description: details?.casino?.description,
		label: 'Casino',
		switchSizeClass: 'd-flex justify-content-between form-switch-md px-0 py-1',
		containerClass: 'false',
		callBack: customOnChange,
		divClass: 'mb-5',
	},
];

const rightAppSettingFormFields = (details, customOnChange) => [
	{
		name: 'maintenance',
		fieldType: 'toggle',
		label: 'Maintenance',
		description: details?.maintenance?.description,
		switchSizeClass: 'd-flex justify-content-between form-switch-md px-0 py-1',
		containerClass: 'false',
		callBack: customOnChange,
		divClass: 'mb-5',
	},
	{
		name: 'sportsbook',
		fieldType: 'toggle',
		label: 'Sports book',
		description: details?.sportsbook?.description,
		switchSizeClass: 'd-flex justify-content-between form-switch-md px-0 py-1',
		containerClass: 'false',
		callBack: customOnChange,
		divClass: 'mb-5',
	},
];

const referralSchema = Yup.object().shape({
	amount: Yup.number()
		.min(0.01, 'Amount must be greater than 0.')
		.required('Amount is required!'),
});

const getReferralInitialValues = (details) => ({
	amount: details?.amount ?? 0,
	status: details?.status ?? false,
});

const leftStaticReferralFormFields = (_, handleUpdate) => [
	{
		name: 'status',
		fieldType: 'toggle',
		topDescription:
			'Player can refer this application to other non register players.',
		label: 'Allow Referral',
		switchSizeClass: 'd-flex justify-content-between form-switch-md px-0 pt-3',
		containerClass: 'false',
		callBack: handleUpdate,
		divClass: 'mb-5',
	},
];

const rightStaticReferralFormFields = (details, handleUpdate) => [
	{
		name: 'amount',
		fieldType: 'textField',
		description: details?.description || '',
		label: 'Referral Amount',
		type: 'number',
		placeholder: 'Enter Referral Amount',
		customBlurHandler: handleUpdate,
	},
];

export {
	adminSiteConfigSchema,
	getSiteConfigInitialValues,
	leftStaticSiteConfigFormFields,
	rightStaticSiteConfigFormFields,
	leftAppSettingsFormFields,
	rightAppSettingFormFields,
	getAppSettingInitialValues,
	BOOL,
	appSettingValidation,
	referralSchema,
	getReferralInitialValues,
	leftStaticReferralFormFields,
	rightStaticReferralFormFields,
};
