import {
	UPDATE_PROFILE_START,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_SITE_CONFIGURATION_START,
	UPDATE_SITE_CONFIGURATION_FAIL,
	UPDATE_SITE_CONFIGURATION_SUCCESS,
	RESET_PROFILE_PASSWORD_START,
	RESET_PROFILE_PASSWORD_SUCCESS,
	RESET_PROFILE_PASSWORD_FAIL,
} from './actionTypes';

export const updateProfileStart = (payload) => ({
	type: UPDATE_PROFILE_START,
	payload,
});

export const updateProfileSuccess = (payload) => ({
	type: UPDATE_PROFILE_SUCCESS,
	payload,
});

export const updateProfileFail = (payload) => ({
	type: UPDATE_PROFILE_FAIL,
	payload,
});

export const updateSiteConfigurationStart = (payload) => ({
	type: UPDATE_SITE_CONFIGURATION_START,
	payload,
});

export const updateSiteConfigurationSuccess = (payload) => ({
	type: UPDATE_SITE_CONFIGURATION_SUCCESS,
	payload,
});

export const updateSiteConfigurationFail = (payload) => ({
	type: UPDATE_SITE_CONFIGURATION_FAIL,
	payload,
});

export const resetProfilePasswordStart = (payload) => ({
	type: RESET_PROFILE_PASSWORD_START,
	payload,
});

export const resetProfilePasswordSuccess = (payload) => ({
	type: RESET_PROFILE_PASSWORD_SUCCESS,
	payload,
});

export const resetProfilePasswordFail = (payload) => ({
	type: RESET_PROFILE_PASSWORD_FAIL,
	payload,
});
