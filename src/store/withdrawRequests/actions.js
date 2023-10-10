import {
	FETCH_WITHDRAW_REQUESTS_FAIL,
	FETCH_WITHDRAW_REQUESTS_START,
	FETCH_WITHDRAW_REQUESTS_SUCCESS,
} from './actionTypes';

export const fetchWithdrawRequestsStart = (payload) => ({
	type: FETCH_WITHDRAW_REQUESTS_START,
	payload,
});

export const fetchWithdrawRequestsSuccess = (payload) => ({
	type: FETCH_WITHDRAW_REQUESTS_SUCCESS,
	payload,
});

export const fetchWithdrawRequestsFail = (history) => ({
	type: FETCH_WITHDRAW_REQUESTS_FAIL,
	payload: { history },
});
