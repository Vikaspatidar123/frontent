import {
	GET_ALL_GROUP_START,
	GET_ALL_GROUP_SUCCESS,
	GET_ALL_GROUP_FAIL,
} from './actionTypes';

const INIT_STATE = {
	isLoading: false,
	error: null,
	// adminUsers: [],
	// adminUserDetails: {},
	groups: [],
};

const adminUser = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ALL_GROUP_START:
			return {
				...state,
				isLoading: false,
			};

		case GET_ALL_GROUP_SUCCESS:
			return {
				...state,
				isLoading: true,
				groups: payload,
				error: null,
			};

		case GET_ALL_GROUP_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		default:
			return { ...state };
	}
};

export default adminUser;
