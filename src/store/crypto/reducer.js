import {
	GET_WALLET_FAIL,
	GET_WALLET_SUCCESS,
	GET_CRYPTO_ORDERS_SUCCESS,
	GET_CRYPTO_ORDERS_FAIL,
	GET_CRYPTO_PRODUCTS_FAIL,
	GET_CRYPTO_PRODUCTS_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	wallet: {},
	orders: [],
	products: [],
	loading: true,
};

const Crypto = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_WALLET_SUCCESS:
			return {
				...state,
				wallet: payload,
				loading: true,
			};

		case GET_WALLET_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_CRYPTO_ORDERS_SUCCESS:
			return {
				...state,
				orders: payload,
			};

		case GET_CRYPTO_ORDERS_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_CRYPTO_PRODUCTS_SUCCESS:
			return {
				...state,
				products: payload,
			};

		case GET_CRYPTO_PRODUCTS_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default Crypto;
