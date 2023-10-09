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
};
