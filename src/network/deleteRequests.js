import { deleteRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;
const API_NAMESPACE = '/api/v1';

const deleteFromGallery = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/gallery`, data);

const deleteEmailTemplate = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/email `, data);

const removeRestrictedCountriesCall = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/country/restricted`, data);

const deleteSubCategory = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/sub-category`,
		data
	);

const deleteCasinoGames = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/games`, data);

const deleteSABanners = ({ bannerType }) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/banner?bannerKey=${bannerType}`
	);

const deleteRestrictedItems = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/country/restricted-items`,
		data
	);

const deleteBonus = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus`, data);

const removeGamesFromSubCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/games`, data);

export {
	deleteFromGallery,
	removeRestrictedCountriesCall,
	deleteEmailTemplate,
	deleteSubCategory,
	deleteCasinoGames,
	deleteSABanners,
	deleteRestrictedItems,
	deleteBonus,
	removeGamesFromSubCategory,
};
