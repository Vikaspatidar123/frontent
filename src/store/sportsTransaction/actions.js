import {
	FETCH_SPORTS_TRANSACTION_FAIL,
	FETCH_SPORTS_TRANSACTION_START,
	FETCH_SPORTS_TRANSACTION_SUCCESS,
} from './actionTypes';

export const fetchSportsTransactionStart = (payload) => ({
	type: FETCH_SPORTS_TRANSACTION_START,
	payload,
});

export const fetchSportsTransactionSuccess = (payload) => ({
	type: FETCH_SPORTS_TRANSACTION_SUCCESS,
	payload,
});

export const fetchSportsTransactionFail = (history) => ({
	type: FETCH_SPORTS_TRANSACTION_FAIL,
	payload: { history },
});
