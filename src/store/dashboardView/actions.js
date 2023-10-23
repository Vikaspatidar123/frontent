import {
	GET_LIVE_PLAYER_START,
	GET_LIVE_PLAYER_SUCCESS,
	GET_LIVE_PLAYER_FAIL,
} from './actionTypes';

export const getLivePlayerInfoStart = (payload) => ({
	type: GET_LIVE_PLAYER_START,
	payload,
});

export const getLivePlayerInfoSuccess = (payload) => ({
	type: GET_LIVE_PLAYER_SUCCESS,
	payload,
});

export const getLivePlayerInfoFail = (payload) => ({
	type: GET_LIVE_PLAYER_FAIL,
	payload,
});
