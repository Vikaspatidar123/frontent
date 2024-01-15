import { put, takeEvery, all, fork, delay } from 'redux-saga/effects';

// Crypto Redux States
import {
	GET_LIVE_PLAYER_START,
	GET_DEMOGRAPHIC_START,
	GET_KPI_REPORT_START,
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
} from './actions';
import { showToastr } from '../../utils/helpers';
import { kpiReportConstant } from './config/kpiReport';
import {
	// getDashboardLiveInfoService,
	getDashboardDemoGraphicService,
} from '../../network/getRequests';

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

function* getKpiData() {
	try {
		// yield getKpiReportStart();
		yield delay(500);
		yield put(getKpiReportSuccess(kpiReportConstant));
	} catch (e) {
		yield put(getKpiReportFail());
		showToastr({
			message: 'Json Load Error',
			type: 'error',
		});
	}
}

export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
	yield takeEvery(GET_KPI_REPORT_START, getKpiData);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
