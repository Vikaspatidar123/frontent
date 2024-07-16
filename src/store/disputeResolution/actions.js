import {
	FETCH_DISPUTES_FAIL,
	FETCH_DISPUTES_START,
	FETCH_DISPUTES_SUCCESS,
	RESET_DISPUTES_DATA,
} from './actionTypes';

export const fetchDisputesStart = (payload) => ({
	type: FETCH_DISPUTES_START,
	payload,
});

export const fetchDisputesSuccess = (disputes) => ({
	type: FETCH_DISPUTES_SUCCESS,
	payload: disputes,
});

export const fetchDisputesFail = (history) => ({
	type: FETCH_DISPUTES_FAIL,
	payload: { history },
});

export const resetDisputesData = (payload) => ({
	type: RESET_DISPUTES_DATA,
	payload,
});
