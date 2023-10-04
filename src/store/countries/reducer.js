import {
	FETCH_COUNTRIES_FAIL,
	FETCH_COUNTRIES_START,
	FETCH_COUNTRIES_SUCCESS,
} from './actionTypes';

const initialState = {
	countries: null,
	error: '',
	loading: false,
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
				error: true,
			};
		case FETCH_COUNTRIES_SUCCESS:
			return {
				...state,
				countries: payload,
			};
		default:
			return { ...state };
	}
};

export default countriesReducer;
