import { put, takeEvery, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	GET_LIVE_PLAYER_START,
	GET_DEMOGRAPHIC_START,
	GET_KPI_REPORT_START,
	GET_GAME_REPORT_START,
	GET_KPI_SUMMARY_START,
	GET_TOP_PLAYERS_START,
	GET_STATS_START,
} from './actionTypes';
import {
	getLivePlayerInfoSuccess,
	getLivePlayerInfoFail,
	getDemographicSuccess,
	getDemographicFail,
	// getKpiReportStart,
	getKpiReportSuccess,
	getKpiReportFail,
	getGameReportSuccess,
	getGameReportFail,
	getKpiSummarySuccess,
	getKpiSummaryFail,
	getTopPlayersSuccess,
	getTopPlayersFail,
	getStatisticDataSuccess,
	getStatisticDataFail,
} from './actions';
import {
	getDashboardLiveInfoService,
	getDashboardDemoGraphicService,
	getGameReports,
	getKpiReport,
	getKpiSummary,
	getTopPlayersRequest,
	statsDataRequest,
} from '../../network/getRequests';

function* getLivePlayerData() {
	try {
		const { data } = yield getDashboardLiveInfoService();
		yield put(getLivePlayerInfoSuccess(data?.data));
	} catch (e) {
		yield put(getLivePlayerInfoFail());
	}
}

function* getStatsDataWorker({ payload }) {
	try {
		const { data } = yield statsDataRequest(payload);
		yield put(getStatisticDataSuccess(data?.data));
	} catch (e) {
		yield put(getStatisticDataFail());
	}
}

function* getDemoGraphicData(action) {
	try {
		const { data } = yield getDashboardDemoGraphicService(action.payload);
		yield put(getDemographicSuccess(data?.data));
	} catch (e) {
		yield put(getDemographicFail());
	}
}

function* getKpiSummaryWorker(action) {
	try {
		const payload = action && action?.payload;
		const { data } = yield getKpiSummary(payload);
		yield put(getKpiSummarySuccess(data?.data?.kpiSummary));
	} catch (e) {
		yield put(getKpiSummaryFail(e?.response?.data?.errors[0]?.description));
	}
}

function* getKpiData(action) {
	try {
		const payload = action && action?.payload;
		const { data } = yield getKpiReport(payload);
		yield put(getKpiReportSuccess(data?.data?.reportData));
	} catch (e) {
		yield put(
			getKpiReportFail(e?.response?.data?.errors[0]?.description || e.message)
		);
	}
}

function* getGameReportWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getGameReports(payload);
		yield put(getGameReportSuccess(data?.data?.gameReport));
	} catch (e) {
		yield put(getGameReportFail(e?.response?.data?.errors[0]?.description));
	}
}

function* topPlayersWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getTopPlayersRequest(payload);
		yield put(getTopPlayersSuccess(data?.data));
	} catch (e) {
		yield put(getTopPlayersFail(e?.response?.data?.errors[0]?.description));
	}
}

export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
	yield takeEvery(GET_STATS_START, getStatsDataWorker);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
	yield takeEvery(GET_KPI_REPORT_START, getKpiData);
	yield takeEvery(GET_GAME_REPORT_START, getGameReportWorker);
	yield takeEvery(GET_KPI_SUMMARY_START, getKpiSummaryWorker);
	yield takeEvery(GET_TOP_PLAYERS_START, topPlayersWorker);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
