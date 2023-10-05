import {
  GET_CASINO_CATEGORY_DATA,
  GET_CASINO_CATEGORY_DATA_SUCCESS,
  GET_CASINO_CATEGORY_DATA_FAIL,
  GET_CASINO_SUB_CATEGORY_DATA_SUCCESS,
  GET_CASINO_SUB_CATEGORY_DATA_FAIL,
  GET_CASINO_SUB_CATEGORY_DATA,
  GET_LANGUAGE_DATA_SUCCESS,
  GET_LANGUAGE_DATA_FAIL,
  GET_LANGUAGE_DATA_START,
} from "./actionTypes";

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