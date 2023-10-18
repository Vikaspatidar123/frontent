import {
	FETCH_COUNTRIES_FAIL,
	FETCH_COUNTRIES_START,
	FETCH_COUNTRIES_SUCCESS,
	UPDATE_COUNTRIES_STATUS_START,
	UPDATE_COUNTRIES_STATUS_SUCCESS,
	UPDATE_COUNTRIES_STATUS_FAIL,
} from './actionTypes';

const initialState = {
	countries: null,
	error: '',
	loading: false,
	updateCountriesStatus: false,
	updateCountriesStatusError: null,
	updateCountriesStatusLoading: false,
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
		default:
			return { ...state };
	}
};

export default countriesReducer;
