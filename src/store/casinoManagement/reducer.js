import {
	GET_CASINO_PROVIDERS_DATA,
	GET_CASINO_PROVIDERS_DATA_SUCCESS,
	GET_CASINO_PROVIDERS_DATA_FAIL,
	GET_CASINO_CATEGORY_DATA,
	GET_CASINO_CATEGORY_DATA_SUCCESS,
	GET_CASINO_CATEGORY_DATA_FAIL,
	GET_CASINO_SUB_CATEGORY_DATA_SUCCESS,
	GET_CASINO_SUB_CATEGORY_DATA_FAIL,
	GET_CASINO_SUB_CATEGORY_DATA,
	GET_CASINO_GAMES,
	GET_CASINO_GAMES_SUCCESS,
	GET_CASINO_GAMES_FAIL,
	GET_LANGUAGE_DATA_START,
	GET_LANGUAGE_DATA_FAIL,
	GET_LANGUAGE_DATA_SUCCESS,
	CREATE_CASINO_PROVIDERS,
	CREATE_CASINO_PROVIDERS_SUCCESS,
	CREATE_CASINO_PROVIDERS_FAIL,
} from './actionTypes';

const INIT_STATE = {
	casinoProvidersData: null,
	casinoProvidersDataError: null,
	isCasinoProvidersDataLoading: true,
	casinoCategoryDetails: null,
	casinoCategoryDetailsError: null,
	iscasinoCategoryDetailsLoading: true,
	casinoSubCategoryDetails: null,
	casinoSubCategoryDetailsError: null,
	iscasinoSubCategoryDetailsLoading: true,
	casinoGames: null,
	casinoGamesError: null,
	isCasinoGamesLoading: true,
	languageDataLoading: true,
	languageData: null,
	languageDataError: null,
	isCreateProviderError: false,
	isCreateProviderSuccess: false,
	isCreateProviderLoading: false,
};

const CasinoManagementData = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_CASINO_PROVIDERS_DATA:
			return {
				...state,
				isCasinoProvidersDataLoading: false,
			};

		case GET_CASINO_PROVIDERS_DATA_SUCCESS:
			return {
				...state,
				isCasinoProvidersDataLoading: true,
				casinoProvidersData: payload,
				casinoProvidersDataError: null,
			};

		case GET_CASINO_PROVIDERS_DATA_FAIL:
			return {
				...state,
				casinoProvidersDataError: payload,
				isCasinoProvidersDataLoading: true,
			};

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

		case GET_CASINO_GAMES:
			return {
				...state,
				isCasinoGamesLoading: false,
			};

		case GET_CASINO_GAMES_SUCCESS:
			return {
				...state,
				isCasinoGamesLoading: true,
				casinoGames: payload,
				casinoGamesError: null,
			};

		case GET_CASINO_GAMES_FAIL:
			return {
				...state,
				casinoGamesError: payload,
				isCasinoGamesLoading: true,
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

		case CREATE_CASINO_PROVIDERS:
			return {
				...state,
				isCreateProviderLoading: true,
				isCreateProviderSuccess: false,
			};

		case CREATE_CASINO_PROVIDERS_SUCCESS:
			return {
				...state,
				isCreateProviderLoading: false,
				isCreateProviderSuccess: true,
			};

		case CREATE_CASINO_PROVIDERS_FAIL:
			return {
				...state,
				isCreateProviderError: payload,
				isCreateProviderLoading: false,
				isCreateProviderSuccess: false,
			};
		default:
			return state;
	}
};

export default CasinoManagementData;
