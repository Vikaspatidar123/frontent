import {
	FETCH_REVIEW_MANAGEMENT_FAIL,
	FETCH_REVIEW_MANAGEMENT_START,
	FETCH_REVIEW_MANAGEMENT_SUCCESS,
	CREATE_REVIEW_FAIL,
	CREATE_REVIEW_START,
	CREATE_REVIEW_SUCCESS,
} from './actionTypes';

const initialState = {
	reviewManagement: null,
	error: '',
	loading: false,
	isCreateReviewError: false,
	isCreateReviewSuccess: false,
	isCreateReviewLoading: false,
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
		case CREATE_REVIEW_START:
			return {
				...state,
				isCreateReviewLoading: true,
				isCreateReviewSuccess: false,
			};

		case CREATE_REVIEW_SUCCESS:
			return {
				...state,
				isCreateReviewLoading: false,
				isCreateReviewSuccess: true,
			};

		case CREATE_REVIEW_FAIL:
			return {
				...state,
				isCreateReviewError: payload,
				isCreateReviewLoading: false,
				isCreateReviewSuccess: false,
			};
		default:
			return { ...state };
	}
};

export default reviewManagementReducer;
