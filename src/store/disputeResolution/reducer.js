import {
	FETCH_DISPUTE_DETAILS,
	FETCH_DISPUTE_FAIL,
	FETCH_DISPUTE_SUCCESS,
	FETCH_DISPUTES_FAIL,
	FETCH_DISPUTES_START,
	FETCH_DISPUTES_SUCCESS,
	RESET_DISPUTES_DATA,
} from './actionTypes';

const initialState = {
	disputes: null,
	error: '',
	loading: false,

	disputeDetails: null,
	detailsLoading: false,
	detailsError: '',
};

const disputesReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_DISPUTES_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_DISPUTES_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_DISPUTES_SUCCESS:
			return {
				...state,
				loading: false,
				disputes: payload,
			};

		case FETCH_DISPUTE_DETAILS:
			return {
				...state,
				detailsLoading: true,
			};
		case FETCH_DISPUTE_FAIL:
			return {
				...state,
				detailsLoading: false,
				error: true,
			};
		case FETCH_DISPUTE_SUCCESS:
			return {
				...state,
				detailsLoading: false,
				disputeDetails: payload,
			};

		case RESET_DISPUTES_DATA:
			return {
				...state,
				loading: false,
				disputes: null,
				error: '',
			};
		default:
			return { ...state };
	}
};

export default disputesReducer;
