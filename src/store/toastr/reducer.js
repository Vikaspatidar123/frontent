import { SET_TOASTR, RESET_TOASTR } from './actionTypes';

const INIT_STATE = {
	isOpen: false,
	message: '',
	type: 'error',
};

const Toastr = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case SET_TOASTR:
			return {
				...state,
				isOpen: true,
				message: payload.message,
				type: payload.type,
			};

		case RESET_TOASTR:
			return {
				...INIT_STATE,
			};

		default:
			return { ...state };
	}
};

export default Toastr;
