import {
	FETCH_WITHDRAW_REQUESTS_FAIL,
	FETCH_WITHDRAW_REQUESTS_START,
	FETCH_WITHDRAW_REQUESTS_SUCCESS,
	RESET_WITHDRAW_REQUESTS_DATA,
} from './actionTypes';

const initialState = {
	withdrawRequests: null,
	error: '',
	loading: false,
};

const withdrawRequestsReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_WITHDRAW_REQUESTS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_WITHDRAW_REQUESTS_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_WITHDRAW_REQUESTS_SUCCESS:
			return {
				...state,
				loading: false,
				withdrawRequests: payload,
			};
		case RESET_WITHDRAW_REQUESTS_DATA:
			return {
				...state,
				loading: false,
				withdrawRequests: null,
				error: '',
			};
		default:
			return { ...state };
	}
};

export default withdrawRequestsReducer;
