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
  CREATE_CASINO_CATEGORY_START,
  CREATE_CASINO_CATEGORY_SUCCESS,
  CREATE_CASINO_CATEGORY_FAIL,
  CREATE_CASINO_SUBCATEGORY_START,
  CREATE_CASINO_SUBCATEGORY_SUCCESS,
  CREATE_CASINO_SUBCATEGORY_FAIL,
  UPDATE_CASINO_STATUS_START,
  UPDATE_CASINO_STATUS_SUCCESS,
  UPDATE_CASINO_STATUS_FAIL,
  UPDATE_SA_CASINO_GAMES_STATUS_START,
  UPDATE_SA_CASINO_GAMES_STATUS_SUCCESS,
  UPDATE_SA_CASINO_GAMES_STATUS_FAIL,
  EDIT_CASINO_CATEGORY,
  EDIT_CASINO_CATEGORY_SUCCESS,
  EDIT_CASINO_CATEGORY_FAIL,
  EDIT_CASINO_PROVIDERS,
  EDIT_CASINO_PROVIDERS_SUCCESS,
  EDIT_CASINO_PROVIDERS_FAIL,
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
  isEditProviderSuccess: false,
  isEditProviderLoading: false,
  isEditProviderError: false,
  isCreateCategoryError: false,
  isCreateCategorySuccess: false,
  isCreateCategoryLoading: false,
  isEditCategoryError: false,
  isEditCategorySuccess: false,
  isEditCategoryLoading: false,
  isCreateSubCategoryError: false,
  isCreateSubCategorySuccess: false,
  isCreateSubCategoryLoading: false,
  isUpdateCasinoStatus: false,
  isUpdateCasinoStatusError: null,
  isUpdateCasinoStatusLoading: false,
  isUpdateSACasinoGamesStatus: false,
  isUpdateSACasinoGamesStatusError: null,
  isUpdateSACasinoGamesStatusLoading: false,
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

    case EDIT_CASINO_PROVIDERS:
      return {
        ...state,
        isEditProviderLoading: true,
        isEditProviderSuccess: false,
      };

    case EDIT_CASINO_PROVIDERS_SUCCESS:
      return {
        ...state,
        isEditProviderLoading: false,
        isEditProviderSuccess: true,
      };

    case EDIT_CASINO_PROVIDERS_FAIL:
      return {
        ...state,
        isEditProviderError: payload,
        isEditProviderLoading: false,
        isEditProviderSuccess: false,
      };

    case CREATE_CASINO_CATEGORY_START:
      return {
        ...state,
        isCreateCategoryLoading: true,
        isCreateCategorySuccess: false,
      };

    case CREATE_CASINO_CATEGORY_SUCCESS:
      return {
        ...state,
        isCreateCategoryLoading: false,
        isCreateCategorySuccess: true,
      };

    case CREATE_CASINO_CATEGORY_FAIL:
      return {
        ...state,
        isCreateCategoryError: payload,
        isCreateCategoryLoading: false,
        isCreateCategorySuccess: false,
      };

    case EDIT_CASINO_CATEGORY:
      return {
        ...state,
        isEditCategoryLoading: true,
        isEditCategorySuccess: false,
      };

    case EDIT_CASINO_CATEGORY_SUCCESS:
      return {
        ...state,
        isEditCategoryLoading: false,
        isEditCategorySuccess: true,
      };

    case EDIT_CASINO_CATEGORY_FAIL:
      return {
        ...state,
        isEditCategoryError: payload,
        isEditCategoryLoading: false,
        isEditCategorySuccess: false,
      };

    case CREATE_CASINO_SUBCATEGORY_START:
      return {
        ...state,
        isCreateSubCategoryLoading: true,
        isCreateSubCategorySuccess: false,
      };

    case CREATE_CASINO_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        isCreateSubCategoryLoading: false,
        isCreateSubCategorySuccess: true,
      };

    case CREATE_CASINO_SUBCATEGORY_FAIL:
      return {
        ...state,
        isCreateSubCategoryError: payload,
        isCreateSubCategoryLoading: false,
        isCreateSubCategorySuccess: false,
      };

    case UPDATE_CASINO_STATUS_START:
      return {
        ...state,
        isUpdateCasinoStatusLoading: false,
      };

    case UPDATE_CASINO_STATUS_SUCCESS:
      return {
        ...state,
        isUpdateCasinoStatusLoading: true,
        isUpdateCasinoStatus: true,
        isUpdateCasinoStatusError: null,
      };

    case UPDATE_CASINO_STATUS_FAIL:
      return {
        ...state,
        isUpdateCasinoStatusLoading: false,
        isUpdateCasinoStatusError: payload,
        isUpdateCasinoStatus: false,
      };

    case UPDATE_SA_CASINO_GAMES_STATUS_START:
      return {
        ...state,
        isUpdateSACasinoGamesStatusLoading: true,
      };

    case UPDATE_SA_CASINO_GAMES_STATUS_SUCCESS:
      return {
        ...state,
        isUpdateSACasinoGamesStatusLoading: false,
        isUpdateSACasinoGamesStatus: true,
        isUpdateSACasinoGamesStatusError: null,
      };

    case UPDATE_SA_CASINO_GAMES_STATUS_FAIL:
      return {
        ...state,
        isUpdateSACasinoGamesStatusLoading: false,
        isUpdateSACasinoGamesStatusError: payload,
        isUpdateSACasinoGamesStatus: false,
      };

    default:
      return state;
  }
};

export default CasinoManagementData;
