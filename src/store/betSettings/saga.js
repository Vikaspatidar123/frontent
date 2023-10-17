import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getBetSettingsDataSuccess,
	getBetSettingsDataFail,
	createBetSettingsSuccess,
	createBetSettingsFail,
} from './actions';
import {
	CREATE_BET_SETTINGS_START,
	GET_BET_SETTINGS_DATA,
} from './actionTypes';

import { getBetSettings } from '../../network/getRequests';
import { showToastr } from '../toastr/actions';
import { createBetSettings } from '../../network/postRequests';

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

function* createBetSettingsWorker(action) {
	try {
		const { data } = action && action.payload;

		yield createBetSettings(data);

		yield put(
			showToastr({
				message: `BetSettings Created Successfully`,
				type: 'success',
			})
		);

		yield put(createBetSettingsSuccess());
	} catch (e) {
		yield put(createBetSettingsFail());

		yield put(
			showToastr({
				message: e?.response?.data?.errors[0]?.description || e.message,
				type: 'error',
			})
		);
	}
}

export function* betSettingsWatcher() {
	yield takeLatest(GET_BET_SETTINGS_DATA, betSettingsWorker);
	yield takeLatest(CREATE_BET_SETTINGS_START, createBetSettingsWorker);
}

function* BetSettingsSaga() {
	yield all([fork(betSettingsWatcher)]);
}

export default BetSettingsSaga;
