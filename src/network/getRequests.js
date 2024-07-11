import { getRequest } from './axios';
import { API_NAMESPACE, MANAGEMENT } from './networkUtils';

const { VITE_APP_API_URL } = import.meta.env;

const getCasinoCategoryListing = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}categories`,
		payload
	);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/currency?limit=${limit}&pageNo=${pageNo}`
	);

const getLanguages = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}languages`,
		payload
	);

const getCountries = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}countries`,
		payload
	);

const getAllCasinoProviders = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}providers`,
		payload
	);

const getAdminRole = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}roles`);

const getAdminChildren = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}children`);

const getAllAdminsList = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}staff`,
		payload
	);

const getPermissionDetails = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin`);

const getPlayers = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}players`,
		payload
	);

const getAllCms = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}pages`,
		payload
	);

const getAggregators = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}aggregators`,
		payload
	);

const getSuperAdminWageringTemplateDetail = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}wagering-template`,
		payload
	);

const getSuperAdminWageringTemplate = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}wagering-templates`,
		payload
	);

const getAllCasinoGames = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}games`,
		payload
	);

const getAllBonus = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonuses`,
		payload
	);

const getBonusDetail = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonus`,
		payload
	);

const getCurrencies = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}currencies`,
		payload
	);

const getLanguageManagement = ({ language = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.LANGUAGE}support-keys?language=${language}`
	);

const getBetSettings = () =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}bet-settings`
	);

const getTransactionBanking = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TRANSACTION}banking-transactions`,
		payload
	);

const getLedgerDetails = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TRANSACTION}get-ledgers`,
		payload
	);

const getSportsList = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}sports`,
		payload
	);

const getReviewManagement = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}review`,
		payload
	);

const getCountriesList = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}locations`,
		payload
	);

const getSportsBet = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TRANSACTION}betslip-report`,
		payload
	);

const getTournamentsList = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}leagues`,
		payload
	);

const getCasinoTransactions = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TRANSACTION}casino-transactions`,
		payload
	);

const getSportsTransactions = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TRANSACTION}sportsbook-transactions`,
		payload
	);

const getWithdrawRequests = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/user/all-withdraw-request`,
		payload
	);

const getAllSABanners = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}banner`,
		payload
	);

const getSportsMatches = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}events`,
		payload
	);

const getSportsMarkets = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}markets`,
		payload
	);
const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/all-group`);

const getEmailTemplates = () =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}/email-templates`
	);

const getAdminDetails = (adminId) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}?adminUserId=${adminId}`
	);

const getDocumentLabelCall = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}kyc/document-labels`,
		payload
	);

const getUserDocument = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/document`, payload);

const getUserBonuses = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/user`, payload);

const getSiteConfiguration = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}application`,
		data
	);

const getGlobalRegistration = () =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SETTINGS}global-registration`
	);

const getloyaltyLevel = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/loyalty-level`);

const getDashboardLiveInfoService = () =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.DASHBOARD}get-live-player-details`
	);

const getDashboardDemoGraphicService = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.DASHBOARD}get-demograph`,
		data
	);

const getUserDetails = (params) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player`,
		params
	);

const getImageGalleryData = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}gallery`);

const getCommentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/comments`, payload);

const getCMSDynamicKeys = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/cms/dynamic-data`);

const getCmsByPageId = ({ cmsPageId }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}page?pageId=${cmsPageId}`
	);

const getDuplicateUsers = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}duplicate-players`,
		payload
	);

const getEmailTypes = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/dynamic-data`);

const getEmailTemplate = (emailTemplateId) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}/email-template?emailTemplateId=${emailTemplateId}`
	);

const getSportsMatchesDetailApi = ({ matchId = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}match-markets?matchId=${matchId}`
	);

const getRestrictedItems = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.COUNTRY}restricted-items`,
		data
	);

const getUnrestrictedItems = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.COUNTRY}unrestricted-items`,
		data
	);

const getGameReports = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.DASHBOARD}get-game-report`,
		payload
	);

const getKpiSummary = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.DASHBOARD}get-kpi-summary`,
		payload
	);

const getKpiReport = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.DASHBOARD}get-kpi-report`,
		payload
	);

const getAllUserTags = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}tags`,
		payload
	);

const getTopPlayersRequest = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.DASHBOARD}player-performance-sapshot`,
		payload
	);

const getTournamentsDetails = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}`,
		payload
	);

const getTournamentDetailById = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/details`,
		payload
	);

const getTournamentLeaderBoard = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/tournament-leaderBoard`,
		payload
	);

const getTournamentTransactions = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.TOURNAMENT}/tournament-transactions`,
		payload
	);

const getPaymentList = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PAYMENT}`,
		payload
	);

const getPaymentDetails = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PAYMENT}details`,
		payload
	);

const getUserReferrals = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}referral/users`,
		payload
	);

const getNotifications = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}notification`,
		payload
	);

const getAllReferrals = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}referral/transactions`,
		payload
	);

const getDisputes = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/crm${MANAGEMENT.DISPUTE}get-ticket`,
		payload
	);

const getDisputeDetails = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/crm${MANAGEMENT.DISPUTE}get-ticket-details`,
		payload
	);
const getAllChannels = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CHAT}get-group`,
		payload
	);

const getChannelMessages = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CHAT}messages/messages-group`,
		payload
	);
const getChatrain = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v2/live-chat/get-chat-rain`, payload);

export {
	getBonusDetail,
	getAllCurrencies,
	getAdminRole,
	getCountries,
	getPermissionDetails,
	getPlayers,
	getAllCms,
	getAggregators,
	getCasinoCategoryListing,
	getLanguages,
	getAllAdminsList,
	getAllBonus,
	getCurrencies,
	getLanguageManagement,
	getBetSettings,
	getTransactionBanking,
	getSportsList,
	getReviewManagement,
	getCountriesList,
	getTournamentsList,
	getSportsBet,
	getCasinoTransactions,
	getWithdrawRequests,
	getAllCasinoProviders,
	getAllCasinoGames,
	getAllSABanners,
	getSportsMatches,
	getAllGroups,
	getSportsMarkets,
	getEmailTemplates,
	getAdminDetails,
	getDocumentLabelCall,
	getSuperAdminWageringTemplateDetail,
	getSuperAdminWageringTemplate,
	getSiteConfiguration,
	getGlobalRegistration,
	getloyaltyLevel,
	getDashboardLiveInfoService,
	getUserDetails,
	getUserDocument,
	getImageGalleryData,
	getUserBonuses,
	getCommentsList,
	getDashboardDemoGraphicService,
	getCMSDynamicKeys,
	getCmsByPageId,
	getDuplicateUsers,
	getEmailTypes,
	getEmailTemplate,
	getSportsMatchesDetailApi,
	getRestrictedItems,
	getUnrestrictedItems,
	getAdminChildren,
	getGameReports,
	getKpiSummary,
	getKpiReport,
	getAllUserTags,
	getLedgerDetails,
	getSportsTransactions,
	getTopPlayersRequest,
	getTournamentsDetails,
	getTournamentDetailById,
	getTournamentLeaderBoard,
	getTournamentTransactions,
	getPaymentList,
	getPaymentDetails,
	getUserReferrals,
	getNotifications,
	getAllReferrals,
	getDisputes,
	getDisputeDetails,
	getAllChannels,
	getChannelMessages,
	getChatrain
};
