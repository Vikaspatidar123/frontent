import {
	GET_SPORTS_LIST,
	GET_SPORTS_LIST_SUCCESS,
	GET_SPORTS_LIST_FAIL,
} from './actionTypes';

const INIT_STATE = {
	sportsList: null,
	error: null,
	isLoading: true,
};

const sportsList = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_SPORTS_LIST:
			return {
				...state,
				isLoading: false,
			};

		case GET_SPORTS_LIST_SUCCESS:
			return {
				...state,
				isLoading: true,
				sportsList: payload,
				error: null,
			};

		case GET_SPORTS_LIST_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		default:
			return { ...state };
	}
};

export default sportsList;
