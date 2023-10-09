import {
	GET_BET_SETTINGS_DATA,
	GET_BET_SETTINGS_DATA_SUCCESS,
	GET_BET_SETTINGS_DATA_FAIL,
} from './actionTypes';

const INIT_STATE = {
	betSettingsList: null,
	error: null,
	isLoading: true,
};

const BetSettings = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_BET_SETTINGS_DATA:
			return {
				...state,
				isLoading: false,
			};

		case GET_BET_SETTINGS_DATA_SUCCESS:
			return {
				...state,
				isLoading: true,
				betSettingsList: payload,
				error: null,
			};

		case GET_BET_SETTINGS_DATA_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		default:
			return { ...state };
	}
};

export default BetSettings;
