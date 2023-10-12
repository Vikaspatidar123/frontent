import {
	GET_ADMINS_DATA,
	GET_ADMINS_DATA_SUCCESS,
	GET_ADMINS_DATA_FAIL,
	ADD_SUPER_ADMIN_USER_SUCCESS,
	ADD_SUPER_ADMIN_USER_FAIL,
	ADD_SUPER_ADMIN_USER,
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

export const addSuperAdminUserSuccess = (payload) => ({
	type: ADD_SUPER_ADMIN_USER_SUCCESS,
	payload,
});

export const addSuperAdminUserFail = (payload) => ({
	type: ADD_SUPER_ADMIN_USER_FAIL,
	payload,
});

export const addSuperAdminUserStart = (payload) => ({
	type: ADD_SUPER_ADMIN_USER,
	payload,
});
