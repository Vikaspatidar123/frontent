import { putRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const updateSuperAdminUser = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data);

const updateAdmin = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data); // No use

const updateProfile = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/profile`, data);

const updateSiteConfiguration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/site-information`, data);

const resetProfilePassword = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/change-password`, data);

const superAdminViewToggleStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const updateStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const updateKYCLabels = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/document-label`, data);

const updateCurrency = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/currency`, data);

export {
	updateSuperAdminUser,
	updateAdmin,
	updateProfile,
	updateSiteConfiguration,
	resetProfilePassword,
	superAdminViewToggleStatus,
	updateStatus,
	updateKYCLabels,
	updateCurrency,
};
