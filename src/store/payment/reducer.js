import {
	GET_PAYMENT_DATA,
	GET_PAYMENT_DATA_SUCCESS,
	GET_PAYMENT_DATA_FAIL,
	CREATE_PAYMENT_PROVIDER,
	CREATE_PAYMENT_SUCCESS,
	CREATE_PAYMENT_FAIL,
	RESET_PAYMENT_DETAILS,
	GET_PAYMENT_DETAILS,
	GET_PAYMENT_DETAILS_SUCCESS,
	GET_PAYMENT_DETAILS_FAIL,
} from './actionTypes';

const INIT_STATE = {
	isLoading: true,
	paymentListing: null,
	createSuccess: false,
	createLoading: false,
	updateSuccess: false,
	updateLoading: false,
	paymentDetailsLoading: false,
	paymentDetails: null,
};

const getPayments = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_PAYMENT_DATA:
			return {
				...state,
				isLoading: true,
			};

		case GET_PAYMENT_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				paymentListing: payload,
			};

		case GET_PAYMENT_DATA_FAIL:
			return {
				...state,
				isLoading: false,
			};

		case CREATE_PAYMENT_PROVIDER:
			return {
				...state,
				createLoading: true,
			};

		case CREATE_PAYMENT_SUCCESS:
			return {
				...state,
				createLoading: false,
				createSuccess: payload,
			};

		case CREATE_PAYMENT_FAIL:
			return {
				...state,
				createLoading: false,
				createSuccess: false,
			};

		case GET_PAYMENT_DETAILS:
			return {
				...state,
				paymentDetailsLoading: true,
			};

		case GET_PAYMENT_DETAILS_SUCCESS:
			return {
				...state,
				paymentDetailsLoading: false,
				paymentDetails: payload,
			};

		case GET_PAYMENT_DETAILS_FAIL:
			return {
				...state,
				paymentDetailsLoading: false,
			};

		case RESET_PAYMENT_DETAILS:
			return {
				createSuccess: false,
				createLoading: false,
				updateSuccess: false,
				updateLoading: false,
				paymentDetailsLoading: false,
				paymentDetails: null,
			};

		default:
			return { ...state };
	}
};

export default getPayments;
