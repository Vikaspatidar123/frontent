import {
	FETCH_COUNTRIES_FAIL,
	FETCH_COUNTRIES_START,
	FETCH_COUNTRIES_SUCCESS,
} from './actionTypes';

export const fetchCountriesStart = (user, history) => ({
	type: FETCH_COUNTRIES_START,
	payload: { user, history },
});

export const fetchCountriesSuccess = (user) => ({
	type: FETCH_COUNTRIES_SUCCESS,
	payload: user,
});

export const fetchCountriesFail = (history) => ({
	type: FETCH_COUNTRIES_FAIL,
	payload: { history },
});
