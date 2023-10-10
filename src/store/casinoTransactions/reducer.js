import {
	FETCH_CASINO_TRANSACTIONS_FAIL,
	FETCH_CASINO_TRANSACTIONS_START,
	FETCH_CASINO_TRANSACTIONS_SUCCESS,
} from './actionTypes';

const initialState = {
	casinoTransactions: null,
	error: '',
	loading: false,
};

const casinoTransactionsReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_CASINO_TRANSACTIONS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_CASINO_TRANSACTIONS_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_CASINO_TRANSACTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				casinoTransactions: payload,
			};
		default:
			return { ...state };
	}
};

export default casinoTransactionsReducer;
