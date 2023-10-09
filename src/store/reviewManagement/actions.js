import {
	FETCH_REVIEW_MANAGEMENT_FAIL,
	FETCH_REVIEW_MANAGEMENT_START,
	FETCH_REVIEW_MANAGEMENT_SUCCESS,
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
