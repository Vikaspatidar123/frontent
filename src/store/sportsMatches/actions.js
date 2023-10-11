import {
	FETCH_SPORTS_MATCHES_FAIL,
	FETCH_SPORTS_MATCHES_START,
	FETCH_SPORTS_MATCHES_SUCCESS,
} from './actionTypes';

export const fetchSportsMatchesStart = (payload) => ({
	type: FETCH_SPORTS_MATCHES_START,
	payload,
});

export const fetchSportsMatchesSuccess = (payload) => ({
	type: FETCH_SPORTS_MATCHES_SUCCESS,
	payload,
});

export const fetchSportsMatchesFail = (history) => ({
	type: FETCH_SPORTS_MATCHES_FAIL,
	payload: { history },
});
