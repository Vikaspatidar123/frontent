import {
	GET_AGGREGATORS_START,
	GET_AGGREGATORS_FAILURE,
	GET_AGGREGATORS_SUCCESS,
	CREATE_AGGREGATORS_START,
	CREATE_AGGREGATORS_FAIL,
	CREATE_AGGREGATORS_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	aggregatorsData: [],
	error: {},
	loading: true,
	isCreateAggregatorError: false,
	isCreateAggregatorSuccess: false,
	isCreateAggregatorLoading: false,
};

const AggregatorsReducer = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_AGGREGATORS_START:
			return {
				...state,
				loading: true,
			};

		case GET_AGGREGATORS_FAILURE:
			return {
				...state,
				error: payload,
				loading: false,
			};

		case GET_AGGREGATORS_SUCCESS:
			return {
				...state,
				aggregatorsData: payload,
				loading: false,
			};

		case CREATE_AGGREGATORS_START:
			return {
				...state,
				isCreateAggregatorLoading: true,
				isCreateAggregatorSuccess: false,
			};

		case CREATE_AGGREGATORS_SUCCESS:
			return {
				...state,
				isCreateAggregatorLoading: false,
				isCreateAggregatorSuccess: true,
			};

		case CREATE_AGGREGATORS_FAIL:
			return {
				...state,
				isCreateAggregatorError: payload,
				isCreateAggregatorLoading: false,
				isCreateAggregatorSuccess: false,
			};

		default:
			return state;
	}
};

export default AggregatorsReducer;
