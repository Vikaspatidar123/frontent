import {
	GET_INVOICES_FAIL,
	GET_INVOICES_SUCCESS,
	GET_INVOICE_DETAIL_SUCCESS,
	GET_INVOICE_DETAIL_FAIL,
} from './actionTypes';

const INIT_STATE = {
	invoices: [],
	invoiceDetail: {},
	error: {},
	loading: true,
};

const Invoices = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_INVOICES_SUCCESS:
			return {
				...state,
				invoices: payload,
				loading: true,
			};

		case GET_INVOICES_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_INVOICE_DETAIL_SUCCESS:
			return {
				...state,
				invoiceDetail: payload,
			};

		case GET_INVOICE_DETAIL_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default Invoices;
