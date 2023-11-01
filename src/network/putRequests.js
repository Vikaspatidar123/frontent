import { putRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const updateSuperAdminUser = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data);

const updateAdmin = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/`, data); // No use

const updateProfile = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/profile`, data);

const updateSiteConfiguration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/site-information`, data, {
		'Content-Type': 'multipart/form-data',
	});

const resetProfilePassword = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/change-password`, data);

const superAdminViewToggleStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const updateStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const updateKYCLabels = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/document-label`, data);

const updateGlobalRegistration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/global-registration`, data);

const updateCurrency = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/currency`, data);

const editCountryDetails = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/country/kyc-method`, data);

const editCasinoCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/category`, data);

const editCasinoProvider = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/provider`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editCasinoSubCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editCasinoGames = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/casino/game`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editBanners = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/banner`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editBetSettings = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/sportsbook/bet-settings`, data);

const updateloyaltyLevel = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/bonus/loyalty-level`, data);

const uploadGallery = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/gallery`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateSAUserStatusCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/status`, data);

const markUserAsInternal = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/internal`, data);

const updateWageringTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/wagering-template`, data);

const updateSuperAdminCMS = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/cms`, data);

const verifyPlayerEmail = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/verify-email`, data);

const updateUserTags = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/tags`, data);

const addDepositToOtherCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/add-balance`, data);

const updateUserInfoCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user`, data);

const resetPasswordEmail = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/reset-password`, data);

const resetUserPassword = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/admin/user/update-password`, data);

export {
	updateSuperAdminUser,
	updateAdmin,
	updateProfile,
	updateSiteConfiguration,
	resetProfilePassword,
	superAdminViewToggleStatus,
	updateStatus,
	updateKYCLabels,
	updateGlobalRegistration,
	updateCurrency,
	editCountryDetails,
	editCasinoCategory,
	editCasinoProvider,
	editCasinoSubCategory,
	editCasinoGames,
	editBanners,
	editBetSettings,
	updateloyaltyLevel,
	uploadGallery,
	updateSAUserStatusCall,
	markUserAsInternal,
	updateWageringTemplate,
	updateSuperAdminCMS,
	verifyPlayerEmail,
	updateUserTags,
	addDepositToOtherCall,
	updateUserInfoCall,
	resetPasswordEmail,
	resetUserPassword,
};
