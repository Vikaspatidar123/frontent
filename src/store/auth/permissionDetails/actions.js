import {
	PERMISSIONS_START,
	PERMISSIONS_ERROR,
	PERMISSIONS_SUCCESS,
	SUPER_ADMIN_START,
	SUPER_ADMIN_SUCCESS,
	SUPER_ADMIN_FAIL,
	RESET_ADMIN_DETAILS,
} from './actionTypes';

export const getPermissionsStart = (loading) => ({
	type: PERMISSIONS_START,
	payload: loading,
});

export const getPermissionsSuccess = (payload) => ({
	type: PERMISSIONS_SUCCESS,
	payload,
});

export const getPermissionsError = (error) => ({
	type: PERMISSIONS_ERROR,
	payload: error,
});

export const resetAdminDetails = (error) => ({
	type: RESET_ADMIN_DETAILS,
	payload: error,
});

export const getSuperAdminStart = (payload) => ({
	type: SUPER_ADMIN_START,
	payload,
});

export const getSuperAdminSuccess = (payload) => ({
	type: SUPER_ADMIN_SUCCESS,
	payload,
});

export const getSuperAdminFail = (payload) => ({
	type: SUPER_ADMIN_FAIL,
	payload,
});
