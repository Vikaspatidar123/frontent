import { deleteRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const deleteFromGallery = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/gallery`, data);

const deleteEmailTemplate = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/email `, data);

const removeRestrictedCountriesCall = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/country/restricted`, data);

const deleteSubCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/casino/sub-category`, data);

const deleteCasinoGames = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/casino/games`, data);

const deleteSABanners = ({ bannerType }) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/banner?bannerKey=${bannerType}`);

const deleteRestrictedItems = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/country/restricted-items`, data);

const deleteBonus = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/bonus`, data);

export {
	deleteFromGallery,
	removeRestrictedCountriesCall,
	deleteEmailTemplate,
	deleteSubCategory,
	deleteCasinoGames,
	deleteSABanners,
	deleteRestrictedItems,
	deleteBonus,
};
