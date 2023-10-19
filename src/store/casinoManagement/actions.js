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
	GET_LANGUAGE_DATA_SUCCESS,
	GET_LANGUAGE_DATA_FAIL,
	GET_LANGUAGE_DATA_START,
	CREATE_CASINO_PROVIDERS,
	CREATE_CASINO_PROVIDERS_FAIL,
	CREATE_CASINO_PROVIDERS_SUCCESS,
	CREATE_CASINO_CATEGORY_SUCCESS,
	CREATE_CASINO_CATEGORY_FAIL,
	CREATE_CASINO_CATEGORY_START,
	CREATE_CASINO_SUBCATEGORY_FAIL,
	CREATE_CASINO_SUBCATEGORY_SUCCESS,
	CREATE_CASINO_SUBCATEGORY_START,
	UPDATE_CASINO_STATUS_START,
	UPDATE_CASINO_STATUS_SUCCESS,
	UPDATE_CASINO_STATUS_FAIL,
	UPDATE_SA_CASINO_GAMES_STATUS_FAIL,
	UPDATE_SA_CASINO_GAMES_STATUS_START,
	UPDATE_SA_CASINO_GAMES_STATUS_SUCCESS,
} from './actionTypes';

export const getCasinoProvidersDataSuccess = (payload) => ({
	type: GET_CASINO_PROVIDERS_DATA_SUCCESS,
	payload,
});

export const getCasinoProvidersDataFailure = (payload) => ({
	type: GET_CASINO_PROVIDERS_DATA_FAIL,
	payload,
});

export const getCasinoProvidersDataStart = (payload) => ({
	type: GET_CASINO_PROVIDERS_DATA,
	payload,
});

export const getCasinoCategoryDetailSuccess = (payload) => ({
	type: GET_CASINO_CATEGORY_DATA_SUCCESS,
	payload,
});

export const getCasinoCategoryDetailFailure = (payload) => ({
	type: GET_CASINO_CATEGORY_DATA_FAIL,
	payload,
});

export const getCasinoCategoryDetailStart = (payload) => ({
	type: GET_CASINO_CATEGORY_DATA,
	payload,
});

export const getCasinoSubCategoryDetailSuccess = (payload) => ({
	type: GET_CASINO_SUB_CATEGORY_DATA_SUCCESS,
	payload,
});

export const getCasinoSubCategoryDetailFailure = (payload) => ({
	type: GET_CASINO_SUB_CATEGORY_DATA_FAIL,
	payload,
});

export const getCasinoSubCategoryDetailStart = (payload) => ({
	type: GET_CASINO_SUB_CATEGORY_DATA,
	payload,
});

export const getCasinoGamesSuccess = (payload) => ({
	type: GET_CASINO_GAMES_SUCCESS,
	payload,
});

export const getCasinoGamesFailure = (payload) => ({
	type: GET_CASINO_GAMES_FAIL,
	payload,
});

export const getCasinoGamesStart = (payload) => ({
	type: GET_CASINO_GAMES,
	payload,
});

export const getLanguagesSuccess = (payload) => ({
	type: GET_LANGUAGE_DATA_SUCCESS,
	payload,
});

export const getLanguagesFailure = (payload) => ({
	type: GET_LANGUAGE_DATA_FAIL,
	payload,
});

export const getLanguagesStart = (payload) => ({
	type: GET_LANGUAGE_DATA_START,
	payload,
});

export const createCasinoProvidersSuccess = (payload) => ({
	type: CREATE_CASINO_PROVIDERS_SUCCESS,
	payload,
});

export const createCasinoProvidersFailure = (payload) => ({
	type: CREATE_CASINO_PROVIDERS_FAIL,
	payload,
});

export const createCasinoProvidersStart = (payload) => ({
	type: CREATE_CASINO_PROVIDERS,
	payload,
});

export const createCasinoCategorySuccess = (payload) => ({
	type: CREATE_CASINO_CATEGORY_SUCCESS,
	payload,
});

export const createCasinoCategoryFailure = (payload) => ({
	type: CREATE_CASINO_CATEGORY_FAIL,
	payload,
});

export const createCasinoCategoryStart = (payload) => ({
	type: CREATE_CASINO_CATEGORY_START,
	payload,
});

export const createCasinoSubCategorySuccess = (payload) => ({
	type: CREATE_CASINO_SUBCATEGORY_SUCCESS,
	payload,
});

export const createCasinoSubCategoryFailure = (payload) => ({
	type: CREATE_CASINO_SUBCATEGORY_FAIL,
	payload,
});

export const createCasinoSubCategoryStart = (payload) => ({
	type: CREATE_CASINO_SUBCATEGORY_START,
	payload,
});

export const updateCasinoStatusSuccess = (payload) => ({
	type: UPDATE_CASINO_STATUS_SUCCESS,
	payload,
});

export const updateCasinoStatusFail = (payload) => ({
	type: UPDATE_CASINO_STATUS_FAIL,
	payload,
});

export const updateCasinoStatusStart = (payload) => ({
	type: UPDATE_CASINO_STATUS_START,
	payload,
});

export const updateSACasinoGamesStatusSuccess = (payload) => ({
	type: UPDATE_SA_CASINO_GAMES_STATUS_SUCCESS,
	payload,
});

export const updateSACasinoGamesStatusFail = (payload) => ({
	type: UPDATE_SA_CASINO_GAMES_STATUS_FAIL,
	payload,
});

export const updateSACasinoGamesStatusStart = (payload) => ({
	type: UPDATE_SA_CASINO_GAMES_STATUS_START,
	payload,
});
