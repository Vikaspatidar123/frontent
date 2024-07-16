import {
	FETCH_DISPUTES_FAIL,
	FETCH_DISPUTES_START,
	FETCH_DISPUTES_SUCCESS,
	RESET_DISPUTES_DATA,
	FETCH_DISPUTE_DETAILS,
	FETCH_DISPUTE_SUCCESS,
	FETCH_DISPUTE_FAIL,
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

export const fetchDisputeDetails = (payload) => ({
	type: FETCH_DISPUTE_DETAILS,
	payload,
});

export const fetchDisputeSuccess = (payload) => ({
	type: FETCH_DISPUTE_SUCCESS,
	payload,
});

export const fetchDisputeFail = (payload) => ({
	type: FETCH_DISPUTE_FAIL,
	payload,
});
