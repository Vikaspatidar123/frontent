import {
	GET_ALL_CMS_DATA,
	GET_ALL_CMS_DATA_SUCCESS,
	GET_ALL_CMS_DATA_FAIL,
	UPDATE_SA_CMS_STATUS,
	UPDATE_SA_CMS_STATUS_SUCCESS,
	UPDATE_SA_CMS_STATUS_FAIL,
} from './actionTypes';

const INIT_STATE = {
	cmsDetails: null,
	error: null,
	isLoading: true,
	updateSACmsStatus: false,
	updateSACmsStatusError: null,
	updateSACmsStatusLoading: false,
};

const getAllCms = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ALL_CMS_DATA:
			return {
				...state,
				isLoading: false,
			};

		case GET_ALL_CMS_DATA_SUCCESS:
			return {
				...state,
				isLoading: true,
				cmsDetails: payload,
				error: null,
			};

		case GET_ALL_CMS_DATA_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		case UPDATE_SA_CMS_STATUS:
			return {
				...state,
				updateSACmsStatusLoading: true,
			};

		case UPDATE_SA_CMS_STATUS_FAIL:
			return {
				...state,
				updateSACmsStatusLoading: false,
				updateSACmsStatusError: payload,
				updateSACmsStatus: false,
			};

		case UPDATE_SA_CMS_STATUS_SUCCESS:
			return {
				...state,
				updateSACmsStatusLoading: false,
				updateSACmsStatus: true,
				updateSACmsStatusError: false,
			};

		default:
			return { ...state };
	}
};

export default getAllCms;
