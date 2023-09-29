import {
	FORGET_PASSWORD,
	FORGET_PASSWORD_SUCCESS,
	FORGET_PASSWORD_ERROR,
} from './actionTypes';

const initialState = {
	forgetSuccessMsg: null,
	forgetError: null,
};

const forgetPassword = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FORGET_PASSWORD:
			return {
				...state,
				forgetSuccessMsg: null,
				forgetError: null,
			};
		case FORGET_PASSWORD_SUCCESS:
			return {
				...state,
				forgetSuccessMsg: payload,
			};
		case FORGET_PASSWORD_ERROR:
			return { ...state, forgetError: payload };
		default:
			return { ...state };
	}
};

export default forgetPassword;
