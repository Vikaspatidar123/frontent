import { deleteRequest } from './axios';
import { MANAGEMENT } from './networkUtils';

const { VITE_APP_API_URL } = import.meta.env;
const API_NAMESPACE = '/api/v2';

const deleteFromGallery = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}gallery`,
		data
	);

const deleteEmailTemplate = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}email `,
		data
	);

const deleteSubCategory = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}/casino/sub-category`,
		data
	);

const deleteCasinoGames = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/games`, data);

const deleteRestrictedItems = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.COUNTRY}restricted-items`,
		data
	);

const deleteBonus = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/bonus`, data);

const removeGamesFromSubCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}${API_NAMESPACE}/casino/games`, data);

export {
	deleteFromGallery,
	deleteEmailTemplate,
	deleteSubCategory,
	deleteCasinoGames,
	deleteRestrictedItems,
	deleteBonus,
	removeGamesFromSubCategory,
};
