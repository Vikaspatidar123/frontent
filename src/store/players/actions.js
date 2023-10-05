import {
	FETCH_PLAYERS_FAIL,
	FETCH_PLAYERS_START,
	FETCH_PLAYERS_SUCCESS,
} from './actionTypes';

export const fetchPlayersStart = (payload) => ({
	type: FETCH_PLAYERS_START,
	payload,
});

export const fetchPlayersSuccess = (Players) => ({
	type: FETCH_PLAYERS_SUCCESS,
	payload: Players,
});

export const fetchPlayersFail = (history) => ({
	type: FETCH_PLAYERS_FAIL,
	payload: { history },
});
