import { postRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const superAdminLogin = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/login`, data);

const createCurrency = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/currency`, data);

const addSuperAdminUser = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/`, data);

export { superAdminLogin, createCurrency, addSuperAdminUser };
