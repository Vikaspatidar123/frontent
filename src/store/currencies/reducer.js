import {
	FETCH_CURRENCIES_FAIL,
	FETCH_CURRENCIES_START,
	FETCH_CURRENCIES_SUCCESS,
} from './actionTypes';

const initialState = {
	currencies: null,
	error: '',
	loading: false,
};

const currenciesReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_CURRENCIES_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_CURRENCIES_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_CURRENCIES_SUCCESS:
			return {
				...state,
				loading: false,
				currencies: payload,
			};
		default:
			return { ...state };
	}
};

export default currenciesReducer;
