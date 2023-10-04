import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const getCasinoCategoryListing = ({
	limit = 15,
	pageNo = 1,
	search = '',
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/casino/categories?&pageNo=${pageNo}&limit=${limit}&search=${search}`
	);

const getAllCurrencies = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin/currency?limit=${limit}&pageNo=${pageNo}`
	);

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
};
