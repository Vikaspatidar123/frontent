import {
	GET_ADMINS_DATA,
	GET_ADMINS_DATA_SUCCESS,
	GET_ADMINS_DATA_FAIL,
	ADD_SUPER_ADMIN_USER,
	ADD_SUPER_ADMIN_USER_SUCCESS,
	ADD_SUPER_ADMIN_USER_FAIL,
} from './actionTypes';

const INIT_STATE = {
	adminDetails: null,
	error: null,
	isLoading: true,
	isAddSuperUserError: false,
	isAddSuperUserSuccess: false,
	isAddSuperUserLoading: false,
};

const getAllAdmins = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ADMINS_DATA:
			return {
				...state,
				isLoading: false,
			};

		case GET_ADMINS_DATA_SUCCESS:
			return {
				...state,
				isLoading: true,
				adminDetails: payload,
				error: null,
			};

		case GET_ADMINS_DATA_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		case ADD_SUPER_ADMIN_USER:
			return {
				...state,
				isAddSuperUserLoading: true,
				isAddSuperUserSuccess: false,
			};

		case ADD_SUPER_ADMIN_USER_SUCCESS:
			return {
				...state,
				isAddSuperUserLoading: false,
				isAddSuperUserSuccess: true,
			};

		case ADD_SUPER_ADMIN_USER_FAIL:
			return {
				...state,
				isAddSuperUserError: payload,
				isAddSuperUserLoading: false,
				isAddSuperUserSuccess: false,
			};
		default:
			return { ...state };
	}
};

export default getAllAdmins;
