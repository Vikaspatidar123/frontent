import {
	FETCH_COUNTRIES_FAIL,
	FETCH_COUNTRIES_START,
	FETCH_COUNTRIES_SUCCESS,
} from './actionTypes';

export const fetchCountriesStart = (payload) => ({
	type: FETCH_COUNTRIES_START,
	payload,
});

export const fetchCountriesSuccess = (countries) => ({
	type: FETCH_COUNTRIES_SUCCESS,
	payload: countries,
});

export const fetchCountriesFail = (history) => ({
	type: FETCH_COUNTRIES_FAIL,
	payload: { history },
});
