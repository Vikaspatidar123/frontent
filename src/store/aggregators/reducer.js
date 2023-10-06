import {
	GET_AGGREGATORS_START,
	GET_AGGREGATORS_FAILURE,
	GET_AGGREGATORS_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	aggregatorsData: [],
	error: {},
	loading: true,
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
			};

		case GET_AGGREGATORS_SUCCESS:
			return {
				...state,
				aggregatorsData: payload,
			};

		default:
			return state;
	}
};

export default AggregatorsReducer;
