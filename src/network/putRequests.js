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

const editCasinoProvider = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-provider`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const editCasinoGames = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/games`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editBanners = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/banner`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editBetSettings = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/bet-settings`,
		data
	);

const updateloyaltyLevel = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/loyalty-level`, data);

const markUserAsInternal = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/internal`, data);

const updateWageringTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template`, data);

const cancelDocumentRequest = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/user/cancel-document-request`,
		data
	);

const cancelBonus = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/cancel`, data);

const updateComment = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/comment-status`, data);

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

const reorderBonus = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/order`, data);

const uploadImageApi = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}upload-thumbnails`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

export {
	updateStatus,
	updateGlobalRegistration,
	editCasinoProvider,
	editCasinoGames,
	editBanners,
	editBetSettings,
	updateloyaltyLevel,
	markUserAsInternal,
	updateWageringTemplate,
	cancelDocumentRequest,
	cancelBonus,
	updateComment,
	verifyUserDocument,
	updateOddsVariationApi,
	detachOddsVariationApi,
	updateCompanyOddApi,
	addRestrictedItems,
	updateBonusCall,
	updateReview,
	reorderBonus,
	uploadImageApi,
};
