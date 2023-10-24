import {
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	userDetails: null,
	userDetailsLoading: false,
	userDetailsError: false,
};

const UserDetails = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_USER_DETAILS:
			return {
				...state,
				userDetailsLoading: true,
			};

		case GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				userDetailsLoading: false,
				userDetails: payload,
				userDetailsError: null,
			};

		case GET_USER_DETAILS_FAIL:
			return {
				...state,
				userDetailsError: payload,
				userDetailsLoading: true,
			};

		default:
			return { ...state };
	}
};

export default UserDetails;
