import {
	FETCH_TRANSACTION_BANKING_FAIL,
	FETCH_TRANSACTION_BANKING_START,
	FETCH_TRANSACTION_BANKING_SUCCESS,
} from './actionTypes';

const initialState = {
	transactionBanking: null,
	error: '',
	loading: false,
};

const transactionBankingReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_TRANSACTION_BANKING_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_TRANSACTION_BANKING_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_TRANSACTION_BANKING_SUCCESS:
			return {
				...state,
				loading: false,
				transactionBanking: payload,
			};
		default:
			return state;
	}
};

export default transactionBankingReducer;
