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
	EDIT_CASINO_CATEGORY_SUCCESS,
	EDIT_CASINO_CATEGORY_FAIL,
	EDIT_CASINO_CATEGORY,
	EDIT_CASINO_PROVIDERS_SUCCESS,
	EDIT_CASINO_PROVIDERS_FAIL,
	EDIT_CASINO_PROVIDERS,
	EDIT_CASINO_SUBCATEGORY_SUCCESS,
	EDIT_CASINO_SUBCATEGORY_FAIL,
	EDIT_CASINO_SUBCATEGORY_START,
	EDIT_CASINO_GAMES_SUCCESS,
	EDIT_CASINO_GAMES_FAIL,
	EDIT_CASINO_GAMES_START,
	UPDATE_GAME_ISFEATURED_START,
	UPDATE_GAME_ISFEATURED_SUCCESS,
	UPDATE_GAME_ISFEATURED_FAIL,
	ADD_GAME_TO_CASINO_SUB_CATEGORY_START,
	ADD_GAME_TO_CASINO_SUB_CATEGORY_SUCCESS,
	ADD_GAME_TO_CASINO_SUB_CATEGORY_FAIL,
	DELETE_CASINO_SUB_CATEGORY_START,
	DELETE_CASINO_SUB_CATEGORY_SUCCESS,
	DELETE_CASINO_SUB_CATEGORY_FAIL,
	DELETE_CASINO_GAMES_START,
	DELETE_CASINO_GAMES_SUCCESS,
	DELETE_CASINO_GAMES_FAIL,
	REORDER_CASINO_CATEGORY_START,
	REORDER_CASINO_CATEGORY_SUCCESS,
	REORDER_CASINO_CATEGORY_FAIL,
	REORDER_CASINO_SUB_CATEGORY_START,
	REORDER_CASINO_SUB_CATEGORY_SUCCESS,
	REORDER_CASINO_SUB_CATEGORY_FAIL,
	REORDER_CASINO_GAMES_START,
	REORDER_CASINO_GAMES_SUCCESS,
	REORDER_CASINO_GAMES_FAIL,
	RESET_CASINO_STATE,
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

export const editCasinoCategorySuccess = (payload) => ({
	type: EDIT_CASINO_CATEGORY_SUCCESS,
	payload,
});

export const editCasinoCategoryFailure = (payload) => ({
	type: EDIT_CASINO_CATEGORY_FAIL,
	payload,
});

export const editCasinoCategoryStart = (payload) => ({
	type: EDIT_CASINO_CATEGORY,
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

export const editCasinoProvidersSuccess = (payload) => ({
	type: EDIT_CASINO_PROVIDERS_SUCCESS,
	payload,
});

export const editCasinoProvidersFailure = (payload) => ({
	type: EDIT_CASINO_PROVIDERS_FAIL,
	payload,
});

export const editCasinoProvidersStart = (payload) => ({
	type: EDIT_CASINO_PROVIDERS,
	payload,
});

export const editCasinoSubCategorySuccess = (payload) => ({
	type: EDIT_CASINO_SUBCATEGORY_SUCCESS,
	payload,
});

export const editCasinoSubCategoryFailure = (payload) => ({
	type: EDIT_CASINO_SUBCATEGORY_FAIL,
	payload,
});

export const editCasinoSubCategoryStart = (payload) => ({
	type: EDIT_CASINO_SUBCATEGORY_START,
	payload,
});

export const editCasinoGamesSuccess = (payload) => ({
	type: EDIT_CASINO_GAMES_SUCCESS,
	payload,
});

export const editCasinoGamesFailure = (payload) => ({
	type: EDIT_CASINO_GAMES_FAIL,
	payload,
});

export const editCasinoGamesStart = (payload) => ({
	type: EDIT_CASINO_GAMES_START,
	payload,
});

export const updateCasinoIsFeaturedStart = (payload) => ({
	type: UPDATE_GAME_ISFEATURED_START,
	payload,
});
export const updateCasinoIsFeaturedSuccess = (payload) => ({
	type: UPDATE_GAME_ISFEATURED_SUCCESS,
	payload,
});

export const updateCasinoIsFeaturedFailure = (payload) => ({
	type: UPDATE_GAME_ISFEATURED_FAIL,
	payload,
});

export const addGameToSubCategoryStart = (payload) => ({
	type: ADD_GAME_TO_CASINO_SUB_CATEGORY_START,
	payload,
});
export const addGameToSubCategorySuccess = (payload) => ({
	type: ADD_GAME_TO_CASINO_SUB_CATEGORY_SUCCESS,
	payload,
});

export const addGameToSubCategoryFail = (payload) => ({
	type: ADD_GAME_TO_CASINO_SUB_CATEGORY_FAIL,
	payload,
});

export const deleteCasinoSubCategoryStart = (payload) => ({
	type: DELETE_CASINO_SUB_CATEGORY_START,
	payload,
});

export const deleteCasinoSubCategorySuccess = (payload) => ({
	type: DELETE_CASINO_SUB_CATEGORY_SUCCESS,
	payload,
});

export const deleteCasinoSubCategoryFail = (payload) => ({
	type: DELETE_CASINO_SUB_CATEGORY_FAIL,
	payload,
});

export const deleteCasinoGamesStart = (payload) => ({
	type: DELETE_CASINO_GAMES_START,
	payload,
});

export const deleteCasinoGamesSuccess = (payload) => ({
	type: DELETE_CASINO_GAMES_SUCCESS,
	payload,
});

export const deleteCasinoGamesFail = (payload) => ({
	type: DELETE_CASINO_GAMES_FAIL,
	payload,
});

export const reorderCasinoCategoryStart = (payload) => ({
	type: REORDER_CASINO_CATEGORY_START,
	payload,
});

export const reorderCasinoCategorySuccess = (payload) => ({
	type: REORDER_CASINO_CATEGORY_SUCCESS,
	payload,
});

export const reorderCasinoCategoryFail = (payload) => ({
	type: REORDER_CASINO_CATEGORY_FAIL,
	payload,
});

export const reorderCasinoSubCategoryStart = (payload) => ({
	type: REORDER_CASINO_SUB_CATEGORY_START,
	payload,
});

export const reorderCasinoSubCategorySuccess = (payload) => ({
	type: REORDER_CASINO_SUB_CATEGORY_SUCCESS,
	payload,
});

export const reorderCasinoSubCategoryFail = (payload) => ({
	type: REORDER_CASINO_SUB_CATEGORY_FAIL,
	payload,
});

export const reorderCasinoGamesStart = (payload) => ({
	type: REORDER_CASINO_GAMES_START,
	payload,
});

export const reorderCasinoGamesSuccess = (payload) => ({
	type: REORDER_CASINO_GAMES_SUCCESS,
	payload,
});

export const reorderCasinoGamesFail = (payload) => ({
	type: REORDER_CASINO_GAMES_FAIL,
	payload,
});

export const resetCasinoState = () => ({
	type: RESET_CASINO_STATE,
});
