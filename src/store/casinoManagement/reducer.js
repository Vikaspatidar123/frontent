import {
	GET_CASINO_CATEGORY_DATA,
	GET_CASINO_CATEGORY_DATA_SUCCESS,
	GET_CASINO_CATEGORY_DATA_FAIL,
	GET_CASINO_SUB_CATEGORY_DATA_SUCCESS,
	GET_CASINO_SUB_CATEGORY_DATA_FAIL,
	GET_CASINO_SUB_CATEGORY_DATA,
	GET_LANGUAGE_DATA_START,
	GET_LANGUAGE_DATA_FAIL,
	GET_LANGUAGE_DATA_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	casinoCategoryDetails: null,
	casinoCategoryDetailsError: null,
	iscasinoCategoryDetailsLoading: true,
	casinoSubCategoryDetails: null,
	casinoSubCategoryDetailsError: null,
	iscasinoSubCategoryDetailsLoading: true,
	languageDataLoading: true,
	languageData: null,
	languageDataError: null,
};

const CasinoManagementData = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_CASINO_CATEGORY_DATA:
			return {
				...state,
				iscasinoCategoryDetailsLoading: false,
			};

		case GET_CASINO_CATEGORY_DATA_SUCCESS:
			return {
				...state,
				iscasinoCategoryDetailsLoading: true,
				casinoCategoryDetails: payload,
				casinoCategoryDetailsError: null,
			};

		case GET_CASINO_CATEGORY_DATA_FAIL:
			return {
				...state,
				casinoCategoryDetailsError: payload,
				iscasinoCategoryDetailsLoading: true,
			};

		case GET_CASINO_SUB_CATEGORY_DATA:
			return {
				...state,
				iscasinoSubCategoryDetailsLoading: false,
			};

		case GET_CASINO_SUB_CATEGORY_DATA_SUCCESS:
			return {
				...state,
				iscasinoSubCategoryDetailsLoading: true,
				casinoSubCategoryDetails: payload,
				casinoSubCategoryDetailsError: null,
			};

		case GET_CASINO_SUB_CATEGORY_DATA_FAIL:
			return {
				...state,
				casinoSubCategoryDetailsError: payload,
				iscasinoSubCategoryDetailsLoading: true,
			};

		case GET_LANGUAGE_DATA_START:
			return {
				...state,
				languageDataLoading: false,
			};

		case GET_LANGUAGE_DATA_SUCCESS:
			return {
				...state,
				languageDataLoading: true,
				languageData: payload,
				languageDataError: null,
			};

		case GET_LANGUAGE_DATA_FAIL:
			return {
				...state,
				languageDataError: payload,
				languageDataLoading: true,
			};

		default:
			return state;
	}
};

export default CasinoManagementData;
