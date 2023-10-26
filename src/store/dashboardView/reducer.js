import {
	GET_LIVE_PLAYER_START,
	GET_LIVE_PLAYER_SUCCESS,
	GET_LIVE_PLAYER_FAIL,
	GET_DEMOGRAPHIC_START,
	GET_DEMOGRAPHIC_SUCCESS,
	GET_DEMOGRAPHIC_FAIL,
} from './actionTypes';
import { gameContant } from './confile/gameReport';
import { kpiReportConstant } from './confile/kpiReport';

import { kpiConstant } from './confile/kpisummary';

const INIT_STATE = {
	isLivePlayerLoading: false,
	livePlayerData: {},
	isDemographicLoading: false,
	demoGraphicData: [],
	kPISummary: kpiConstant,
	kPIReport: kpiReportConstant,
	gameReport: gameContant,
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
		case GET_DEMOGRAPHIC_START:
			return {
				...state,
				isDemographicLoading: true,
				demoGraphicData: [],
			};

		case GET_DEMOGRAPHIC_SUCCESS:
			return {
				...state,
				isDemographicLoading: false,
				demoGraphicData: payload,
			};

		case GET_DEMOGRAPHIC_FAIL:
			return {
				...state,
				isDemographicLoading: false,
				demoGraphicData: [],
			};
		default:
			return state;
	}
}

export default DashboardView;
