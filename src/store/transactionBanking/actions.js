import {
	FETCH_TRANSACTION_BANKING_FAIL,
	FETCH_TRANSACTION_BANKING_START,
	FETCH_TRANSACTION_BANKING_SUCCESS,
	RESET_TRANSACTION_BANKING_DATA,
} from './actionTypes';

export const fetchTransactionBankingStart = (payload) => ({
	type: FETCH_TRANSACTION_BANKING_START,
	payload,
});

export const fetchTransactionBankingSuccess = (payload) => ({
	type: FETCH_TRANSACTION_BANKING_SUCCESS,
	payload,
});

export const fetchTransactionBankingFail = (history) => ({
	type: FETCH_TRANSACTION_BANKING_FAIL,
	payload: { history },
});

export const resetTransactionBankingData = (payload) => ({
	type: RESET_TRANSACTION_BANKING_DATA,
	payload,
});
