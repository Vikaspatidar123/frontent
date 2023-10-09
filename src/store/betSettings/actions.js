import {
	GET_BET_SETTINGS_DATA,
	GET_BET_SETTINGS_DATA_SUCCESS,
	GET_BET_SETTINGS_DATA_FAIL,
} from './actionTypes';

export const getBetSettingsDataSuccess = (payload) => ({
	type: GET_BET_SETTINGS_DATA_SUCCESS,
	payload,
});

export const getBetSettingsDataFail = (payload) => ({
	type: GET_BET_SETTINGS_DATA_FAIL,
	payload,
});

export const getBetSettingsData = () => ({
	type: GET_BET_SETTINGS_DATA,
});
