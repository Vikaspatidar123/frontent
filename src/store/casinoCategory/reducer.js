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
	getCasinoCategoryDetails: [],
	getCasinoSubCategoryDetails: [],
	error: null,
	loading: true,
	getLanguageDataLoading: false,
	getLanguageData: {},
};

const getCasinoCategory = (state = INIT_STATE, { type, payload }) => {
	switch (type) {
		case GET_CASINO_CATEGORY_DATA:
			return {
				...state,
				loading: false,
			};

		case GET_CASINO_CATEGORY_DATA_SUCCESS:
			return {
				...state,
				loading: true,
				getCasinoCategoryDetails: payload,
				error: null,
			};

		case GET_CASINO_CATEGORY_DATA_FAIL:
			return {
				...state,
				error: payload,
				loading: true,
			};

		case GET_CASINO_SUB_CATEGORY_DATA:
			return {
				...state,
				loading: false,
			};

		case GET_CASINO_SUB_CATEGORY_DATA_SUCCESS:
			return {
				...state,
				loading: true,
				getCasinoSubCategoryDetails: payload,
				error: null,
			};

		case GET_CASINO_SUB_CATEGORY_DATA_FAIL:
			return {
				...state,
				error: payload,
				loading: true,
			};

		case GET_LANGUAGE_DATA_START:
			return {
				...state,
				getLanguageDataLoading: false,
			};

		case GET_LANGUAGE_DATA_SUCCESS:
			return {
				...state,
				getLanguageDataLoading: true,
				getLanguageData: payload,
				error: null,
			};

		case GET_LANGUAGE_DATA_FAIL:
			return {
				...state,
				error: payload,
				getLanguageDataLoading: true,
			};

		default:
			return state;
	}
};

export default getCasinoCategory;
