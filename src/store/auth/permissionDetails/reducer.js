import {
	PERMISSIONS_ERROR,
	PERMISSIONS_START,
	PERMISSIONS_SUCCESS,
} from './actionTypes';

const initialState = {
	loading: false,
	error: '',
	permissions: '',
	adminDetails: '',
};

const adminPERMISSIONS = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case PERMISSIONS_START:
			return { ...state, loading: payload };
		case PERMISSIONS_SUCCESS:
			return { ...state, permissions: payload, loading: false };
		case PERMISSIONS_ERROR:
			return { ...state, error: payload, loading: false };
		default:
			return { ...state };
	}
};

export default adminPERMISSIONS;
