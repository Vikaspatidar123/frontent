/* eslint-disable import/prefer-default-export */
import { deleteRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const deleteFromGallery = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/admin/gallery`, data);

export { deleteFromGallery };
