import {
	CREATE_BONUS,
	CREATE_BONUS_FAIL,
	CREATE_BONUS_SUCCESS,
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
