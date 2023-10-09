import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getBetSettingsDataSuccess, getBetSettingsDataFail } from './actions';
import { GET_BET_SETTINGS_DATA } from './actionTypes';

import { getBetSettings } from '../../network/getRequests';

function* betSettingsWorker() {
	try {
		const { data } = yield getBetSettings();
		yield put(getBetSettingsDataSuccess(data?.data?.dbBetObj));
	} catch (error) {
		yield put(
			getBetSettingsDataFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

export function* betSettingsWatcher() {
	yield takeLatest(GET_BET_SETTINGS_DATA, betSettingsWorker);
}

function* BetSettingsSaga() {
	yield all([fork(betSettingsWatcher)]);
}

export default BetSettingsSaga;
