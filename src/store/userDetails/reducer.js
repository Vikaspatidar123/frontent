import {
	CREATE_USER_COMMENT,
	CREATE_USER_COMMENT_FAIL,
	CREATE_USER_COMMENT_SUCCESS,
	GET_USER_BONUS,
	GET_USER_BONUS_FAIL,
	GET_USER_BONUS_SUCCESS,
	GET_USER_COMMENTS,
	GET_USER_COMMENTS_FAIL,
	GET_USER_COMMENTS_SUCCESS,
	GET_USER_DETAILS,
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_SUCCESS,
	GET_USER_DOCUMENTS,
	GET_USER_DOCUMENTS_FAIL,
	GET_USER_DOCUMENTS_SUCCESS,
	RESET_USER_LIMIT,
	RESET_USER_LIMIT_DATA,
	RESET_USER_LIMIT_FAIL,
	RESET_USER_LIMIT_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	userDetails: null,
	userDetailsLoading: false,
	userDetailsError: false,
	userDocuments: null,
	userDocumentsLoading: false,
	userDocumentsError: false,
	userBonus: null,
	userBonusLoading: false,
	userBonusError: false,
	userComments: null,
	userCommentsLoading: false,
	userCommentsError: false,
	createUserCommentsSuccess: false,
	createUserCommentsLoading: false,
	createUserCommentsError: false,
	resetUserLimitSuccess: false,
	resetUserLimitLoading: false,
	resetUserLimitError: false,
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

		case GET_USER_BONUS:
			return {
				...state,
				userBonusLoading: true,
			};

		case GET_USER_BONUS_SUCCESS:
			return {
				...state,
				userBonusLoading: false,
				userBonus: payload,
				userBonusError: null,
			};

		case GET_USER_BONUS_FAIL:
			return {
				...state,
				userBonusError: payload,
				userBonusLoading: true,
			};

		case GET_USER_COMMENTS:
			return {
				...state,
				userCommentsLoading: true,
			};

		case GET_USER_COMMENTS_SUCCESS:
			return {
				...state,
				userCommentsLoading: false,
				userComments: payload,
				userCommentsError: null,
			};

		case GET_USER_COMMENTS_FAIL:
			return {
				...state,
				userCommentsError: payload,
				userCommentsLoading: true,
			};

		case CREATE_USER_COMMENT:
			return {
				...state,
				createUserCommentsLoading: true,
			};

		case CREATE_USER_COMMENT_SUCCESS:
			return {
				...state,
				createUserCommentsLoading: false,
				createUserCommentsSuccess: true,
				createUserCommentsError: null,
			};

		case CREATE_USER_COMMENT_FAIL:
			return {
				...state,
				createUserCommentsError: payload,
				createUserCommentsLoading: true,
				createUserCommentsSuccess: false,
			};

		case RESET_USER_LIMIT:
			return {
				...state,
				resetUserLimitLoading: true,
			};

		case RESET_USER_LIMIT_SUCCESS:
			return {
				...state,
				resetUserLimitLoading: false,
				resetUserLimitSuccess: true,
				resetUserLimitError: null,
			};

		case RESET_USER_LIMIT_FAIL:
			return {
				...state,
				resetUserLimitError: payload,
				resetUserLimitLoading: true,
				resetUserLimitSuccess: false,
			};

		case RESET_USER_LIMIT_DATA:
			return {
				...state,
				resetUserLimitSuccess: false,
				resetUserLimitLoading: false,
				resetUserLimitError: false,
			};
		default:
			return { ...state };
	}
};

export default UserDetails;
