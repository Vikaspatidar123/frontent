import {
	ADD_RESTRICTED_COUNTRIES_FAIL,
	ADD_RESTRICTED_COUNTRIES_START,
	ADD_RESTRICTED_COUNTRIES_SUCCESS,
	FETCH_RESTRICTED_COUNTRIES_FAIL,
	FETCH_RESTRICTED_COUNTRIES_START,
	FETCH_RESTRICTED_COUNTRIES_SUCCESS,
	FETCH_UNRESTRICTED_COUNTRIES_FAIL,
	FETCH_UNRESTRICTED_COUNTRIES_START,
	FETCH_UNRESTRICTED_COUNTRIES_SUCCESS,
} from './actionTypes';

export const fetchRestrictedCountriesStart = (payload) => ({
	type: FETCH_RESTRICTED_COUNTRIES_START,
	payload,
});

export const fetchRestrictedCountriesSuccess = (payload) => ({
	type: FETCH_RESTRICTED_COUNTRIES_SUCCESS,
	payload,
});

export const fetchRestrictedCountriesFail = (payload) => ({
	type: FETCH_RESTRICTED_COUNTRIES_FAIL,
	payload,
});

export const fetchUnrestrictedCountriesStart = (payload) => ({
	type: FETCH_UNRESTRICTED_COUNTRIES_START,
	payload,
});

export const fetchUnrestrictedCountriesSuccess = (payload) => ({
	type: FETCH_UNRESTRICTED_COUNTRIES_SUCCESS,
	payload,
});

export const fetchUnrestrictedCountriesFail = (payload) => ({
	type: FETCH_UNRESTRICTED_COUNTRIES_FAIL,
	payload,
});

export const addRestrictedCountriesStart = (payload) => ({
	type: ADD_RESTRICTED_COUNTRIES_START,
	payload,
});

export const addRestrictedCountriesSuccess = (payload) => ({
	type: ADD_RESTRICTED_COUNTRIES_SUCCESS,
	payload,
});

export const addRestrictedCountriesFail = (payload) => ({
	type: ADD_RESTRICTED_COUNTRIES_FAIL,
	payload,
});
