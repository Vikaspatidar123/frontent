import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const getCasinoCategoryListing = ({ limit = 15, pageNo = 1, search = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/categories?&pageNo=${pageNo}&limit=${limit}&search=${search}`
	);

const getCasinoSubCategoryListing = ({
	limit = 15,
	pageNo = 1,
	search = '',
	gameCategoryId = '',
	isActive = '',
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/sub-category?pageNo=${pageNo}&gameCategoryId=${gameCategoryId}&search=${search}&limit=${limit}&isActive=${isActive}`
	);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/currency?limit=${limit}&pageNo=${pageNo}`
	);

const getLanguages = ({ limit = '', pageNo = '', name = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/language?limit=${limit}&pageNo=${pageNo}&name=${name}`
	);

const getCountries = ({ limit, pageNo, name }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/list?limit=${limit}&pageNo=${pageNo}&name=${name}`
	);

const getAllCasinoProviders = ({ limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/providers?limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

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

const getPlayers = ({ limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/all?limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const getAllCms = ({ pageNo, limit, search, isActive }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/cms?pageNo=${pageNo}&limit=${limit}&search=${search}&isActive=${isActive}`
	);

const getAggregators = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/aggregators?limit=${limit}&pageNo=${pageNo}`
	);

const getAllCasinoGames = ({
	bonusId,
	limit,
	pageNo,
	casinoCategoryId,
	search,
	isActive,
	selectedProvider,
	freespins,
	addGame,
	gameSubCategoryId,
	reorder,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/games?limit=${limit}&pageNo=${pageNo}&casinoCategoryId=${casinoCategoryId}&search=${search}&isActive=${isActive}&providerId=${selectedProvider}&freespins=${freespins}&bonusId=${bonusId}&addGames=${addGame}&gameSubCategoryId=${gameSubCategoryId}&reorder=${reorder}`
	);

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

const getTransactionBanking = ({ limit, pageNo, paymentProvider }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/transactions?limit=${limit}&pageNo=${pageNo}&paymentProvider=${paymentProvider}`
	);

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

const getReviewManagement = ({ limit, pageNo, search, status = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/review?limit=${limit}&pageNo=${pageNo}&search=${search}&status=${status}`
	);

const getCountriesList = ({ limit, pageNo, search = '', isActive = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/countries?search=${search}&limit=${limit}&pageNo=${pageNo}&isActive=${isActive}`
	);

const getSportsTransaction = ({ limit, pageNo, email }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/transactions?limit=${limit}&pageNo=${pageNo}&email=${email}`
	);

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

const getCasinoTransactions = ({ limit, pageNo, email }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/transactions?limit=${limit}&pageNo=${pageNo}&email=${email}`
	);

const getWithdrawRequests = ({ limit, pageNo, search }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/user/all-withdraw-request?limit=${limit}&pageNo=${pageNo}&search=${search}`
	);

const getSportsMatches = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/sportsbook/matches?limit=${limit}&pageNo=${pageNo}`
	);
const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}/api/admin/all-group`);

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
	getSportsMatches,
	getAllGroups,
};
