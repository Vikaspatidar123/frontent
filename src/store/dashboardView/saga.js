import { put, takeEvery, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { GET_LIVE_PLAYER_START, GET_DEMOGRAPHIC_START } from './actionTypes';
import {
	getLivePlayerInfoStart,
	getLivePlayerInfoSuccess,
	getLivePlayerInfoFail,
	getDemographicStart,
	getDemographicSuccess,
	getDemographicFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import {
	getDashboardLiveInfoService,
	getDashboardDemoGraphicService,
} from '../../network/getRequests';

function* getLivePlayerData() {
	try {
		yield getLivePlayerInfoStart();
		const { data } = yield getDashboardLiveInfoService();
		yield put(getLivePlayerInfoSuccess(data?.data));
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

export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
