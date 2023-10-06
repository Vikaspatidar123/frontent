import {
	GET_AGGREGATORS_START,
	GET_AGGREGATORS_FAILURE,
	GET_AGGREGATORS_SUCCESS,
} from './actionTypes';

export const getAggregatorsList = (data) => ({
	type: GET_AGGREGATORS_START,
	payload: data,
});

export const getAggregatorsListSuccess = (data) => ({
	type: GET_AGGREGATORS_SUCCESS,
	payload: data,
});

export const getAggregatorsListFailure = (error) => ({
	type: GET_AGGREGATORS_FAILURE,
	payload: error,
});
