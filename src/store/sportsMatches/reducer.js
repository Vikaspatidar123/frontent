import {
	FETCH_SPORTS_MATCHES_FAIL,
	FETCH_SPORTS_MATCHES_START,
	FETCH_SPORTS_MATCHES_SUCCESS,
} from './actionTypes';

const initialState = {
	sportsMatches: null,
	error: '',
	loading: false,
};

const sportsMatchesReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_SPORTS_MATCHES_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_SPORTS_MATCHES_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_SPORTS_MATCHES_SUCCESS:
			return {
				...state,
				loading: false,
				sportsMatches: payload,
			};
		default:
			return { ...state };
	}
};

export default sportsMatchesReducer;
