import {
	GET_SPORTS_LIST,
	GET_SPORTS_LIST_SUCCESS,
	GET_SPORTS_LIST_FAIL,
} from './actionTypes';

export const getSportsListSuccess = (payload) => ({
	type: GET_SPORTS_LIST_SUCCESS,
	payload,
});

export const getSportsListFail = (payload) => ({
	type: GET_SPORTS_LIST_FAIL,
	payload,
});

export const getSportsList = (payload) => ({
	type: GET_SPORTS_LIST,
	payload,
});
