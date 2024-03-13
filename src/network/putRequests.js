import { putRequest } from './axios';
import { API_NAMESPACE, MANAGEMENT } from './networkUtils';

const { VITE_APP_API_URL } = import.meta.env;

const updateSuperAdminUser = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}staff`,
		data
	);

const updateAdmin = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/`, data); // No use

const updateSiteConfiguration = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/setting/site-information`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const updateStatus = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.SPORTS}status`,
		data
	);

const updateKYCLabels = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}document-label`,
		data
	);

const updateGlobalRegistration = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/global-registration`, data);

const editCasinoCategory = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-category`,
		data
	);

const editCasinoProvider = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-provider`,
		data,
		{
			'Content-Type': 'multipart/form-data',
		}
	);

const editCasinoSubCategory = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CASINO}edit-sub-category`,
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

const updateSAUserStatusCall = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}status`,
		data
	);

const markUserAsInternal = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/internal`, data);

const updateWageringTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/wagering-template`, data);

const updateSuperAdminCMS = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/cms`, data);

const verifyPlayerEmail = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/verify-email`, data);

const updateUserTags = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/tags`, data);

const addDepositToOtherCall = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.ADMIN}add-balance`,
		data
	);

const updateUserInfoCall = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user`, data);

const resetPasswordEmail = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/reset-password`, data);

const resetUserPassword = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/update-password`, data);

const requestDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/request-document`, data);

const cancelDocumentRequest = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/user/cancel-document-request`,
		data
	);

const updateEmailTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email`, data);

const cancelBonus = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/cancel`, data);

const updateComment = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/comment-status`, data);

const verifyUserDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/user/verify-document`, data);

const addRestrictedCountriesCall = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.COUNTRY}restricted-items`,
		data
	);

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

const updateCategoryReOrder = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/order-category`, data);

const updateBonusCall = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateSubCategoryReOrder = (data) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/order-sub-category`,
		data
	);

const updateReorderGames = ({ data }) =>
	putRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/order-casino-games`,
		data
	);

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

const primaryEmailTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/mark-primary`, data);

const updateSiteDetails = (data) =>
	putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/setting/site-layout`, data);

export {
	updateSuperAdminUser,
	updateAdmin,
	updateSiteConfiguration,
	updateStatus,
	updateKYCLabels,
	updateGlobalRegistration,
	editCasinoCategory,
	editCasinoProvider,
	editCasinoSubCategory,
	editCasinoGames,
	editBanners,
	editBetSettings,
	updateloyaltyLevel,
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
	requestDocument,
	cancelDocumentRequest,
	updateEmailTemplate,
	cancelBonus,
	updateComment,
	verifyUserDocument,
	addRestrictedCountriesCall,
	updateOddsVariationApi,
	detachOddsVariationApi,
	updateCompanyOddApi,
	addRestrictedItems,
	updateCategoryReOrder,
	updateBonusCall,
	updateSubCategoryReOrder,
	updateReorderGames,
	updateReview,
	reorderBonus,
	uploadImageApi,
	primaryEmailTemplate,
	updateSiteDetails,
};
