import {
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS,
	GET_USER_DOCUMENTS,
	GET_USER_DOCUMENTS_FAIL,
	GET_USER_DOCUMENTS_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	userDetails: null,
	userDetailsLoading: false,
	userDetailsError: false,
	userDocuments: null,
	userDocumentsLoading: false,
	userDocumentsError: false,
};

const UserDetails = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_USER_DETAILS:
			return {
				...state,
				userDetailsLoading: true,
			};

		case GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				userDetailsLoading: false,
				userDetails: payload,
				userDetailsError: null,
			};

		case GET_USER_DETAILS_FAIL:
			return {
				...state,
				userDetailsError: payload,
				userDetailsLoading: true,
			};

		case GET_USER_DOCUMENTS:
			return {
				...state,
				userDocumentsLoading: true,
			};

		case GET_USER_DOCUMENTS_SUCCESS:
			return {
				...state,
				userDocumentsLoading: false,
				userDocuments: payload,
				userDocumentsError: null,
			};

		case GET_USER_DOCUMENTS_FAIL:
			return {
				...state,
				userDocumentsError: payload,
				userDocumentsLoading: true,
			};
		default:
			return { ...state };
	}
};

export default UserDetails;
