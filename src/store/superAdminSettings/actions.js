import {
	GET_SA_BANNERS,
	GET_SA_BANNERS_SUCCESS,
	GET_SA_BANNERS_FAIL,
	GET_DOCUMENT_LABEL,
	GET_DOCUMENT_LABEL_SUCCESS,
	GET_DOCUMENT_LABEL_FAIL,
	CREATE_SA_BANNERS_START,
	CREATE_SA_BANNERS_SUCCESS,
	CREATE_SA_BANNERS_FAIL,
	CREATE_KYC_LABELS_START,
	CREATE_KYC_LABELS_SUCCESS,
	CREATE_KYC_LABELS_FAIL,
	EDIT_KYC_LABELS_START,
	EDIT_KYC_LABELS_SUCCESS,
	EDIT_KYC_LABELS_FAIL,
} from './actionTypes';

export const getSABanners = (payload) => ({
	type: GET_SA_BANNERS,
	payload,
});

export const getSABannersSuccess = (payload) => ({
	type: GET_SA_BANNERS_SUCCESS,
	payload,
});

export const getSABannersFail = (payload) => ({
	type: GET_SA_BANNERS_FAIL,
	payload,
});

export const getDocumentLabel = (payload) => ({
	type: GET_DOCUMENT_LABEL,
	payload,
});

export const getDocumentLabelSuccess = (payload) => ({
	type: GET_DOCUMENT_LABEL_SUCCESS,
	payload,
});

export const getDocumentLabelFail = (payload) => ({
	type: GET_DOCUMENT_LABEL_FAIL,
	payload,
});

export const createSABannersStart = (payload) => ({
	type: CREATE_SA_BANNERS_START,
	payload,
});

export const createSABannersSuccess = (payload) => ({
	type: CREATE_SA_BANNERS_SUCCESS,
	payload,
});

export const createSABannersFail = (payload) => ({
	type: CREATE_SA_BANNERS_FAIL,
	payload,
});

export const createKYCLabelsStart = (payload) => ({
	type: CREATE_KYC_LABELS_START,
	payload,
});

export const createKYCLabelsSuccess = (payload) => ({
	type: CREATE_KYC_LABELS_SUCCESS,
	payload,
});

export const createKYCLabelsFail = (payload) => ({
	type: CREATE_KYC_LABELS_FAIL,
	payload,
});

export const editKYCLabelsStart = (payload) => ({
	type: EDIT_KYC_LABELS_START,
	payload,
});

export const editKYCLabelsSuccess = (payload) => ({
	type: EDIT_KYC_LABELS_SUCCESS,
	payload,
});

export const editKYCLabelsFail = (payload) => ({
	type: EDIT_KYC_LABELS_FAIL,
	payload,
});
