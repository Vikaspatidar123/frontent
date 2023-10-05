import axios from 'axios';
import { getAccessToken } from '../network/storageUtils';

// pass new generated access token here
const token = getAccessToken();

// apply base url for axios
const API_URL = import.meta.env.VITE_APP_API_URL;

const axiosApi = axios.create({
	baseURL: `${API_URL}/api`,
});

axiosApi.defaults.headers.common.Authorization = token;

axiosApi.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
);

export async function get(url, config = {}) {
	return axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function post(url, data, config = {}) {
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then((response) => response.data);
}

export async function put(url, data, config = {}) {
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then((response) => response.data);
}

export async function del(url, config = {}) {
	return axiosApi.delete(url, { ...config }).then((response) => response.data);
}
