import { safeStringify } from '../utils/helpers';
import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;
const API_NAMESPACE = '/api/v1';

const getCasinoCategoryListing = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/category`, payload);

const getCasinoSubCategoryListing = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/sub-category`,
		payload
	);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/currency?limit=${limit}&pageNo=${pageNo}`
	);

const getLanguages = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/language`, payload);

const getCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/country/list`, payload);

const getAllCasinoProviders = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/provider`, payload);

const getAdminRole = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin/roles`);

const getAdminChildren = ({ superAdminId }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/admin/childs?adminId=${superAdminId}`
	);

const getAllAdmins = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin`, payload);

const getPermissionDetails = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin/details`);

const getPlayers = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/all`, payload);

const getAllCms = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/cms`, payload);

const getAggregators = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/aggregator`, payload);

const getSuperAdminWageringTemplateDetail = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template/details`,
		payload
	);

const getSuperAdminWageringTemplate = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template`, payload);

const getAllCasinoGames = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/games`, payload);

const getAllBonus = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus`, payload);

const getBonusDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/detail`, payload);

const getCurrencies = ({ pageNo, limit }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/currency?pageNo=${pageNo}&limit=${limit}`
	);

const getLanguageManagement = ({ language = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/language/support-keys?language=${language}`
	);

const getBetSettings = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/sports/bet-settings`);

const getTransactionBanking = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin/transactions`, payload);

const getSportsList = (payload) =>
	payload?.isAllListing
		? getRequest(
				`${VITE_APP_API_URL}${API_NAMESPACE}/sports/sport?listing=all`,
				payload
		  )
		: getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/sports/sport`, payload);

const getReviewManagement = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin/review`, payload);

const getCountriesList = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/sports/countries`, payload);

const getSportsTransaction = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sports/transactions`,
		payload
	);

const getTournamentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/sports/tournaments`, payload);

const getCasinoTransactions = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/transactions`,
		payload
	);

const getWithdrawRequests = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/user/all-withdraw-request`,
		payload
	);

const getAllSABanners = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/banner?limit=${limit}&pageNo=${pageNo}`
	);

const getSportsMatches = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/sports/matches`, payload);

const getSportsMarkets = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/sports/markets`, payload);
const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/all-group`);

const getEmailTemplates = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/all`);

const getAdminDetails = (adminId) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/admin/details?adminUserId=${adminId}`
	);

const getDocumentLabelCall = (userId) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/admin/document-label?userId=${userId}`
	);

const getUserDocument = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/document`, payload);

const getUserBonuses = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/user`, payload);

const getSiteConfiguration = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/setting/site-information`,
		data
	);

const getGlobalRegistration = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/setting/global-registration`);

const getloyaltyLevel = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/loyalty-level`);

const getDashboardLiveInfoService = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/report/live-player`);

const getDashboardDemoGraphicService = (data) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/report/demographic`, data);

const getUserDetails = (params) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user`, params);

const getImageGalleryData = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/gallery`);

const getCommentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/comments`, payload);

const getCMSDynamicKeys = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/cms/dynamic-data`);

const getCmsByPageId = ({ cmsPageId }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/cms/details?cmsPageId=${cmsPageId}`
	);

const getDuplicateUsers = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/duplicate`, payload);

const fetchRestrictedCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/country/restricted`, payload);

const fetchUnrestrictedCountries = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/country/unrestricted`,
		payload
	);

const getEmailTypes = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/dynamic-data`);

const getEmailTemplate = (emailTemplateId) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/email?emailTemplateId=${emailTemplateId}`
	);

const getSportsMatchesDetailApi = ({ matchId = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sports/match-markets?matchId=${matchId}`
	);

const getBonusCurrenciesConvertAmount = ({
	currencyFields,
	currencyCode,
	tenantIds,
}) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/convert-amount?currencyFields=${safeStringify(
			currencyFields
		)}&currentCurrencyCode=${currencyCode}&tenantIds=${tenantIds}`
	);
const getSuperAdminAllWageringTemplate = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template/all`);

const getRestrictedItems = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/country/restricted-items`,
		data
	);

const getUnrestrictedItems = (data) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/country/unrestricted-items`,
		data
	);

const getBonus = ({ bonusId, userBonusId }) =>
	getRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/detail?bonusId=${bonusId}&userBonusId=${userBonusId}`
	);

const getSiteDetailApi = () =>
	getRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/admin/site-details`);

export {
	getBonus,
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
	getRestrictedItems,
	getUnrestrictedItems,
	getSiteDetailApi,
	getAdminChildren,
};
