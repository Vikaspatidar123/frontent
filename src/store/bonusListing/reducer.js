import {
	GET_BONUS_DETAILS_DATA,
	GET_BONUS_DETAILS_DATA_SUCCESS,
	GET_BONUS_DETAILS_DATA_FAIL,
} from './actionTypes';

const INIT_STATE = {
	bonusDetails: null,
	error: null,
	isLoading: true,
};

const getAllBonusDetails = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_BONUS_DETAILS_DATA:
			return {
				...state,
				isLoading: false,
			};

		case GET_BONUS_DETAILS_DATA_SUCCESS:
			return {
				...state,
				isLoading: true,
				bonusDetails: payload,
				error: null,
			};

		case GET_BONUS_DETAILS_DATA_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		default:
			return { ...state };
	}
};

export default getAllBonusDetails;
