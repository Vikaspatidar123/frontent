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
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}currency/create`,
		data
	);

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
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}create-provider`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

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

const editBanner = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}banner/upload`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const createCasinoCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}create-category`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const createKYCLabels = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}/kyc/document-label/create`,
		data
	);

const createUserCommentEntry = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/create-comment`,
		data
	);

const createWageringTemplate = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}wagering-template/create
	`,
		data
	);

const updateWageringTemplate = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}wagering-template/update`,
		data
	);

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
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}page/create`,
		data
	);

const updateMatchFeaturedTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}admin/sportsbook/addFeatured`, data);

const issueBonus = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/issue`, data);

const testEmailTemplateEndPoint = (data) =>
	postRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/test`, data);

const createEmailTemplate = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}email/create`,
		data
	);

const isCasinoFeaturedService = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}toggle-featured-game`,
		data
	);

const addGamesToCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}add-games-to-category`,
		data
	);

const createBonusCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonus/create`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

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

const createUserTags = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}tag/create`,
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

const casinoManagementToggle = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}toggle`,
		data
	);

const updateSportStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}toggle-sport`,
		data
	);

const updateLocationStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}toggle-location`,
		data
	);

const requestDocument = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/request-document`,
		data
	);

const verifyDocument = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/verify-document`,
		data
	);

const rejectDocumentCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/reject-document`,
		data
	);

const editCasinoCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-category`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const updateCategoryReOrder = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}reorder-category`,
		data
	);

const updateReorderGames = ({ data }) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}reorder-games`,
		data
	);

const updateSuperAdminCMS = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}page/update`,
		data
	);

const updateEmailTemplate = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}email/update`,
		data
	);

const primaryEmailTemplate = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}/email/set-default`,
		data
	);

const updateSiteConfiguration = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}application/update-constants`,
		data
	);

const uploadLogoRequest = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}application/update-logo`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const updateAppSettingRequest = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}application/toggle`,
		data
	);

const updateLimitsRequest = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}application/update-value-comparisons`,
		data
	);

const updateSiteDetails = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}update-site-layout`,
		data
	);

const addProviderRestrictedCountries = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}restrict-countries-for-provider`,
		data
	);

const addGamesRestrictedCountries = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}restrict-countries-for-game`,
		data
	);

const removeRestrictedCountriesProvider = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}remove-restricted-countries-for-provider`,
		data
	);

const removeRestrictedCountriesGame = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}remove-restricted-countries-for-game`,
		data
	);

const uploadImageApi = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}upload-sport-icon`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const uploadSportsCountryImageApi = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}upload-location-icon`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const editCasinoGames = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-game`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const editCasinoProvider = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-provider`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const removeGamesFromCategory = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}remove-games-from-category`,
		data
	);

const activateKyc = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/activate`,
		data
	);

const inActiveKyc = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/inactive`,
		data
	);

const updateComment = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/update-comment`,
		data
	);

const reorderBonus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonus/reorder`,
		data
	);

const toggleBonusStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonus/toggle`,
		data
	);

const updateBonusCall = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonus/update`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const createTournament = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/create`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const updateTournament = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/update`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const updateTournamentStatus = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/toggle`,
		data
	);

const createPaymentProvider = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PAYMENT}create`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);
const updateTournamentSettlement = (data) =>
	postRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/settlement`,
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
	editBanner,
	createCasinoCategory,
	createKYCLabels,
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
	addGamesToCategory,
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
	verifyDocument,
	rejectDocumentCall,
	editCasinoCategory,
	updateCategoryReOrder,
	updateReorderGames,
	updateSuperAdminCMS,
	updateEmailTemplate,
	primaryEmailTemplate,
	updateSiteConfiguration,
	uploadLogoRequest,
	updateAppSettingRequest,
	updateLimitsRequest,
	updateSiteDetails,
	addProviderRestrictedCountries,
	addGamesRestrictedCountries,
	removeRestrictedCountriesProvider,
	removeRestrictedCountriesGame,
	uploadImageApi,
	uploadSportsCountryImageApi,
	editCasinoGames,
	createUserTags,
	editCasinoProvider,
	removeGamesFromCategory,
	activateKyc,
	inActiveKyc,
	updateComment,
	updateWageringTemplate,
	reorderBonus,
	toggleBonusStatus,
	updateBonusCall,
	createTournament,
	updateTournament,
	updateTournamentStatus,
	createPaymentProvider,
	updateTournamentSettlement,
};
