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
	UPDATE_PAYMENT_PROVIDER,
	UPDATE_PAYMENT_SUCCESS,
	UPDATE_PAYMENT_FAIL,
	GET_PAYMENT_PROVIDER_DATA_SUCCESS,
	GET_PAYMENT_PROVIDER_DATA_FAIL,
	GET_PAYMENT_PROVIDER_DATA,
	ADD_PAYMENT_PROVIDER,
	ADD_PAYMENT_SUCCESS,
	ADD_PAYMENT_FAIL,
	UPDATE_PAYMENT_CREDENTIALS_PROVIDER,
	UPDATE_PAYMENT_CREDENTIALS_SUCCESS,
	UPDATE_PAYMENT_CREDENTIALS_FAILS,
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

export const updatePaymentProvider = (payload) => ({
	type: UPDATE_PAYMENT_PROVIDER,
	payload,
});

export const updatePaymentSuccess = (payload) => ({
	type: UPDATE_PAYMENT_SUCCESS,
	payload,
});

export const updatePaymentFail = (payload) => ({
	type: UPDATE_PAYMENT_FAIL,
	payload,
});

export const getPaymentcredentialsProvider = (payload) => ({
	type: GET_PAYMENT_PROVIDER_DATA,
	payload,
});

export const getPaymentcredentialsSuccess = (payload) => ({
	type: GET_PAYMENT_PROVIDER_DATA_SUCCESS,
	payload,
});

export const getPaymentcredentialsFail = (payload) => ({
	type: GET_PAYMENT_PROVIDER_DATA_FAIL,
	payload,
});

export const addPaymentProvider = (payload) => ({
	type: ADD_PAYMENT_PROVIDER,
	payload,
});

export const addPaymentProviderSuccess = (payload) => ({
	type: ADD_PAYMENT_SUCCESS,
	payload,
});

export const addPaymentProviderFail = (payload) => ({
	type: ADD_PAYMENT_FAIL,
	payload,
});
export const updatePaymentcredentialsProvider = (payload) => ({
	type: UPDATE_PAYMENT_CREDENTIALS_PROVIDER,
	payload,
});

export const updatePaymentcredentialsSuccess = (payload) => ({
	type: UPDATE_PAYMENT_CREDENTIALS_SUCCESS,
	payload,
});

export const updatePaymentcredentialsFail = (payload) => ({
	type: UPDATE_PAYMENT_CREDENTIALS_FAILS,
	payload,
});
