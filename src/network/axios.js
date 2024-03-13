import axios from 'axios';
import { redirect } from 'react-router-dom';
import { getAccessToken, removeLoginToken } from './storageUtils';
import { METHODS, filterEmptyPayload } from './networkUtils';

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
			// return Promise.reject(error);
			return error;
		}
	);
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
