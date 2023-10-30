import {
	CREATE_USER_COMMENT,
	CREATE_USER_COMMENT_FAIL,
	CREATE_USER_COMMENT_SUCCESS,
	DISABLE_USER,
	DISABLE_USER_FAIL,
	DISABLE_USER_SUCCESS,
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
	MARK_USER_AS_INTERNAL,
	MARK_USER_AS_INTERNAL_FAIL,
	MARK_USER_AS_INTERNAL_SUCCESS,
	RESET_USER_LIMIT,
	RESET_USER_LIMIT_DATA,
	RESET_USER_LIMIT_FAIL,
	RESET_USER_LIMIT_SUCCESS,
	UPDATE_SA_USER_STATUS,
	UPDATE_SA_USER_STATUS_FAIL,
	UPDATE_SA_USER_STATUS_SUCCESS,
	UPDATE_USER_TAGS,
	UPDATE_USER_TAGS_FAIL,
	UPDATE_USER_TAGS_SUCCESS,
	VERIFY_USER_EMAIL,
	VERIFY_USER_EMAIL_FAIL,
	VERIFY_USER_EMAIL_SUCCESS,
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
	disableUserSuccess: false,
	disableUserLoading: false,
	disableUserError: false,
	updateSAUserStatusSuccess: false,
	updateSAUserStatusLoading: false,
	updateSAUserStatusError: false,
	markUserAsInternalLoading: false,
	markUserAsInternalSuccess: false,
	markUserAsInternalError: false,
	verifyUserEmailLoading: false,
	verifyUserEmailSuccess: false,
	verifyUserEmailError: false,
	updateUserTagsLoading: false,
	updateUserTagsSuccess: false,
	updateUserTagsError: false,
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
				disableUserError: false,
				disableUserLoading: false,
				disableUserSuccess: false,
			};

		case DISABLE_USER:
			return {
				...state,
				disableUserLoading: true,
			};

		case DISABLE_USER_SUCCESS:
			return {
				...state,
				disableUserLoading: false,
				disableUserSuccess: true,
				disableUserError: null,
			};

		case DISABLE_USER_FAIL:
			return {
				...state,
				disableUserError: payload,
				disableUserLoading: true,
				disableUserSuccess: false,
			};

		case UPDATE_SA_USER_STATUS:
			return {
				...state,
				updateSAUserStatusLoading: true,
			};

		case UPDATE_SA_USER_STATUS_SUCCESS:
			return {
				...state,
				updateSAUserStatusLoading: false,
				updateSAUserStatusSuccess: true,
				updateSAUserStatusError: null,
			};

		case UPDATE_SA_USER_STATUS_FAIL:
			return {
				...state,
				updateSAUserStatusError: payload,
				updateSAUserStatusLoading: false,
				updateSAUserStatusSuccess: false,
			};

		case MARK_USER_AS_INTERNAL:
			return {
				...state,
				markUserAsInternalLoading: true,
			};

		case MARK_USER_AS_INTERNAL_SUCCESS:
			return {
				...state,
				markUserAsInternalLoading: false,
				markUserAsInternalSuccess: true,
				markUserAsInternalError: null,
			};

		case MARK_USER_AS_INTERNAL_FAIL:
			return {
				...state,
				markUserAsInternalError: payload,
				markUserAsInternalLoading: false,
				markUserAsInternalSuccess: false,
			};

		case VERIFY_USER_EMAIL:
			return {
				...state,
				verifyUserEmailLoading: true,
			};

		case VERIFY_USER_EMAIL_SUCCESS:
			return {
				...state,
				verifyUserEmailLoading: false,
				verifyUserEmailSuccess: true,
				verifyUserEmailError: null,
			};

		case VERIFY_USER_EMAIL_FAIL:
			return {
				...state,
				verifyUserEmailError: payload,
				verifyUserEmailLoading: false,
				verifyUserEmailSuccess: false,
			};

		case UPDATE_USER_TAGS:
			return {
				...state,
				updateUserTagsLoading: true,
			};

		case UPDATE_USER_TAGS_SUCCESS:
			return {
				...state,
				updateUserTagsLoading: false,
				updateUserTagsSuccess: true,
				updateUserTagsError: null,
			};

		case UPDATE_USER_TAGS_FAIL:
			return {
				...state,
				updateUserTagsError: payload,
				updateUserTagsLoading: false,
				updateUserTagsSuccess: false,
			};
		default:
			return { ...state };
	}
};

export default UserDetails;
