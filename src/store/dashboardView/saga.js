/* eslint-disable import/no-named-as-default */
import { put, takeEvery, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	GET_LIVE_PLAYER_START,
	GET_DEMOGRAPHIC_START,
	GET_KPI_REPORT_START,
	GET_GAME_REPORT_START,
	GET_KPI_SUMMARY_START,
} from './actionTypes';
import {
	getLivePlayerInfoStart,
	getLivePlayerInfoSuccess,
	getLivePlayerInfoFail,
	getDemographicStart,
	getDemographicSuccess,
	getDemographicFail,
	// getKpiReportStart,
	getKpiReportSuccess,
	getKpiReportFail,
	getGameReportSuccess,
	getGameReportFail,
	getKpiSummarySuccess,
	getKpiSummaryFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import {
	// getDashboardLiveInfoService,
	getDashboardDemoGraphicService,
	getGameReports,
	getKpiReport,
	getKpiSummary,
} from '../../network/getRequests';
import kpiConstant from './config/kpisummary';

function* getLivePlayerData() {
	try {
		yield getLivePlayerInfoStart();
		// const { data } = yield getDashboardLiveInfoService();
		const data = {
			totalPlayers: '107',
			todayTotalGgr: '0',
			loggedInPlayer: 5,
			depositConvRate: '0.00',
			registrationConvRate: '100.00',
			deviceLoggedIn: [
				{
					device_type: 'desktop',
					count: '5',
				},
			],
		};
		yield put(getLivePlayerInfoSuccess(data));
	} catch (e) {
		yield put(getLivePlayerInfoFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getDemoGraphicData(action) {
	try {
		yield getDemographicStart();
		const { data } = yield getDashboardDemoGraphicService(action.payload);
		yield put(getDemographicSuccess(data?.data?.demographic));
	} catch (e) {
		yield put(getDemographicFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getKpiSummaryWorker(action) {
	try {
		const payload = action && action?.payload;
		if (payload?.tab === 'banking') {
			yield put(getKpiSummarySuccess(kpiConstant.Banking));
		} else {
			const { data } = yield getKpiSummary(payload);
			yield put(getKpiSummarySuccess(data?.data?.kpiSummary));
		}
	} catch (e) {
		yield put(getKpiSummaryFail(e?.response?.data?.errors[0]?.description));

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getKpiData(action) {
	try {
		const payload = action && action?.payload;
		const { data } = yield getKpiReport(payload);
		yield put(getKpiReportSuccess(data?.data?.KPIReport));
	} catch (e) {
		yield put(
			getKpiReportFail(e?.response?.data?.errors[0]?.description || e.message)
		);
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getGameReportWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getGameReports(payload);
		yield put(getGameReportSuccess(data?.data?.gameReport));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(getGameReportFail(e?.response?.data?.errors[0]?.description));
	}
}
export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
	yield takeEvery(GET_KPI_REPORT_START, getKpiData);
	yield takeEvery(GET_GAME_REPORT_START, getGameReportWorker);
	yield takeEvery(GET_KPI_SUMMARY_START, getKpiSummaryWorker);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
