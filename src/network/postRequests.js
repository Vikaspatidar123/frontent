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

const createReview = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/review`, data);

const createBetSettings = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/bet-settings`, data);

const createSABanners = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/admin/banner`, data);

export {
	superAdminLogin,
	createCurrency,
	addSuperAdminUser,
	createAggregator,
	createCasinoProvider,
	createReview,
	createBetSettings,
	createSABanners,
};
