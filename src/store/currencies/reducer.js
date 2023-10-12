import {
	FETCH_CURRENCIES_FAIL,
	FETCH_CURRENCIES_START,
	FETCH_CURRENCIES_SUCCESS,
	CREATE_CURRENCIES_FAIL,
	CREATE_CURRENCIES_START,
	CREATE_CURRENCIES_SUCCESS,
} from './actionTypes';

const initialState = {
	currencies: null,
	error: '',
	loading: false,
	isCreateCurrencyError: false,
	isCreateCurrencySuccess: false,
	isCreateCurrencyLoading: false,
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
		case CREATE_CURRENCIES_START:
			return {
				...state,
				isCreateCurrencyLoading: true,
				isCreateCurrencySuccess: false,
			};

		case CREATE_CURRENCIES_SUCCESS:
			return {
				...state,
				isCreateCurrencyLoading: false,
				isCreateCurrencySuccess: true,
			};

		case CREATE_CURRENCIES_FAIL:
			return {
				...state,
				isCreateCurrencyError: payload,
				isCreateCurrencyLoading: false,
				isCreateCurrencySuccess: false,
			};
		default:
			return { ...state };
	}
};

export default currenciesReducer;
