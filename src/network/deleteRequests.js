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

const deleteRestrictedItems = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.COUNTRY}restricted-items`,
		data
	);

const deleteBonus = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.BONUS}bonus/delete`,
		data
	);

const deleteUserComment = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.PLAYER}player/comment`,
		data
	);

const deleteCmsRequest = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}${API_NAMESPACE}${MANAGEMENT.CONTENT}page`,
		data
	);

export {
	deleteFromGallery,
	deleteEmailTemplate,
	deleteRestrictedItems,
	deleteBonus,
	deleteUserComment,
	deleteCmsRequest,
};
