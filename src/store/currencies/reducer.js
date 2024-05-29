import {
	FETCH_CURRENCIES_FAIL,
	FETCH_CURRENCIES_START,
	FETCH_CURRENCIES_SUCCESS,
	CREATE_CURRENCIES_FAIL,
	CREATE_CURRENCIES_START,
	CREATE_CURRENCIES_SUCCESS,
	EDIT_CURRENCIES_START,
	EDIT_CURRENCIES_SUCCESS,
	EDIT_CURRENCIES_FAIL,
	RESET_CURRENCIES_DATA,
	TOGGLE_CURRENCY_SUCCESS,
} from './actionTypes';

const initialState = {
	currencies: null,
	defaultCurrency: { symbol: '$' },
	error: '',
	loading: false,
	isCreateCurrencyError: false,
	isCreateCurrencySuccess: false,
	isCreateCurrencyLoading: false,
	isEditCurrencyError: false,
	isEditCurrencySuccess: false,
	isEditCurrencyLoading: false,
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
				defaultCurrency: payload?.currencies?.find((curr) => curr.default),
			};

		case RESET_CURRENCIES_DATA:
			return {
				...state,
				loading: false,
				currencies: null,
				error: '',
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

		case EDIT_CURRENCIES_START:
			return {
				...state,
				isEditCurrencyLoading: true,
				isEditCurrencySuccess: false,
			};

		case EDIT_CURRENCIES_SUCCESS:
			return {
				...state,
				isEditCurrencyLoading: false,
				isEditCurrencySuccess: true,
			};

		case EDIT_CURRENCIES_FAIL:
			return {
				...state,
				isEditCurrencyError: payload,
				isEditCurrencyLoading: false,
				isEditCurrencySuccess: false,
			};

		case TOGGLE_CURRENCY_SUCCESS:
			return {
				...state,
				currencies: payload,
			};

		default:
			return { ...state };
	}
};

export default currenciesReducer;
