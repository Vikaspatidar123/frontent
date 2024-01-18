import {
	GET_LIVE_PLAYER_START,
	GET_LIVE_PLAYER_SUCCESS,
	GET_LIVE_PLAYER_FAIL,
	GET_DEMOGRAPHIC_START,
	GET_DEMOGRAPHIC_SUCCESS,
	GET_DEMOGRAPHIC_FAIL,
	GET_KPI_REPORT_START,
	GET_KPI_REPORT_SUCCESS,
	GET_KPI_REPORT_FAIL,
	RESET_DASHBOARD_STATE,
	GET_GAME_REPORT_SUCCESS,
	GET_GAME_REPORT_START,
	GET_GAME_REPORT_FAIL,
} from './actionTypes';
// import { kpiReportConstant } from './config/kpiReport';

import { kpiConstant } from './config/kpisummary';

const INIT_STATE = {
	isLivePlayerLoading: false,
	livePlayerData: {},
	isDemographicLoading: false,
	demoGraphicData: [],
	kPISummary: kpiConstant,
	kPIReport: {},
	// kPIReport: kpiReportConstant,
	isKpiReportLoading: false,
	gameReport: null,
	isGameReportLoading: false,
	isGameReportError: false,
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
		case GET_KPI_REPORT_START:
			return {
				...state,
				isKpiReportLoading: true,
				kPIReport: {},
			};

		case GET_KPI_REPORT_SUCCESS:
			return {
				...state,
				isKpiReportLoading: false,
				kPIReport: payload,
			};

		case GET_KPI_REPORT_FAIL:
			return {
				...state,
				isKpiReportLoading: false,
				kPIReport: {},
			};

		case GET_GAME_REPORT_START:
			return {
				...state,
				isGameReportLoading: true,
				gameReport: null,
				isGameReportError: false,
			};

		case GET_GAME_REPORT_SUCCESS:
			return {
				...state,
				isGameReportLoading: false,
				gameReport: payload,
				isGameReportError: false,
			};

		case GET_GAME_REPORT_FAIL:
			return {
				...state,
				isGameReportLoading: false,
				gameReport: null,
				isGameReportError: true,
			};

		case RESET_DASHBOARD_STATE:
			return INIT_STATE;
		default:
			return state;
	}
}

export default DashboardView;
