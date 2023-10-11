import {
	GET_ALL_GROUP_START,
	GET_ALL_GROUP_SUCCESS,
	GET_ALL_GROUP_FAIL,
} from './actionTypes';

export const getAllGroupsSuccess = (payload) => ({
	type: GET_ALL_GROUP_SUCCESS,
	payload,
});

export const getAllGroupsFailure = (payload) => ({
	type: GET_ALL_GROUP_FAIL,
	payload,
});

export const getAllGroupsStart = (payload) => ({
	type: GET_ALL_GROUP_START,
	payload,
});
