import {
	GET_CASINO_CATEGORY_DATA,
	GET_CASINO_CATEGORY_DATA_SUCCESS,
	GET_CASINO_CATEGORY_DATA_FAIL,
} from './actionTypes';

const INIT_STATE = {
	getCasinoCategoryDetails: [],
	error: null,
	loading: true,
};

const getCasinoCategory = (state = INIT_STATE, {type, payload}) => {
	switch (type) {
		case GET_CASINO_CATEGORY_DATA:
			return {
				...state,
				loading: false,
			};

		case GET_CASINO_CATEGORY_DATA_SUCCESS:
			return {
				...state,
				loading: true,
				getCasinoCategoryDetails: payload,
				error: null,
			};

		case GET_CASINO_CATEGORY_DATA_FAIL:
			return {
				...state,
				error: payload,
				loading: true,
			};

		default:
			return state;
	}
};

export default getCasinoCategory;
