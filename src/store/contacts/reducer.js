import {
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	ADD_USER_SUCCESS,
	ADD_USER_FAIL,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_FAIL,
} from './actionTypes';

const INIT_STATE = {
	users: [],
	userProfile: {},
	error: {},
	loading: true,
};

const contacts = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_USERS_SUCCESS:
			return {
				...state,
				users: payload,
				loading: true,
			};

		case GET_USERS_FAIL:
			return {
				...state,
				error: payload,
			};

		case ADD_USER_SUCCESS:
			return {
				...state,
				users: [...state.users, payload],
			};

		case ADD_USER_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_USER_PROFILE_SUCCESS:
			return {
				...state,
				userProfile: payload,
			};

		case UPDATE_USER_SUCCESS:
			return {
				...state,
				users: state.users.map((user) =>
					user.id.toString() === payload.id.toString()
						? { user, ...payload }
						: user
				),
			};

		case UPDATE_USER_FAIL:
			return {
				...state,
				error: payload,
			};

		case DELETE_USER_SUCCESS:
			return {
				...state,
				users: state.users.filter(
					(user) => user.id.toString() !== payload.toString()
				),
			};

		case DELETE_USER_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_USER_PROFILE_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default contacts;
