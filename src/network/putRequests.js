import { putRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;
const API_NAMESPACE = '/api/v1';

const updateSuperAdminUser = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/`, data);

const updateAdmin = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/`, data); // No use

const updateProfile = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/profile`, data);

const updateSiteConfiguration = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/site-information`, data, {
    'Content-Type': 'multipart/form-data',
  });

const resetProfilePassword = ({ data }) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/change-password`, data);

const superAdminViewToggleStatus = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/status`, data);

const updateStatus = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/status`, data);

const updateKYCLabels = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/document-label`, data);

const updateGlobalRegistration = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/global-registration`, data);

const updateCurrency = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/currency`, data);

const editCountryDetails = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/country/kyc-method`, data);

const editCasinoCategory = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/category`, data);

const editCasinoProvider = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/provider`, data, {
    'Content-Type': 'multipart/form-data',
  });

const editCasinoSubCategory = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/sub-category`, data, {
    'Content-Type': 'multipart/form-data',
  });

const editCasinoGames = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/game`, data, {
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

const uploadGallery = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/gallery`, data, {
    'Content-Type': 'multipart/form-data',
  });

const updateSAUserStatusCall = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/status`, data);

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
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/add-balance`, data);

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
    `${VITE_APP_API_URL}${API_NAMESPACE}/country/restricted-items`,
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
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/country/restricted`, data);

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
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/review`, data);

const reorderBonus = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus/order`, data);

const uploadImageApi = (data) =>
  putRequest(
    `${VITE_APP_API_URL}${API_NAMESPACE}/sportsbook/upload-thumbnails`,
    data,
    {
      'Content-Type': 'multipart/form-data',
    }
  );

const primaryEmailTemplate = (data) =>
  putRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email/mark-primary`, data);

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
};
