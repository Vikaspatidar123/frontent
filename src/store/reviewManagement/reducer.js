import {
	FETCH_REVIEW_MANAGEMENT_FAIL,
	FETCH_REVIEW_MANAGEMENT_START,
	FETCH_REVIEW_MANAGEMENT_SUCCESS,
} from './actionTypes';

const initialState = {
	reviewManagement: null,
	error: '',
	loading: false,
};

const reviewManagementReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_REVIEW_MANAGEMENT_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_REVIEW_MANAGEMENT_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_REVIEW_MANAGEMENT_SUCCESS:
			return {
				...state,
				loading: false,
				reviewManagement: payload,
			};
		default:
			return { ...state };
	}
};

export default reviewManagementReducer;
