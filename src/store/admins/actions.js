import {
	GET_ADMINS_DATA,
	GET_ADMINS_DATA_SUCCESS,
	GET_ADMINS_DATA_FAIL,
} from './actionTypes';

export const getAdminDetailsSuccess = (payload) => ({
	type: GET_ADMINS_DATA_SUCCESS,
	payload,
});

export const getAdminDetailsFail = (payload) => ({
	type: GET_ADMINS_DATA_FAIL,
	payload,
});

export const getAdminDetails = (payload) => ({
	type: GET_ADMINS_DATA,
	payload,
});
