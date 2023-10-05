import {
	PERMISSIONS_START,
	PERMISSIONS_ERROR,
	PERMISSIONS_SUCCESS,
	SAVE_PERMISSIONS,
} from './actionTypes';

export const getPermissionsStart = (loading) => ({
	type: PERMISSIONS_START,
	payload: loading,
});

export const getPermissionsSuccess = (payload) => ({
	type: PERMISSIONS_SUCCESS,
	payload,
});

export const savePermissions = (payload) => ({
	type: SAVE_PERMISSIONS,
	payload,
});

export const getPermissionsError = (error) => ({
	type: PERMISSIONS_ERROR,
	payload: error,
});
