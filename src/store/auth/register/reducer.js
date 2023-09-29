import {
	REGISTER_USER,
	REGISTER_USER_SUCCESSFUL,
	REGISTER_USER_FAILED,
} from './actionTypes';

const initialState = {
	registrationError: null,
	message: null,
	loading: false,
	user: null,
};

const account = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case REGISTER_USER:
			return {
				...state,
				loading: true,
				registrationError: null,
			};
		case REGISTER_USER_SUCCESSFUL:
			return {
				...state,
				loading: false,
				user: payload,
				registrationError: null,
			};
		case REGISTER_USER_FAILED:
			return {
				...state,
				user: null,
				loading: false,
				registrationError: payload,
			};
		default:
			return { ...state };
	}
};

export default account;
