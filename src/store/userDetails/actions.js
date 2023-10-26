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
