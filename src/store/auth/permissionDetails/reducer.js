import {
	PERMISSIONS_ERROR,
	PERMISSIONS_START,
	PERMISSIONS_SUCCESS,
	SUPER_ADMIN_START,
	SUPER_ADMIN_SUCCESS,
	SUPER_ADMIN_FAIL,
} from './actionTypes';

const initialState = {
	isAdminLoading: false,
	error: '',
	adminDetails: '',
	superAdminUser: '',
	isSuperAdminLoading: false,
	isSuperAdminError: '',
};

const permissionDetails = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case PERMISSIONS_START:
			return { ...state, isAdminLoading: payload };
		case PERMISSIONS_SUCCESS:
			return {
				...state,
				adminDetails: payload,
				isAdminLoading: false,
			};
		case PERMISSIONS_ERROR:
			return { ...state, error: payload, isAdminLoading: false };

		case SUPER_ADMIN_START:
			return { ...state, isSuperAdminLoading: true };

		case SUPER_ADMIN_SUCCESS:
			return { ...state, superAdminUser: payload, isSuperAdminLoading: false };

		case SUPER_ADMIN_FAIL:
			return {
				...state,
				isSuperAdminError: payload,
				isSuperAdminLoading: false,
			};

		default:
			return { ...state };
	}
};

export default permissionDetails;
