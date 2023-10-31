import {
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
	MARK_USER_AS_INTERNAL,
	MARK_USER_AS_INTERNAL_FAIL,
	MARK_USER_AS_INTERNAL_SUCCESS,
	RESET_USER_LIMIT,
	RESET_USER_LIMIT_DATA,
	RESET_USER_LIMIT_FAIL,
	RESET_USER_LIMIT_SUCCESS,
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

export const getUserDetailsSuccess = (payload) => ({
	type: GET_USER_DETAILS_SUCCESS,
	payload,
});

export const getUserDetailsFail = (payload) => ({
	type: GET_USER_DETAILS_FAIL,
	payload,
});

export const getUserDetails = (payload) => ({
	type: GET_USER_DETAILS,
	payload,
});

export const getUserDocumentsSuccess = (payload) => ({
	type: GET_USER_DOCUMENTS_SUCCESS,
	payload,
});

export const getUserDocumentsFail = (payload) => ({
	type: GET_USER_DOCUMENTS_FAIL,
	payload,
});

export const getUserDocuments = (payload) => ({
	type: GET_USER_DOCUMENTS,
	payload,
});

export const getUserBonusSuccess = (payload) => ({
	type: GET_USER_BONUS_SUCCESS,
	payload,
});

export const getUserBonusFail = (payload) => ({
	type: GET_USER_BONUS_FAIL,
	payload,
});

export const getUserBonus = (payload) => ({
	type: GET_USER_BONUS,
	payload,
});

export const getUserCommentsSuccess = (payload) => ({
	type: GET_USER_COMMENTS_SUCCESS,
	payload,
});

export const getUserCommentsFail = (payload) => ({
	type: GET_USER_COMMENTS_FAIL,
	payload,
});

export const getUserComments = (payload) => ({
	type: GET_USER_COMMENTS,
	payload,
});

export const createUserCommentSuccess = (payload) => ({
	type: CREATE_USER_COMMENT_SUCCESS,
	payload,
});

export const createUserCommentFail = (payload) => ({
	type: CREATE_USER_COMMENT_FAIL,
	payload,
});

export const createUserComment = (payload) => ({
	type: CREATE_USER_COMMENT,
	payload,
});

export const resetUserLimitSuccess = (payload) => ({
	type: RESET_USER_LIMIT_SUCCESS,
	payload,
});

export const resetUserLimitFail = (payload) => ({
	type: RESET_USER_LIMIT_FAIL,
	payload,
});

export const resetUserLimit = (payload) => ({
	type: RESET_USER_LIMIT,
	payload,
});

export const resetUserLimitData = (payload) => ({
	type: RESET_USER_LIMIT_DATA,
	payload,
});

export const disabledUserSuccess = (payload) => ({
	type: DISABLE_USER_SUCCESS,
	payload,
});

export const disableUserFail = (payload) => ({
	type: DISABLE_USER_FAIL,
	payload,
});

export const disableUser = (payload) => ({
	type: DISABLE_USER,
	payload,
});

export const updateSAUserStatusSuccess = (payload) => ({
	type: UPDATE_SA_USER_STATUS_SUCCESS,
	payload,
});

export const updateSAUserStatusFail = (payload) => ({
	type: UPDATE_SA_USER_STATUS_FAIL,
	payload,
});

export const updateSAUserStatus = (payload) => ({
	type: UPDATE_SA_USER_STATUS,
	payload,
});

export const markUserAsInternalSuccess = (payload) => ({
	type: MARK_USER_AS_INTERNAL_SUCCESS,
	payload,
});

export const markUserAsInternalFail = (payload) => ({
	type: MARK_USER_AS_INTERNAL_FAIL,
	payload,
});

export const markUserAsInternal = (payload) => ({
	type: MARK_USER_AS_INTERNAL,
	payload,
});

export const verifyUserEmailSuccess = (payload) => ({
	type: VERIFY_USER_EMAIL_SUCCESS,
	payload,
});

export const verifyUserEmailFail = (payload) => ({
	type: VERIFY_USER_EMAIL_FAIL,
	payload,
});

export const verifyUserEmail = (payload) => ({
	type: VERIFY_USER_EMAIL,
	payload,
});

export const updateUserTagsSuccess = (payload) => ({
	type: UPDATE_USER_TAGS_SUCCESS,
	payload,
});

export const updateUserTagsFail = (payload) => ({
	type: UPDATE_USER_TAGS_FAIL,
	payload,
});

export const updateUserTags = (payload) => ({
	type: UPDATE_USER_TAGS,
	payload,
});

export const getDuplicateUsersSuccess = (payload) => ({
	type: GET_DUPLICATE_USERS_SUCCESS,
	payload,
});

export const getDuplicateUsersFail = (payload) => ({
	type: GET_DUPLICATE_USERS_FAIL,
	payload,
});

export const getDuplicateUsers = (payload) => ({
	type: GET_DUPLICATE_USERS,
	payload,
});

export const getAllBonusSuccess = (payload) => ({
	type: GET_ALL_BONUS_SUCCESS,
	payload,
});

export const getAllBonusFail = (payload) => ({
	type: GET_ALL_BONUS_FAIL,
	payload,
});

export const getAllBonus = (payload) => ({
	type: GET_ALL_BONUS,
	payload,
});

export const getUserBonusDetailsSuccess = (payload) => ({
	type: GET_BONUS_DETAILS_SUCCESS,
	payload,
});

export const getUserBonusDetailsFail = (payload) => ({
	type: GET_BONUS_DETAILS_FAIL,
	payload,
});

export const getUserBonusDetails = (payload) => ({
	type: GET_BONUS_DETAILS,
	payload,
});

export const issueBonusSuccess = (payload) => ({
	type: ISSUE_BONUS_SUCCESS,
	payload,
});

export const issueBonusFail = (payload) => ({
	type: ISSUE_BONUS_FAIL,
	payload,
});

export const issueBonus = (payload) => ({
	type: ISSUE_BONUS,
	payload,
});

export const depositToOtherSuccess = (payload) => ({
	type: DEPOSIT_TO_OTHER_SUCCESS,
	payload,
});

export const depositToOtherFail = (payload) => ({
	type: DEPOSIT_TO_OTHER_FAIL,
	payload,
});

export const depositToOther = (payload) => ({
	type: DEPOSIT_TO_OTHER,
	payload,
});

export const updateUserInfoSuccess = (payload) => ({
	type: UPDATE_USER_INFO_SUCCESS,
	payload,
});

export const updateUserInfoFail = (payload) => ({
	type: UPDATE_USER_INFO_FAIL,
	payload,
});

export const updateUserInfo = (payload) => ({
	type: UPDATE_USER_INFO,
	payload,
});

export const updateUserPasswordSuccess = (payload) => ({
	type: UPDATE_USER_PASSWORD_SUCCESS,
	payload,
});

export const updateUserPasswordFail = (payload) => ({
	type: UPDATE_USER_PASSWORD_FAIL,
	payload,
});

export const updateUserPassword = (payload) => ({
	type: UPDATE_USER_PASSWORD,
	payload,
});

export const sendPasswordResetSuccess = (payload) => ({
	type: SEND_PASSWORD_RESET_SUCCESS,
	payload,
});

export const sendPasswordResetFail = (payload) => ({
	type: SEND_PASSWORD_RESET_FAIL,
	payload,
});

export const sendPasswordReset = (payload) => ({
	type: SEND_PASSWORD_RESET,
	payload,
});
