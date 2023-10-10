import {
	GET_SPORTS_LIST,
	GET_SPORTS_LIST_SUCCESS,
	GET_SPORTS_LIST_FAIL,
	GET_SPORTS_COUNTRIES,
	GET_SPORTS_COUNTRIES_SUCCESS,
	GET_SPORTS_COUNTRIES_FAIL,
} from './actionTypes';

export const getSportsListSuccess = (payload) => ({
	type: GET_SPORTS_LIST_SUCCESS,
	payload,
});

export const getSportsListFail = (payload) => ({
	type: GET_SPORTS_LIST_FAIL,
	payload,
});

export const getSportsList = (payload) => ({
	type: GET_SPORTS_LIST,
	payload,
});

export const getSportsCountriesSuccess = (payload) => ({
	type: GET_SPORTS_COUNTRIES_SUCCESS,
	payload,
});

export const getSportsCountriesFail = (payload) => ({
	type: GET_SPORTS_COUNTRIES_FAIL,
	payload,
});

export const getSportsCountries = (payload) => ({
	type: GET_SPORTS_COUNTRIES,
	payload,
});
