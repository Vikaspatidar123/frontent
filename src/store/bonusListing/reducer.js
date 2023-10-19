import {
	GET_BONUS_DETAILS_DATA,
	GET_BONUS_DETAILS_DATA_SUCCESS,
	GET_BONUS_DETAILS_DATA_FAIL,
	UPDATE_SA_BONUS_STATUS,
	UPDATE_SA_BONUS_STATUS_SUCCESS,
	UPDATE_SA_BONUS_STATUS_FAIL,
} from './actionTypes';

const INIT_STATE = {
	bonusDetails: null,
	error: null,
	isLoading: true,
	isUpdateSABonusStatusLoading: false,
	isUpdateSABonusStatusError: null,
	isUpdateSABonusStatusSuccess: false,
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

		case UPDATE_SA_BONUS_STATUS:
			return {
				...state,
				isUpdateSABonusStatusLoading: true,
			};

		case UPDATE_SA_BONUS_STATUS_SUCCESS:
			return {
				...state,
				isUpdateSABonusStatusLoading: false,
				isUpdateSABonusStatusSuccess: true,
				isUpdateSABonusStatusError: null,
			};

		case UPDATE_SA_BONUS_STATUS_FAIL:
			return {
				...state,
				isUpdateSABonusStatusLoading: false,
				isUpdateSABonusStatusError: payload,
				isUpdateSABonusStatusSuccess: false,
			};

		default:
			return { ...state };
	}
};

export default getAllBonusDetails;
