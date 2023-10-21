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
		default:
			return { ...state };
	}
};

export default countriesReducer;
