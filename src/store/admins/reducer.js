import {
	GET_ADMINS_DATA,
	GET_ADMINS_DATA_SUCCESS,
	GET_ADMINS_DATA_FAIL,
} from './actionTypes';

const INIT_STATE = {
	adminDetails: null,
	error: null,
	loading: true,
};

const getAllAdmins = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ADMINS_DATA:
			return {
				...state,
				loading: false,
			};

		case GET_ADMINS_DATA_SUCCESS:
			return {
				...state,
				loading: true,
				adminDetails: payload,
				error: null,
			};

		case GET_ADMINS_DATA_FAIL:
			return {
				...state,
				error: payload,
				loading: true,
			};

		default:
			return state;
	}
};

export default getAllAdmins;
