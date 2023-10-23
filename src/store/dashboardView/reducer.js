import {
	GET_LIVE_PLAYER_START,
	GET_LIVE_PLAYER_SUCCESS,
	GET_LIVE_PLAYER_FAIL,
} from './actionTypes';

const INIT_STATE = {
	isLivePlayerLoading: false,
	livePlayerData: {},
};

function DashboardView(state = INIT_STATE, { type, payload } = {}) {
	switch (type) {
		case GET_LIVE_PLAYER_START:
			return {
				...state,
				isLivePlayerLoading: true,
				livePlayerData: {},
			};

		case GET_LIVE_PLAYER_SUCCESS:
			return {
				...state,
				isLivePlayerLoading: false,
				livePlayerData: payload,
			};

		case GET_LIVE_PLAYER_FAIL:
			return {
				...state,
				isLivePlayerLoading: false,
				livePlayerData: {},
			};
		default:
			return state;
	}
}

export default DashboardView;
