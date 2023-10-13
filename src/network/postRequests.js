import { postRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const superAdminLogin = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/login`, data);

const createCurrency = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/currency`, data);

const addSuperAdminUser = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/`, data);

const createAggregator = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/aggregator`, data);

const createCasinoProvider = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/casino/provider`, data, {
		'Content-Type': 'multipart/form-data',
	});

export {
	superAdminLogin,
	createCurrency,
	addSuperAdminUser,
	createAggregator,
	createCasinoProvider,
};
