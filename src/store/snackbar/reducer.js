import { SET_SNACKBAR, RESET_SNACKBAR } from './actionTypes';

const INIT_STATE = {
	isOpen: false,
	message: '',
	type: 'error',
};

const snackbar = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case SET_SNACKBAR:
			return {
				...state,
				isOpen: payload.isOpen,
				message: payload.message,
				type: payload.type,
			};

		case RESET_SNACKBAR:
			return {
				...INIT_STATE,
			};

		default:
			return { ...state };
	}
};

export default snackbar;
