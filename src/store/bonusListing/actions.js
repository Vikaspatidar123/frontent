import {
	GET_BONUS_DETAILS_DATA,
	GET_BONUS_DETAILS_DATA_SUCCESS,
	GET_BONUS_DETAILS_DATA_FAIL,
	UPDATE_SA_BONUS_STATUS,
	UPDATE_SA_BONUS_STATUS_SUCCESS,
	UPDATE_SA_BONUS_STATUS_FAIL,
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

export const updateSABonusStatusSuccess = (payload) => ({
	type: UPDATE_SA_BONUS_STATUS_SUCCESS,
	payload,
});

export const updateSABonusStatusFail = (payload) => ({
	type: UPDATE_SA_BONUS_STATUS_FAIL,
	payload,
});

export const updateSABonusStatus = (payload) => ({
	type: UPDATE_SA_BONUS_STATUS,
	payload,
});
