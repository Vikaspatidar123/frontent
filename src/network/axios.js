import axios from 'axios';
import { redirect } from 'react-router-dom';
import { getAccessToken, removeLoginToken } from './storageUtils';

const axiosInstance = axios.create();

export const setupInterceptors = () => {
	// const role = getItem('role')

	axiosInstance.interceptors.response.use(
		(res) => res,
		(error) => {
			const { status } = error.response;
			if (status === 401 || status === 403) {
				removeLoginToken();
				redirect('/login');
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

const filterEmptyPayload = (payload) => {
	const updatedPayload = {};
	Object.keys(payload || {}).forEach((key) => {
		if (
			!(
				payload[key] === null ||
				payload[key] === undefined ||
				payload[key] === ''
			)
		) {
			updatedPayload[key] = payload[key];
		}
	});
	return updatedPayload;
};

const makeRequest = async (
	url,
	method,
	data = {},
	config = {},
	params = {}
) => {
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
		data: filterEmptyPayload(data),
		headers,
		params: filterEmptyPayload(params),
	});
};

const getRequest = (url, params) =>
	makeRequest(url, METHODS.get, {}, {}, params);

const postRequest = (url, data, config) =>
	makeRequest(url, METHODS.post, data, config);

const putRequest = (url, data, config) =>
	makeRequest(url, METHODS.put, data, config);

const deleteRequest = (url, data) => makeRequest(url, METHODS.delete, data);

export { getRequest, postRequest, putRequest, deleteRequest };
