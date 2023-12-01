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
	GET_BONUS_START,
	GET_BONUS_SUCCESS,
	GET_BONUS__FAIL,
	DELETE_BONUS_START,
	DELETE_BONUS_FAIL,
	DELETE_BONUS_COMPLETE,
	RESET_BONUS_CURRENCY_CONVERSION,
	REORDER_BONUS_START,
	REORDER_BONUS_SUCCESS,
	REORDER_BONUS_FAIL,
	RESET_BONUS_DETAILS_DATA,
} from './actionTypes';

const INIT_STATE = {
	bonusDetails: null,
	error: null,
	isLoading: true,
	isBonusDetailsLoading: false,
	isUpdateSABonusStatusLoading: false,
	isUpdateSABonusStatusError: null,
	isUpdateSABonusStatusSuccess: false,
	bonusCurrenciesFetched: false,
	bonusCurrencies: {
		EUR: {
			maxBonusThreshold: '',
			minDeposit: '',
			maxWinAmount: '',
			zeroOutThreshold: '',
		},
	},
	gameBonusDetail: null,
	reorderBonusSuccess: false,
	reorderBonusLoading: false,
	reorderBonusError: null,
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

		case RESET_BONUS_DETAILS_DATA:
			return {
				...state,
				isLoading: true,
				bonusDetails: null,
				error: null,
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

		case GET_BONUS_CURRENCY_CONVERSION:
			return {
				...state,
				isLoading: false,
			};

		case GET_BONUS_CURRENCY_CONVERSION_SUCCESS:
			return {
				...state,
				isLoading: true,
				bonusCurrencies: payload,
				bonusCurrenciesFetched: true,
				error: null,
			};

		case GET_BONUS_CURRENCY_CONVERSION_FAIL:
			return {
				...state,
				error: payload,
				bonusCurrenciesFetched: false,
				isLoading: true,
			};

		case RESET_BONUS_CURRENCY_CONVERSION:
			return {
				...state,
				error: false,
				bonusCurrenciesFetched: false,
				bonusCurrencies: INIT_STATE.bonusCurrencies,
			};

		case GET_BONUS_START:
			return {
				...state,
				isBonusDetailsLoading: true,
			};

		case GET_BONUS_SUCCESS:
			return {
				...state,
				gameBonusDetail: payload,
				error: null,
				isBonusDetailsLoading: false,
			};

		case GET_BONUS__FAIL:
			return {
				...state,
				error: payload,
				isBonusDetailsLoading: false,
			};

		case DELETE_BONUS_START:
			return {
				...state,
				isDeleteBonusLoading: true,
			};

		case DELETE_BONUS_COMPLETE:
			return {
				...state,
				isDeleteBonusLoading: false,
			};

		case DELETE_BONUS_FAIL:
			return {
				...state,
				error: payload,
				isDeleteBonusLoading: false,
			};

		case REORDER_BONUS_START:
			return {
				...state,
				reorderBonusLoading: true,
				reorderBonusSuccess: false,
				reorderBonusError: null,
			};

		case REORDER_BONUS_SUCCESS:
			return {
				...state,
				reorderBonusLoading: false,
				reorderBonusSuccess: true,
				reorderBonusError: null,
			};

		case REORDER_BONUS_FAIL:
			return {
				...state,
				reorderBonusLoading: false,
				reorderBonusSuccess: false,
				reorderBonusError: payload,
			};

		default:
			return { ...state };
	}
};

export default getAllBonusDetails;
