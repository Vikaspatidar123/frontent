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

const getAllAdmins = ({
	limit,
	pageNo,
	orderBy,
	sort,
	search,
	adminRoleId,
	status,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin?orderBy=${orderBy}&pageNo=${pageNo}&limit=${limit}&sort=${sort}&search=${search}&status=${status}&adminRoleId=${adminRoleId}`
	);

const getPermissionDetails = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/details`);

const getPlayers = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user/all`, payload);

const getAllCms = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/cms`, payload);

const getAggregators = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/aggregators?limit=${limit}&pageNo=${pageNo}`
	);

const getSuperAdminWageringTemplateDetail = ({
	wageringTemplateId,
	limit,
	pageNo,
	providerId,
	search,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/wagering-template/details?wageringTemplateId=${wageringTemplateId}&pageNo=${pageNo}&limit=${limit}&providerId=${providerId}&search=${search}`
	);

const getSuperAdminWageringTemplate = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/wagering-template`, payload);
const getAllCasinoGames = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/games`, payload);

const getAllBonus = ({
	adminId,
	tenantId,
	limit,
	pageNo,
	bonusType,
	isActive,
	search,
	userId,
	reorder,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/bonus?adminId=${adminId}&tenantId=${tenantId}&limit=${limit}&pageNo=${pageNo}&search=${search}&isActive=${isActive}&bonusType=${bonusType}&userId=${userId}&reorder=${reorder}`
	);

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

const getSportsList = ({
	search = '',
	limit,
	pageNo,
	isAllListing = false,
	isActive = '',
}) =>
	isAllListing
		? getRequest(
				`${VITE_APP_API_URL}/api/admin/sportsbook/sport?limit=${limit}&pageNo=${pageNo}&search=${search}&isActive=${isActive}&listing=all`
		  )
		: getRequest(
				`${VITE_APP_API_URL}/api/admin/sportsbook/sport?limit=${limit}&pageNo=${pageNo}&search=${search}&isActive=${isActive}`
		  );

const getReviewManagement = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/review`, payload);

const getCountriesList = ({ limit, pageNo, search = '', isActive = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/countries?search=${search}&limit=${limit}&pageNo=${pageNo}&isActive=${isActive}`
	);

const getSportsTransaction = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/transactions`, payload);

const getTournamentsList = ({
	limit,
	pageNo,
	providerCountryId,
	providerSportId,
	search,
	isActive,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/tournaments?limit=${limit}&pageNo=${pageNo}&providerCountryId=${providerCountryId}&providerSportId=${providerSportId}&search=${search}&isActive=${isActive}`
	);

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

const getSportsMatches = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/matches?limit=${limit}&pageNo=${pageNo}`
	);

const getSportsMarkets = ({
	limit,
	pageNo,
	isLive = true,
	providerSportId = '1',
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/markets?limit=${limit}&pageNo=${pageNo}&isLive=${isLive}&providerSportId=${providerSportId}`
	);
const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/all-group`);

const getEmailTemplates = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/email/all`);

const getAdminDetails = (adminId) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/details?adminUserId=${adminId}`);

const getDocumentLabel = (userId) =>
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

const getUserDetails = (params) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/user`, params);

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
	getDocumentLabel,
	getSuperAdminWageringTemplateDetail,
	getSuperAdminWageringTemplate,
	getSiteConfiguration,
	getGlobalRegistration,
	getloyaltyLevel,
	getDashboardLiveInfoService,
	getUserDetails,
	getUserDocument,
	getUserBonuses,
};
