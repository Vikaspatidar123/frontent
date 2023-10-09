import {
	FETCH_CURRENCIES_FAIL,
	FETCH_CURRENCIES_START,
	FETCH_CURRENCIES_SUCCESS,
} from './actionTypes';

export const fetchCurrenciesStart = (payload) => ({
	type: FETCH_CURRENCIES_START,
	payload,
});

export const fetchCurrenciesSuccess = (currencies) => ({
	type: FETCH_CURRENCIES_SUCCESS,
	payload: currencies,
});

export const fetchCurrenciesFail = (history) => ({
	type: FETCH_CURRENCIES_FAIL,
	payload: { history },
});
