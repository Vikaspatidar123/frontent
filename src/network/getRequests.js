import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const getCasinoCategoryListing = ({
	limit = 15,
	pageNo = 1,
	search = '',
}) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/categories?&pageNo=${pageNo}&limit=${limit}&search=${search}`);

const getCasinoSubCategoryListing = ({
	limit = 15,
	pageNo = 1,
	search = '',
	gameCategoryId = '',
	isActive = ''
}) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category?pageNo=${pageNo}&gameCategoryId=${gameCategoryId}&search=${search}&limit=${limit}&isActive=${isActive}`);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/currency?limit=${limit}&pageNo=${pageNo}`);

const getLanguages = ({ limit = '', pageNo = '', name = '' }) =>
	getRequest(`${VITE_APP_API_URL}/api/admin/language?limit=${limit}&pageNo=${pageNo}&name=${name}`)

const getCountries = ({ limit, pageNo, name }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/country/list?limit=${limit}&pageNo=${pageNo}&name=${name}`
	);

const getAdminRole = () => getRequest(`${VITE_APP_API_URL}/api/admin/roles`);

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

export {
	getAllCurrencies,
	getAdminRole,
	getCountries,
	getPermissionDetails,
	getPlayers,
	getAllCms,
	getCasinoCategoryListing, 
	getCasinoSubCategoryListing,
	getLanguages
};
