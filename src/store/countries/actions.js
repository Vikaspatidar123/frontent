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
	FETCH_RESTRICTED_GAMES_START,
	FETCH_RESTRICTED_GAMES_FAIL,
	FETCH_RESTRICTED_GAMES_SUCCESS,
	FETCH_UNRESTRICTED_GAMES_START,
	FETCH_UNRESTRICTED_GAMES_FAIL,
	FETCH_UNRESTRICTED_GAMES_SUCCESS,
	REMOVE_RESTRICTED_GAMES_START,
	REMOVE_RESTRICTED_GAMES_FAIL,
	REMOVE_RESTRICTED_GAMES_SUCCESS,
	ADD_RESTRICTED_GAMES_START,
	ADD_RESTRICTED_GAMES_FAIL,
	ADD_RESTRICTED_GAMES_SUCCESS,
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

export const fetchRestrictedGamesStart = (payload) => ({
	type: FETCH_RESTRICTED_GAMES_START,
	payload,
});

export const fetchRestrictedGamesSuccess = (payload) => ({
	type: FETCH_RESTRICTED_GAMES_SUCCESS,
	payload,
});

export const fetchRestrictedGamesFail = (payload) => ({
	type: FETCH_RESTRICTED_GAMES_FAIL,
	payload,
});

export const fetchUnrestrictedGamesStart = (payload) => ({
	type: FETCH_UNRESTRICTED_GAMES_START,
	payload,
});

export const fetchUnrestrictedGamesSuccess = (payload) => ({
	type: FETCH_UNRESTRICTED_GAMES_SUCCESS,
	payload,
});

export const fetchUnrestrictedGamesFail = (payload) => ({
	type: FETCH_UNRESTRICTED_GAMES_FAIL,
	payload,
});

export const removeRestrictedGamesStart = (payload) => ({
	type: REMOVE_RESTRICTED_GAMES_START,
	payload,
});

export const removeRestrictedGamesSuccess = (payload) => ({
	type: REMOVE_RESTRICTED_GAMES_SUCCESS,
	payload,
});

export const removeRestrictedGamesFail = (payload) => ({
	type: REMOVE_RESTRICTED_GAMES_FAIL,
	payload,
});

export const addRestrictedGamesStart = (payload) => ({
	type: ADD_RESTRICTED_GAMES_START,
	payload,
});

export const addRestrictedGamesSuccess = (payload) => ({
	type: ADD_RESTRICTED_GAMES_SUCCESS,
	payload,
});

export const addRestrictedGamesFail = (payload) => ({
	type: ADD_RESTRICTED_GAMES_FAIL,
	payload,
});
