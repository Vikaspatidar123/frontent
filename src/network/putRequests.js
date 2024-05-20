import { putRequest } from './axios';
import { API_NAMESPACE, MANAGEMENT } from './networkUtils';

const { VITE_APP_API_URL } = import.meta.env;

const updateStatus = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}status`,
		data
	);

const updateGlobalRegistration = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/global-registration`, data);

const editBetSettings = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/bet-settings`,
		data
	);

const updateloyaltyLevel = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/loyalty-level`, data);

const markUserAsInternal = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/internal`, data);

const cancelDocumentRequest = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/user/cancel-document-request`,
		data
	);

const cancelBonus = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/cancel`, data);

const verifyUserDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/verify-document`, data);

const updateOddsVariationApi = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/odd-settings`,
		data
	);

const detachOddsVariationApi = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/detach-market`,
		data
	);

const updateCompanyOddApi = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/custom-odds`,
		data
	);

const addRestrictedItems = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.COUNTRY}restricted`,
		data
	);

const updateBonusCall = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateReview = ({ data }) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}review`,
		data
	);

export {
	updateStatus,
	updateGlobalRegistration,
	editBetSettings,
	updateloyaltyLevel,
	markUserAsInternal,
	cancelDocumentRequest,
	cancelBonus,
	verifyUserDocument,
	updateOddsVariationApi,
	detachOddsVariationApi,
	updateCompanyOddApi,
	addRestrictedItems,
	updateBonusCall,
	updateReview,
};
