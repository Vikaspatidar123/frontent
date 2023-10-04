import {
  GET_CASINO_CATEGORY_DATA,
  GET_CASINO_CATEGORY_DATA_SUCCESS,
  GET_CASINO_CATEGORY_DATA_FAIL,
  GET_CASINO_SUB_CATEGORY_DATA_SUCCESS,
  GET_CASINO_SUB_CATEGORY_DATA_FAIL,
  GET_CASINO_SUB_CATEGORY_DATA
} from "./actionTypes";

export const getCasinoCategoryDetailSuccess = (payload) => ({
  type: GET_CASINO_CATEGORY_DATA_SUCCESS,
  payload: payload,
});

export const getCasinoCategoryDetailFailure = (payload) => ({
  type: GET_CASINO_CATEGORY_DATA_FAIL,
  payload: payload,
});

export const getCasinoCategoryDetailStart = (payload) => ({
  type: GET_CASINO_CATEGORY_DATA,
  payload: payload,
});

export const getCasinoSubCategoryDetailSuccess = (payload) => ({
  type: GET_CASINO_SUB_CATEGORY_DATA_SUCCESS,
  payload: payload,
});

export const getCasinoSubCategoryDetailFailure = (payload) => ({
  type: GET_CASINO_SUB_CATEGORY_DATA_FAIL,
  payload: payload,
});

export const getCasinoSubCategoryDetailStart = (payload) => ({
  type: GET_CASINO_SUB_CATEGORY_DATA,
  payload: payload,
});