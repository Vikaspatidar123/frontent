import {
	GET_PAYMENT_DATA,
	GET_PAYMENT_DATA_SUCCESS,
	GET_PAYMENT_DATA_FAIL,
	CREATE_PAYMENT_FAIL,
	CREATE_PAYMENT_SUCCESS,
	CREATE_PAYMENT_PROVIDER,
	GET_PAYMENT_DETAILS,
	GET_PAYMENT_DETAILS_SUCCESS,
	GET_PAYMENT_DETAILS_FAIL,
	RESET_PAYMENT_DETAILS,
} from './actionTypes';

export const getPaymentListingSuccess = (payload) => ({
	type: GET_PAYMENT_DATA_SUCCESS,
	payload,
});

export const getPaymentListingFail = (payload) => ({
	type: GET_PAYMENT_DATA_FAIL,
	payload,
});

export const getPaymentListing = (payload) => ({
	type: GET_PAYMENT_DATA,
	payload,
});

export const createPaymentProvider = (payload) => ({
	type: CREATE_PAYMENT_PROVIDER,
	payload,
});

export const createPaymentSuccess = (payload) => ({
	type: CREATE_PAYMENT_SUCCESS,
	payload,
});

export const createPaymentFail = (payload) => ({
	type: CREATE_PAYMENT_FAIL,
	payload,
});

export const resetPaymentProvider = (payload) => ({
	type: RESET_PAYMENT_DETAILS,
	payload,
});

export const getPaymentDetails = (payload) => ({
	type: GET_PAYMENT_DETAILS,
	payload,
});

export const getPaymentDetailsSuccess = (payload) => ({
	type: GET_PAYMENT_DETAILS_SUCCESS,
	payload,
});

export const getPaymentDetailsFail = (payload) => ({
	type: GET_PAYMENT_DETAILS_FAIL,
	payload,
});
