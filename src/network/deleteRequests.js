import { deleteRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const deleteFromGallery = (data) =>
  deleteRequest(`${VITE_APP_API_URL}/api/admin/gallery`, data);

const deleteEmailTemplate = (data) =>
  deleteRequest(`${VITE_APP_API_URL}/api/admin/email `, data);

const removeRestrictedCountriesCall = (data) =>
  deleteRequest(`${VITE_APP_API_URL}/api/admin/country/restricted`, data);

export { deleteFromGallery, removeRestrictedCountriesCall, deleteEmailTemplate };
