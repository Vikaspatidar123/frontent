import {
	CREATE_BONUS,
	CREATE_BONUS_FAIL,
	CREATE_BONUS_SUCCESS,
	RESET_CREATE_BONUS,
} from './actionTypes';

export const createBonusSuccess = (payload) => ({
	type: CREATE_BONUS_SUCCESS,
	payload,
});

export const createBonusFail = (payload) => ({
	type: CREATE_BONUS_FAIL,
	payload,
});

export const createBonus = (payload) => ({
	type: CREATE_BONUS,
	payload,
});

export const resetCreateBonus = (payload) => ({
	type: RESET_CREATE_BONUS,
	payload,
});
