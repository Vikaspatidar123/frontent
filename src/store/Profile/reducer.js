import {
	UPDATE_PROFILE_START,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_SITE_CONFIGURATION_START,
	UPDATE_SITE_CONFIGURATION_SUCCESS,
	UPDATE_SITE_CONFIGURATION_FAIL,
	RESET_PROFILE_PASSWORD_START,
	RESET_PROFILE_PASSWORD_SUCCESS,
	RESET_PROFILE_PASSWORD_FAIL,
} from './actionTypes';

const initialState = {
	updateProfileSuccess: false,
	updateProfileError: null,
	updateProfileLoading: false,
	updateSiteConfigurationSuccess: false,
	updateSiteConfigurationError: null,
	updateSiteConfigurationLoading: false,
	resetProfilePasswordLoading: false,
	resetProfilePasswordSuccess: false,
	resetProfilePasswordError: null,
};

const ProfileData = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case UPDATE_PROFILE_START:
			return {
				...state,
				updateProfileLoading: true,
			};
		case UPDATE_PROFILE_FAIL:
			return {
				...state,
				updateProfileLoading: false,
				updateProfileSuccess: false,
				updateProfileError: payload,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				updateProfileLoading: false,
				updateProfileSuccess: true,
				updateProfileError: null,
			};
		case UPDATE_SITE_CONFIGURATION_START:
			return {
				...state,
				updateSiteConfigurationLoading: true,
			};
		case UPDATE_SITE_CONFIGURATION_SUCCESS:
			return {
				...state,
				updateSiteConfigurationLoading: false,
				updateSiteConfigurationSuccess: true,
				updateSiteConfigurationError: null,
			};
		case UPDATE_SITE_CONFIGURATION_FAIL:
			return {
				...state,
				updateSiteConfigurationLoading: false,
				updateSiteConfigurationError: payload,
				updateSiteConfigurationSuccess: false,
			};
		case RESET_PROFILE_PASSWORD_START:
			return {
				...state,
				resetProfilePasswordLoading: true,
			};
		case RESET_PROFILE_PASSWORD_SUCCESS:
			return {
				...state,
				resetProfilePasswordLoading: false,
				resetProfilePasswordSuccess: true,
				resetProfilePasswordError: null,
			};
		case RESET_PROFILE_PASSWORD_FAIL:
			return {
				...state,
				resetProfilePasswordLoading: false,
				resetProfilePasswordError: payload,
				resetProfilePasswordSuccess: false,
			};
		default:
			return { ...state };
	}
};

export default ProfileData;
