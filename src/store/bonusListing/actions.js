import {
  GET_BONUS_DETAILS_DATA,
  GET_BONUS_DETAILS_DATA_SUCCESS,
  GET_BONUS_DETAILS_DATA_FAIL,
  UPDATE_SA_BONUS_STATUS,
  UPDATE_SA_BONUS_STATUS_SUCCESS,
  UPDATE_SA_BONUS_STATUS_FAIL,
  GET_BONUS_CURRENCY_CONVERSION,
  GET_BONUS_CURRENCY_CONVERSION_SUCCESS,
  GET_BONUS_CURRENCY_CONVERSION_FAIL,
  RESET_BONUS_CURRENCY_CONVERSION,
  GET_BONUS_START,
  GET_BONUS_SUCCESS,
  GET_BONUS__FAIL,
  DELETE_BONUS_START,
  DELETE_BONUS_FAIL,
  DELETE_BONUS_COMPLETE,
} from './actionTypes';

export const getBonusDetailsSuccess = (payload) => ({
  type: GET_BONUS_DETAILS_DATA_SUCCESS,
  payload,
});

export const getBonusDetailsFail = (payload) => ({
  type: GET_BONUS_DETAILS_DATA_FAIL,
  payload,
});

export const getBonusDetails = (payload) => ({
  type: GET_BONUS_DETAILS_DATA,
  payload,
});

export const updateSABonusStatusSuccess = (payload) => ({
  type: UPDATE_SA_BONUS_STATUS_SUCCESS,
  payload,
});

export const updateSABonusStatusFail = (payload) => ({
  type: UPDATE_SA_BONUS_STATUS_FAIL,
  payload,
});

export const updateSABonusStatus = (payload) => ({
  type: UPDATE_SA_BONUS_STATUS,
  payload,
});

export const getBonusCurrencyConversions = (payload) => ({
  type: GET_BONUS_CURRENCY_CONVERSION,
  payload,
});

export const getBonusCurrencyConversionsSuccess = (payload) => ({
  type: GET_BONUS_CURRENCY_CONVERSION_SUCCESS,
  payload,
});

export const getBonusCurrencyConversionsFail = (payload) => ({
  type: GET_BONUS_CURRENCY_CONVERSION_FAIL,
  payload,
});

export const resetBonusCurrencyConversion = (payload) => ({
  type: RESET_BONUS_CURRENCY_CONVERSION,
  payload,
});

export const getBonusStart = (payload) => ({
  type: GET_BONUS_START,
  payload,
});
export const getBonusSuccess = (payload) => ({
  type: GET_BONUS_SUCCESS,
  payload,
});
export const getBonusFailure = (payload) => ({
  type: GET_BONUS__FAIL,
  payload,
});

export const deleteBonusStart = (payload) => ({
  type: DELETE_BONUS_START,
  payload,
});
export const deleteBonusComplete = (payload) => ({
  type: DELETE_BONUS_COMPLETE,
  payload,
});
export const deleteBonusFailure = (payload) => ({
  type: DELETE_BONUS_FAIL,
  payload,
})
