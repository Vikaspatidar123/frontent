import {
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
