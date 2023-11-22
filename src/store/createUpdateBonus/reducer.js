import {
	CREATE_BONUS,
	CREATE_BONUS_SUCCESS,
	CREATE_BONUS_FAIL,
} from './actionTypes';

const INIT_STATE = {
	createBonusSuccess: false,
	createBonusLoading: false,
	createBonusError: false,
};

const createBonusReducer = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case CREATE_BONUS:
			return {
				...state,
				createBonusLoading: true,
			};

		case CREATE_BONUS_SUCCESS:
			return {
				...state,
				createBonusSuccess: payload,
				createBonusError: false,
				createBonusLoading: false,
			};

		case CREATE_BONUS_FAIL:
			return {
				...state,
				createBonusSuccess: false,
				createBonusError: true,
				createBonusLoading: false,
			};

		default:
			return state;
	}
};

export default createBonusReducer;
