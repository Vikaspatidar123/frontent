import {
	FETCH_SPORTS_TRANSACTION_FAIL,
	FETCH_SPORTS_TRANSACTION_START,
	FETCH_SPORTS_TRANSACTION_SUCCESS,
	RESET_SPORTS_TRANSACTION_DATA,
} from './actionTypes';

const initialState = {
	sportsTransaction: null,
	error: '',
	loading: false,
};

const sportsTransactionReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_SPORTS_TRANSACTION_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_SPORTS_TRANSACTION_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_SPORTS_TRANSACTION_SUCCESS:
			return {
				...state,
				loading: false,
				sportsTransaction: payload,
			};
		case RESET_SPORTS_TRANSACTION_DATA:
			return {
				...state,
				loading: false,
				sportsTransaction: null,
				error: '',
			};
		default:
			return { ...state };
	}
};

export default sportsTransactionReducer;
