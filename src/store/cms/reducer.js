import {
	GET_ALL_CMS_DATA,
	GET_ALL_CMS_DATA_SUCCESS,
	GET_ALL_CMS_DATA_FAIL,
} from './actionTypes';

const INIT_STATE = {
	cmsDetails: null,
	error: null,
	isLoading: true,
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

		default:
			return { ...state };
	}
};

export default getAllCms;
