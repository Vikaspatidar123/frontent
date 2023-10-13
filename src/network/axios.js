import axios from 'axios';
import { getAccessToken, removeLoginToken } from './storageUtils';

const axiosInstance = axios.create();

export const setupInterceptors = () => {
	// const role = getItem('role')

	axiosInstance.interceptors.response.use(
		(res) => res,
		(error) => {
			if (error.response.status === 403) {
				removeLoginToken();
				// window.location.href = AdminsRoutes.SuperAdminSignin;
			}

			return Promise.reject(error);
		}
	);
};

const METHODS = {
	get: 'GET',
	post: 'POST',
	put: 'PUT',
	delete: 'DELETE',
};

const makeRequest = async (url, method, data = {}, config = {}) => {
	const headers = {
		'Content-Type': 'application/json',
		...config,
	};

	if (getAccessToken()) {
		headers.Authorization = `Bearer ${getAccessToken()}`;
	}

	return axiosInstance({
		url,
		method,
		data,
		headers,
	});
};

const getRequest = (url) => makeRequest(url, METHODS.get);

const postRequest = (url, data, config) =>
	makeRequest(url, METHODS.post, data, config);

const putRequest = (url, data) => makeRequest(url, METHODS.put, data);

const deleteRequest = (url, data) => makeRequest(url, METHODS.delete, data);

export { getRequest, postRequest, putRequest, deleteRequest };
