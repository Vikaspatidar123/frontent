import {
	FETCH_REVIEW_MANAGEMENT_FAIL,
	FETCH_REVIEW_MANAGEMENT_START,
	FETCH_REVIEW_MANAGEMENT_SUCCESS,
	CREATE_REVIEW_FAIL,
	CREATE_REVIEW_START,
	CREATE_REVIEW_SUCCESS,
} from './actionTypes';

export const fetchReviewManagementStart = (payload) => ({
	type: FETCH_REVIEW_MANAGEMENT_START,
	payload,
});

export const fetchReviewManagementSuccess = (payload) => ({
	type: FETCH_REVIEW_MANAGEMENT_SUCCESS,
	payload,
});

export const fetchReviewManagementFail = (history) => ({
	type: FETCH_REVIEW_MANAGEMENT_FAIL,
	payload: { history },
});

export const createReviewSuccess = (payload) => ({
	type: CREATE_REVIEW_SUCCESS,
	payload,
});

export const createReviewFail = (payload) => ({
	type: CREATE_REVIEW_FAIL,
	payload,
});

export const createReviewStart = (payload) => ({
	type: CREATE_REVIEW_START,
	payload,
});
