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

export { getAllAdmins, getAllCurrencies };
