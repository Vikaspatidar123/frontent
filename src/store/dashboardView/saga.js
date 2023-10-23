import { put, takeEvery, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { GET_LIVE_PLAYER_START } from './actionTypes';
import {
	getLivePlayerInfoStart,
	getLivePlayerInfoSuccess,
	getLivePlayerInfoFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import { getDashboardLiveInfoService } from '../../network/getRequests';

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

export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
