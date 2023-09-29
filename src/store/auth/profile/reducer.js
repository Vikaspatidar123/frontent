import {
	PROFILE_ERROR,
	PROFILE_SUCCESS,
	EDIT_PROFILE,
	RESET_PROFILE_FLAG,
} from './actionTypes';

const initialState = {
	error: '',
	success: '',
};

const profile = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case EDIT_PROFILE:
			return { ...state };
		case PROFILE_SUCCESS:
			return { ...state, success: payload };
		case PROFILE_ERROR:
			return { ...state, error: payload };
		case RESET_PROFILE_FLAG:
			return { ...state, success: null };
		default:
			return { ...state };
	}
};

export default profile;
