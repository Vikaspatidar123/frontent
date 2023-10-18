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
} from './actionTypes';

const initialState = {
	SABanners: null,
	SABannersError: null,
	SABannersloading: false,
	documentLabels: null,
	documentLabelsError: null,
	documentLabelsLoading: false,
	isCreateSABannersError: false,
	isCreateSABannersSuccess: false,
	isCreateSABannersLoading: false,
	isCreateKYCLabelsError: false,
	isCreateKYCLabelsSuccess: false,
	isCreateKYCLabelsLoading: false,
};

const SASettings = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case GET_SA_BANNERS:
			return {
				...state,
				SABannersloading: true,
			};

		case GET_SA_BANNERS_SUCCESS:
			return {
				...state,
				SABannersloading: false,
				SABanners: payload,
				SABannersError: null,
			};

		case GET_SA_BANNERS_FAIL:
			return {
				...state,
				SABannersloading: false,
				SABannersError: true,
			};

		case GET_DOCUMENT_LABEL:
			return {
				...state,
				documentLabelsLoading: true,
			};

		case GET_DOCUMENT_LABEL_SUCCESS:
			return {
				...state,
				documentLabelsLoading: false,
				documentLabels: payload,
				documentLabelsError: null,
			};

		case GET_DOCUMENT_LABEL_FAIL:
			return {
				...state,
				documentLabelsLoading: false,
				documentLabelsError: true,
			};
		case CREATE_SA_BANNERS_START:
			return {
				...state,
				isCreateSABannersLoading: true,
				isCreateSABannersSuccess: false,
			};

		case CREATE_SA_BANNERS_SUCCESS:
			return {
				...state,
				isCreateSABannersLoading: false,
				isCreateSABannersSuccess: true,
			};

		case CREATE_SA_BANNERS_FAIL:
			return {
				...state,
				isCreateSABannersError: payload,
				isCreateSABannersLoading: false,
				isCreateSABannersSuccess: false,
			};

		case CREATE_KYC_LABELS_START:
			return {
				...state,
				isCreateKYCLabelsLoading: true,
				isCreateKYCLabelsSuccess: false,
			};

		case CREATE_KYC_LABELS_SUCCESS:
			return {
				...state,
				isCreateKYCLabelsLoading: false,
				isCreateKYCLabelsSuccess: true,
			};

		case CREATE_KYC_LABELS_FAIL:
			return {
				...state,
				isCreateKYCLabelsError: payload,
				isCreateKYCLabelsLoading: false,
				isCreateKYCLabelsSuccess: false,
			};

		default:
			return { ...state };
	}
};

export default SASettings;
