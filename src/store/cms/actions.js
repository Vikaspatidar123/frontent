import {
	GET_ALL_CMS_DATA,
	GET_ALL_CMS_DATA_SUCCESS,
	GET_ALL_CMS_DATA_FAIL,
	UPDATE_SA_CMS_STATUS,
	UPDATE_SA_CMS_STATUS_SUCCESS,
	UPDATE_SA_CMS_STATUS_FAIL,
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

export const updateSaCmsStatusSuccess = (payload) => ({
	type: UPDATE_SA_CMS_STATUS_SUCCESS,
	payload,
});

export const updateSaCmsStatusFail = (payload) => ({
	type: UPDATE_SA_CMS_STATUS_FAIL,
	payload,
});

export const updateSaCmsStatus = (payload) => ({
	type: UPDATE_SA_CMS_STATUS,
	payload,
});
