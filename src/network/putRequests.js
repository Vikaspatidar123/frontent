import { putRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const updateSuperAdminUser = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data);

const updateAdmin = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data); // No use

export { updateSuperAdminUser, updateAdmin };
