import {
	GET_ALL_CMS_DATA,
	GET_ALL_CMS_DATA_SUCCESS,
	GET_ALL_CMS_DATA_FAIL,
} from './actionTypes';

export const getAllCmsDetailsSuccess = (payload) => ({
	type: GET_ALL_CMS_DATA_SUCCESS,
	payload,
});

export const getAllCmsDetailsFail = (payload) => ({
	type: GET_ALL_CMS_DATA_FAIL,
	payload,
});

export const getAllCmsDetails = (payload) => ({
	type: GET_ALL_CMS_DATA,
	payload,
});
