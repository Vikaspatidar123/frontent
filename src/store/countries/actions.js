import {
	FETCH_COUNTRIES_FAIL,
	FETCH_COUNTRIES_START,
	FETCH_COUNTRIES_SUCCESS,
	UPDATE_COUNTRIES_STATUS_START,
	UPDATE_COUNTRIES_STATUS_SUCCESS,
	UPDATE_COUNTRIES_STATUS_FAIL,
	EDIT_COUNTRIES_START,
	EDIT_COUNTRIES_SUCCESS,
	EDIT_COUNTRIES_FAIL,
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

export const updateCountryStatusStart = (payload) => ({
	type: UPDATE_COUNTRIES_STATUS_START,
	payload,
});

export const updateCountryStatusSuccess = (payload) => ({
	type: UPDATE_COUNTRIES_STATUS_SUCCESS,
	payload,
});

export const updateCountryStatusFail = (payload) => ({
	type: UPDATE_COUNTRIES_STATUS_FAIL,
	payload,
});

export const editCountryStart = (payload) => ({
	type: EDIT_COUNTRIES_START,
	payload,
});

export const editCountrySuccess = (payload) => ({
	type: EDIT_COUNTRIES_SUCCESS,
	payload,
});

export const editCountryFail = (payload) => ({
	type: EDIT_COUNTRIES_FAIL,
	payload,
});
