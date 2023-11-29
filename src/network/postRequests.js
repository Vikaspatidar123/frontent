import { postRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;
const API_NAMESPACE = '/api/v1';

const superAdminLogin = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin/login`, data);

const createCurrency = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/currency`, data);

const addSuperAdminUser = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin`, data);

const createAggregator = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/aggregator`, data);

const createCasinoProvider = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/provider`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createReview = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/review`, data);

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
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/category`, data);

const createKYCLabels = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/document-label`, data);

const createCasinoSubCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/sub-category`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createUserCommentEntry = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/comment`, data);

const createWageringTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template`, data);

const resetUserLimitCall = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/daily-limit`, data);

const resetDepositLimitCall = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/deposit-limit`, data);

const resetLossLimitCall = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/loss-limit`, data);

const disableUserCall = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/disable-until`, data);

const disableUserSession = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/session-time`, data);

const createSuperAdminCMS = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/cms`, data);

const updateMatchFeaturedTemplate = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/featured-matches`,
		data
	);

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

export {
	createSuperAdminCMS,
	superAdminLogin,
	createCurrency,
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
	resetLossLimitCall,
	isCasinoFeaturedService,
	testEmailTemplateEndPoint,
	createEmailTemplate,
	addGamesToSubCategory,
	createBonusCall,
};
