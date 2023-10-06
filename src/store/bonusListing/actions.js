import {
	GET_BONUS_DETAILS_DATA,
	GET_BONUS_DETAILS_DATA_SUCCESS,
	GET_BONUS_DETAILS_DATA_FAIL,
} from './actionTypes';

export const getBonusDetailsSuccess = (payload) => ({
	type: GET_BONUS_DETAILS_DATA_SUCCESS,
	payload,
});

export const getBonusDetailsFail = (payload) => ({
	type: GET_BONUS_DETAILS_DATA_FAIL,
	payload,
});

export const getBonusDetails = (payload) => ({
	type: GET_BONUS_DETAILS_DATA,
	payload,
});
