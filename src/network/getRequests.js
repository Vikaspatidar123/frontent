import { safeStringify } from '../utils/helpers';
import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const getCasinoCategoryListing = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/categories`, payload);

const getCasinoSubCategoryListing = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category`, payload);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/currency?limit=${limit}&pageNo=${pageNo}`
	);

const getLanguages = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/language`, payload);

const getCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/country/list`, payload);

const getAllCasinoProviders = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/providers`, payload);

const getAdminRole = () => getRequest(`${VITE_APP_API_URL}/api/admin/roles`);

const getAllAdmins = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin`, payload);

const getPermissionDetails = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/details`);

const getPlayers = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user/all`, payload);

const getAllCms = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/cms`, payload);

const getAggregators = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/aggregators`, payload);

const getSuperAdminWageringTemplateDetail = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/wagering-template/details`,
		payload
	);

const getSuperAdminWageringTemplate = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/wagering-template`, payload);
const getAllCasinoGames = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/games`, payload);

const getAllBonus = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus`, payload);

const getBonusDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/detail`, payload);

const getCurrencies = ({ pageNo, limit }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/currency?pageNo=${pageNo}&limit=${limit}`
	);

const getLanguageManagement = ({ language = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/language/support-keys?language=${language}`
	);

const getBetSettings = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/bet-settings`);

const getTransactionBanking = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/transactions`, payload);

const getSportsList = (payload) =>
	payload?.isAllListing
		? getRequest(
				`${VITE_APP_API_URL}/api/admin/sportsbook/sport?listing=all`,
				payload
		  )
		: getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/sport`, payload);

const getReviewManagement = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/review`, payload);

const getCountriesList = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/countries`, payload);

const getSportsTransaction = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/transactions`, payload);

const getTournamentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/tournaments`, payload);

const getCasinoTransactions = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/transactions`, payload);

const getWithdrawRequests = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/all-withdraw-request`,
		payload
	);

const getAllSABanners = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/banner?limit=${limit}&pageNo=${pageNo}`
	);

const getSportsMatches = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/matches`, payload);

const getSportsMarkets = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/markets`, payload);
const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/all-group`);

const getEmailTemplates = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/email/all`);

const getAdminDetails = (adminId) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/details?adminUserId=${adminId}`);

const getDocumentLabelCall = (userId) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/document-label?userId=${userId}`);

const getUserDocument = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user/document`, payload);

const getUserBonuses = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/user`, payload);

const getSiteConfiguration = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/site-information`, data);

const getGlobalRegistration = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/global-registration`);

const getloyaltyLevel = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/bonus/loyalty-level`);

const getDashboardLiveInfoService = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/report/live-player`);
const getDashboardDemoGraphicService = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/report/demographic`, data);

const getUserDetails = (params) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user`, params);

const getImageGalleryData = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/gallery`);

const getCommentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user/comments`, payload);

const getCMSDynamicKeys = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/cms/dynamic-data`);

const getCmsByPageId = ({ cmsPageId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/cms/details?cmsPageId=${cmsPageId}`
	);

const getDuplicateUsers = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user/duplicate`, payload);

const fetchRestrictedCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/country/restricted`, payload);

const fetchUnrestrictedCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/country/unrestricted`, payload);

const getEmailTypes = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/email/dynamic-data`);

const getEmailTemplate = (emailTemplateId) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/email?emailTemplateId=${emailTemplateId}`
	);

const getSportsMatchesDetailApi = ({ matchId = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/match-markets?matchId=${matchId}`
	);

const getBonusCurrenciesConvertAmount = ({
	currencyFields,
	currencyCode,
	tenantIds,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/bonus/convert-amount?currencyFields=${safeStringify(
			currencyFields
		)}&currentCurrencyCode=${currencyCode}&tenantIds=${tenantIds}`
	);
const getSuperAdminAllWageringTemplate = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/wagering-template/all`);

export {
	getAllCurrencies,
	getAdminRole,
	getCountries,
	getPermissionDetails,
	getPlayers,
	getAllCms,
	getAggregators,
	getCasinoCategoryListing,
	getCasinoSubCategoryListing,
	getLanguages,
	getAllAdmins,
	getAllBonus,
	getCurrencies,
	getLanguageManagement,
	getBetSettings,
	getTransactionBanking,
	getSportsList,
	getReviewManagement,
	getCountriesList,
	getTournamentsList,
	getSportsTransaction,
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
	getBonusDetails,
	fetchRestrictedCountries,
	fetchUnrestrictedCountries,
	getEmailTypes,
	getEmailTemplate,
	getSportsMatchesDetailApi,
	getBonusCurrenciesConvertAmount,
	getSuperAdminAllWageringTemplate,
};
