import {
	ACCEPT_USER_DOC,
	ACCEPT_USER_DOC_FAIL,
	ACCEPT_USER_DOC_SUCCESS,
	CANCEL_USER_BONUS,
	CANCEL_USER_BONUS_FAIL,
	CANCEL_USER_BONUS_SUCCESS,
	CREATE_USER_COMMENT,
	CREATE_USER_COMMENT_FAIL,
	CREATE_USER_COMMENT_SUCCESS,
	DEPOSIT_TO_OTHER,
	DEPOSIT_TO_OTHER_FAIL,
	DEPOSIT_TO_OTHER_SUCCESS,
	DISABLE_USER,
	DISABLE_USER_FAIL,
	DISABLE_USER_SUCCESS,
	GET_ALL_BONUS,
	GET_ALL_BONUS_FAIL,
	GET_ALL_BONUS_SUCCESS,
	GET_BONUS_DETAILS,
	GET_BONUS_DETAILS_FAIL,
	GET_BONUS_DETAILS_RESET,
	GET_BONUS_DETAILS_SUCCESS,
	GET_DUPLICATE_USERS,
	GET_DUPLICATE_USERS_FAIL,
	GET_DUPLICATE_USERS_SUCCESS,
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
	ISSUE_BONUS,
	ISSUE_BONUS_FAIL,
	ISSUE_BONUS_SUCCESS,
	MARK_DOCUMENT_REQUIRED,
	MARK_DOCUMENT_REQUIRED_FAIL,
	MARK_DOCUMENT_REQUIRED_RESET,
	MARK_DOCUMENT_REQUIRED_SUCCESS,
	MARK_USER_AS_INTERNAL,
	MARK_USER_AS_INTERNAL_FAIL,
	MARK_USER_AS_INTERNAL_SUCCESS,
	RESET_USER_DETAILS,
	RESET_USER_LIMIT,
	RESET_USER_LIMIT_DATA,
	RESET_USER_LIMIT_FAIL,
	RESET_USER_LIMIT_SUCCESS,
	RESOLVE_USER_COMMENT,
	RESOLVE_USER_COMMENT_FAIL,
	RESOLVE_USER_COMMENT_SUCCESS,
	SEND_PASSWORD_RESET,
	SEND_PASSWORD_RESET_FAIL,
	SEND_PASSWORD_RESET_SUCCESS,
	UPDATE_SA_USER_STATUS,
	UPDATE_SA_USER_STATUS_FAIL,
	UPDATE_SA_USER_STATUS_SUCCESS,
	UPDATE_USER_INFO,
	UPDATE_USER_INFO_FAIL,
	UPDATE_USER_INFO_SUCCESS,
	UPDATE_USER_PASSWORD,
	UPDATE_USER_PASSWORD_FAIL,
	UPDATE_USER_PASSWORD_SUCCESS,
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
	getDuplicateUsersLoading: false,
	duplicateUsers: false,
	getDuplicateUsersError: false,
	getAllBonusLoading: false,
	bonusList: [],
	getAllBonusError: false,
	getBonusDetailsLoading: false,
	bonusDetails: null,
	getBonusDetailsError: false,
	issueBonusLoading: false,
	issueBonusSuccess: false,
	issueBonusError: false,
	depositToOtherLoading: false,
	depositToOtherSuccess: false,
	depositToOtherError: false,
	updateUserInfoLoading: false,
	updateUserInfoSuccess: false,
	updateUserInfoError: false,
	sendPasswordResetError: false,
	sendPasswordResetLoading: false,
	sendPasswordResetSuccess: false,
	updateUserPasswordLoading: false,
	updateUserPasswordSuccess: false,
	updateUserPasswordError: false,
	markDocumentRequiredLoading: false,
	markDocumentRequiredSuccess: false,
	markDocumentRequiredError: false,
	cancelUserBonusLoading: false,
	cancelUserBonusSuccess: false,
	cancelUserBonusError: false,
	resolveUserCommentError: false,
	resolveUserCommentLoading: false,
	resolveUserCommentSuccess: false,
	acceptUserDocError: false,
	acceptUserDocLoading: false,
	acceptUserDocSuccess: false,
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

		case RESET_USER_DETAILS:
			return INIT_STATE;

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
				updateUserTagsLoading: false,
				updateUserTagsSuccess: false,
				updateUserTagsError: false,
				updateSAUserStatusSuccess: false,
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

		case GET_DUPLICATE_USERS:
			return {
				...state,
				getDuplicateUsersLoading: true,
			};

		case GET_DUPLICATE_USERS_SUCCESS:
			return {
				...state,
				getDuplicateUsersLoading: false,
				duplicateUsers: payload,
				getDuplicateUsersError: null,
			};

		case GET_DUPLICATE_USERS_FAIL:
			return {
				...state,
				getDuplicateUsersError: payload,
				getDuplicateUsersLoading: false,
				duplicateUsers: false,
			};

		case GET_ALL_BONUS:
			return {
				...state,
				getAllBonusLoading: true,
			};

		case GET_ALL_BONUS_SUCCESS:
			return {
				...state,
				getAllBonusLoading: false,
				bonusList: payload,
				getAllBonusError: null,
			};

		case GET_ALL_BONUS_FAIL:
			return {
				...state,
				getAllBonusError: payload,
				getAllBonusLoading: false,
				bonusList: false,
			};

		case GET_BONUS_DETAILS:
			return {
				...state,
				getBonusDetailsLoading: true,
			};

		case GET_BONUS_DETAILS_SUCCESS:
			return {
				...state,
				getBonusDetailsLoading: false,
				bonusDetails: payload,
				getBonusDetailsError: null,
			};

		case GET_BONUS_DETAILS_RESET:
			return {
				...state,
				getBonusDetailsLoading: false,
				bonusDetails: null,
				getBonusDetailsError: false,
			};

		case GET_BONUS_DETAILS_FAIL:
			return {
				...state,
				getBonusDetailsError: payload,
				getBonusDetailsLoading: false,
				bonusDetails: false,
			};

		case ISSUE_BONUS:
			return {
				...state,
				issueBonusLoading: true,
			};

		case ISSUE_BONUS_SUCCESS:
			return {
				...state,
				issueBonusLoading: false,
				issueBonusSuccess: payload,
				issueBonusError: null,
			};

		case ISSUE_BONUS_FAIL:
			return {
				...state,
				issueBonusError: payload,
				issueBonusLoading: false,
				issueBonusSuccess: false,
			};

		case DEPOSIT_TO_OTHER:
			return {
				...state,
				depositToOtherLoading: true,
			};

		case DEPOSIT_TO_OTHER_SUCCESS:
			return {
				...state,
				depositToOtherLoading: false,
				depositToOtherSuccess: payload,
				depositToOtherError: null,
			};

		case DEPOSIT_TO_OTHER_FAIL:
			return {
				...state,
				depositToOtherError: payload,
				depositToOtherLoading: false,
				depositToOtherSuccess: false,
			};

		case UPDATE_USER_INFO:
			return {
				...state,
				updateUserInfoLoading: true,
			};

		case UPDATE_USER_INFO_SUCCESS:
			return {
				...state,
				updateUserInfoLoading: false,
				updateUserInfoSuccess: payload,
				updateUserInfoError: null,
			};

		case UPDATE_USER_INFO_FAIL:
			return {
				...state,
				updateUserInfoError: payload,
				updateUserInfoLoading: false,
				updateUserInfoSuccess: false,
			};

		case SEND_PASSWORD_RESET:
			return {
				...state,
				sendPasswordResetLoading: true,
			};

		case SEND_PASSWORD_RESET_SUCCESS:
			return {
				...state,
				sendPasswordResetLoading: false,
				sendPasswordResetSuccess: payload,
				sendPasswordResetError: null,
			};

		case SEND_PASSWORD_RESET_FAIL:
			return {
				...state,
				sendPasswordResetError: payload,
				sendPasswordResetLoading: false,
				sendPasswordResetSuccess: false,
			};

		case UPDATE_USER_PASSWORD:
			return {
				...state,
				updateUserPasswordLoading: true,
			};

		case UPDATE_USER_PASSWORD_SUCCESS:
			return {
				...state,
				updateUserPasswordLoading: false,
				updateUserPasswordSuccess: payload,
				updateUserPasswordError: null,
			};

		case UPDATE_USER_PASSWORD_FAIL:
			return {
				...state,
				updateUserPasswordError: payload,
				updateUserPasswordLoading: false,
				updateUserPasswordSuccess: false,
			};

		case MARK_DOCUMENT_REQUIRED:
			return {
				...state,
				markDocumentRequiredLoading: true,
			};

		case MARK_DOCUMENT_REQUIRED_SUCCESS:
			return {
				...state,
				markDocumentRequiredLoading: false,
				markDocumentRequiredSuccess: payload,
				markDocumentRequiredError: null,
			};

		case MARK_DOCUMENT_REQUIRED_FAIL:
			return {
				...state,
				markDocumentRequiredError: payload,
				markDocumentRequiredLoading: false,
				markDocumentRequiredSuccess: false,
			};

		case MARK_DOCUMENT_REQUIRED_RESET:
			return {
				...state,
				markDocumentRequiredError: false,
				markDocumentRequiredLoading: false,
				markDocumentRequiredSuccess: false,
			};

		case CANCEL_USER_BONUS_SUCCESS:
			return {
				...state,
				cancelUserBonusLoading: false,
				cancelUserBonusSuccess: payload,
				cancelUserBonusError: null,
			};

		case CANCEL_USER_BONUS_FAIL:
			return {
				...state,
				cancelUserBonusError: payload,
				cancelUserBonusLoading: false,
				cancelUserBonusSuccess: false,
			};

		case CANCEL_USER_BONUS:
			return {
				...state,
				cancelUserBonusLoading: true,
			};

		case RESOLVE_USER_COMMENT_SUCCESS:
			return {
				...state,
				resolveUserCommentLoading: false,
				resolveUserCommentSuccess: payload,
				resolveUserCommentError: null,
			};

		case RESOLVE_USER_COMMENT_FAIL:
			return {
				...state,
				resolveUserCommentError: payload,
				resolveUserCommentLoading: false,
				resolveUserCommentSuccess: false,
			};

		case RESOLVE_USER_COMMENT:
			return {
				...state,
				resolveUserCommentLoading: true,
			};

		case ACCEPT_USER_DOC_SUCCESS:
			return {
				...state,
				acceptUserDocLoading: false,
				acceptUserDocSuccess: true,
				acceptUserDocError: null,
			};

		case ACCEPT_USER_DOC_FAIL:
			return {
				...state,
				acceptUserDocError: payload,
				acceptUserDocLoading: false,
				acceptUserDocSuccess: false,
			};

		case ACCEPT_USER_DOC:
			return {
				...state,
				acceptUserDocLoading: true,
			};
		default:
			return { ...state };
	}
};

export default UserDetails;
