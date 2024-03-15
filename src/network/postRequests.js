import { postRequest } from './axios';
import { MANAGEMENT } from './networkUtils';

const { VITE_APP_API_URL } = import.meta.env;
const API_NAMESPACE = '/api/v2';

const superAdminLogin = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}login`,
		data
	);

const createCurrency = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/currency`, data);

const updateCurrency = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}currency/update`,
		data
	);
const editCountryDetails = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}country/update`,
		data
	);

const updateCurrencyStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}currency/toggle`,
		data
	);

const updateCountryStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}country/toggle`,
		data
	);

const addSuperAdminUser = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}create-user`,
		data
	);

const createAggregator = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/aggregator`, data);

const createCasinoProvider = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/provider`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createReview = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}review`,
		data
	);

const createBetSettings = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/bet-settings`,
		data
	);

const createSABanners = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/banner`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createCasinoCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}create-category`,
		data
	);

const createKYCLabels = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}/kyc/document-label/create`,
		data
	);

const createCasinoSubCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}create-sub-category`,
		data
	);

const createUserCommentEntry = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/comment`, data);

const createWageringTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template`, data);

const resetUserLimitCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}limit/update-betting`,
		data
	);

const resetDepositLimitCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}limit/update-deposit-and-loss`,
		data
	);

const disableUserCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}limit/update-self-exclusion`,
		data
	);

const disableUserSession = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/session-time`, data);

const createSuperAdminCMS = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/cms`, data);

const updateMatchFeaturedTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}admin/sportsbook/addFeatured`, data);

const issueBonus = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/issue`, data);

const testEmailTemplateEndPoint = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/test`, data);

const createEmailTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email`, data);

const isCasinoFeaturedService = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/featured-games`,
		data
	);

const addGamesToSubCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/category-games`,
		data
	);

const createBonusCall = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus`, data, {
		'Content-Type': 'multipart/form-data',
	});

const uploadGallery = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}gallery/upload`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const updateProfile = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}update-profile`,
		data
	);

const resetProfilePassword = ({ data }) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}change-password`,
		data
	);

const superAdminViewToggleStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}toggle-child`,
		data
	);

const updateKYCLabels = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}/kyc/document-label/update`,
		data
	);

const updateSAUserStatusCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/toggle`,
		data
	);

const attachUserTags = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}tag/attach-tag`,
		data
	);

const removeUserTags = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}tag/remove-tag`,
		data
	);

const updatePageStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}page/toggle`,
		data
	);

const updateUserInfoCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/update`,
		data
	);

const updateUserPassword = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/update-password`,
		data
	);

const addDepositToOtherCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}wallet`,
		data
	);

const resetPasswordEmail = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/reset-password`,
		data
	);

const verifyPlayerEmail = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/verify-email`,
		data
	);

const updateAdmin = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}update-child`,
		data
	);

const casinoManagementToggle = (data) => {
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}toggle`,
		data
	);
};

const updateSportStatus = (data) => {
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}toggle-sport`,
		data
	);
};

const updateLocationStatus = (data) => {
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}toggle-location`,
		data
	);
};

const requestDocument = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/request-document`,
		data
	);

export {
	createSuperAdminCMS,
	superAdminLogin,
	createCurrency,
	updateCurrency,
	editCountryDetails,
	addSuperAdminUser,
	createAggregator,
	createCasinoProvider,
	createReview,
	createBetSettings,
	createSABanners,
	createCasinoCategory,
	createKYCLabels,
	createCasinoSubCategory,
	createUserCommentEntry,
	createWageringTemplate,
	resetUserLimitCall,
	disableUserCall,
	disableUserSession,
	updateMatchFeaturedTemplate,
	issueBonus,
	resetDepositLimitCall,
	isCasinoFeaturedService,
	testEmailTemplateEndPoint,
	createEmailTemplate,
	addGamesToSubCategory,
	createBonusCall,
	uploadGallery,
	updateProfile,
	resetProfilePassword,
	superAdminViewToggleStatus,
	updateKYCLabels,
	updateCurrencyStatus,
	updateCountryStatus,
	updateSAUserStatusCall,
	attachUserTags,
	removeUserTags,
	updatePageStatus,
	updateUserInfoCall,
	updateUserPassword,
	addDepositToOtherCall,
	resetPasswordEmail,
	verifyPlayerEmail,
	updateAdmin,
	casinoManagementToggle,
	updateSportStatus,
	updateLocationStatus,
	requestDocument,
};
