import {
	FETCH_COUNTRIES_FAIL,
	FETCH_COUNTRIES_START,
	FETCH_COUNTRIES_SUCCESS,
	UPDATE_COUNTRIES_STATUS_START,
	UPDATE_COUNTRIES_STATUS_SUCCESS,
	UPDATE_COUNTRIES_STATUS_FAIL,
	EDIT_COUNTRIES_START,
	EDIT_COUNTRIES_FAIL,
	EDIT_COUNTRIES_SUCCESS,
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

const initialState = {
	countries: null,
	error: '',
	loading: false,
	updateCountriesStatus: false,
	updateCountriesStatusError: null,
	updateCountriesStatusLoading: false,
	editCountriesSuccess: false,
	editCountriesError: null,
	editCountriesLoading: false,
	restrictedGames: null,
	restrictedGamesError: null,
	restrictedGamesLoading: false,
	unrestrictedGames: null,
	unrestrictedGamesError: null,
	unrestrictedGamesLoading: false,
	removeRestrictedGames: false,
	removeRestrictedGamesError: null,
	removeRestrictedGamesLoading: false,
	addRestrictedCountries: false,
	addRestrictedCountriesError: null,
	addRestrictedCountriesLoading: false,
};

const countriesReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_COUNTRIES_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_COUNTRIES_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_COUNTRIES_SUCCESS:
			return {
				...state,
				loading: false,
				countries: payload,
			};
		case UPDATE_COUNTRIES_STATUS_START:
			return {
				...state,
				updateCountriesStatusLoading: true,
			};
		case UPDATE_COUNTRIES_STATUS_FAIL:
			return {
				...state,
				updateCountriesStatusLoading: false,
				updateCountriesStatusError: payload,
				updateCountriesStatus: false,
			};
		case UPDATE_COUNTRIES_STATUS_SUCCESS:
			return {
				...state,
				updateCountriesStatusLoading: false,
				updateCountriesStatus: true,
				updateCountriesStatusError: false,
			};

		case EDIT_COUNTRIES_START:
			return {
				...state,
				editCountriesLoading: true,
			};
		case EDIT_COUNTRIES_FAIL:
			return {
				...state,
				editCountriesLoading: false,
				editCountriesError: payload,
				editCountriesSuccess: false,
			};
		case EDIT_COUNTRIES_SUCCESS:
			return {
				...state,
				editCountriesLoading: false,
				editCountriesSuccess: true,
				editCountriesError: false,
			};
		case FETCH_RESTRICTED_GAMES_START:
			return {
				...state,
				restrictedGamesLoading: true,
			};
		case FETCH_RESTRICTED_GAMES_FAIL:
			return {
				...state,
				restrictedGamesLoading: false,
				restrictedGamesError: payload,
				restrictedGames: null,
			};
		case FETCH_RESTRICTED_GAMES_SUCCESS:
			return {
				...state,
				restrictedGamesLoading: false,
				restrictedGames: payload,
				restrictedGamesError: null,
			};
		case FETCH_UNRESTRICTED_GAMES_START:
			return {
				...state,
				unrestrictedGamesLoading: true,
			};
		case FETCH_UNRESTRICTED_GAMES_FAIL:
			return {
				...state,
				unrestrictedGamesLoading: false,
				unrestrictedGamesError: payload,
				unrestrictedGames: null,
			};
		case FETCH_UNRESTRICTED_GAMES_SUCCESS:
			return {
				...state,
				unrestrictedGamesLoading: false,
				unrestrictedGames: payload,
				unrestrictedGamesError: null,
			};
		case REMOVE_RESTRICTED_GAMES_START:
			return {
				...state,
				removeRestrictedGamesLoading: true,
			};
		case REMOVE_RESTRICTED_GAMES_FAIL:
			return {
				...state,
				removeRestrictedGamesLoading: false,
				removeRestrictedGamesError: payload,
				removeRestrictedGames: false,
			};
		case REMOVE_RESTRICTED_GAMES_SUCCESS:
			return {
				...state,
				removeRestrictedGamesLoading: false,
				removeRestrictedGames: true,
				removeRestrictedGamesError: null,
			};
		case ADD_RESTRICTED_GAMES_START:
			return {
				...state,
				addRestrictedCountriesLoading: true,
			};
		case ADD_RESTRICTED_GAMES_FAIL:
			return {
				...state,
				addRestrictedCountriesLoading: false,
				addRestrictedCountriesError: payload,
				addRestrictedCountries: false,
			};
		case ADD_RESTRICTED_GAMES_SUCCESS:
			return {
				...state,
				addRestrictedCountriesLoading: false,
				addRestrictedCountries: true,
				addRestrictedCountriesError: null,
			};
		default:
			return { ...state };
	}
};

export default countriesReducer;
