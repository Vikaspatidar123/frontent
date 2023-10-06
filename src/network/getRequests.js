import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const getAllAdmins = ({
	limit,
	pageNo,
	orderBy,
	sort,
	search,
	// superAdminId,
	adminRoleId,
	status,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/admin?orderBy=${orderBy}&pageNo=${pageNo}&limit=${limit}&sort=${sort}&search=${search}&status=${status}&adminRoleId=${adminRoleId}`
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
	getAllAdmins,
	getAllCurrencies,
	getAdminRole,
	getCountries,
	getPermissionDetails,
	getPlayers,
	getAllCms,
};
