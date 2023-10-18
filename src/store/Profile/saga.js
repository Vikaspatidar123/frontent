import { put, takeLatest, fork, all } from 'redux-saga/effects';

//  Redux States
import {
	UPDATE_PROFILE_START,
	UPDATE_SITE_CONFIGURATION_START,
	RESET_PROFILE_PASSWORD_START,
} from './actionTypes';
import {
	updateProfileSuccess,
	updateProfileFail,
	updateSiteConfigurationSuccess,
	updateSiteConfigurationFail,
	resetProfilePasswordSuccess,
	resetProfilePasswordFail,
} from './actions';
import {
	updateProfile,
	updateSiteConfiguration,
	resetProfilePassword,
} from '../../network/putRequests';
import { objectToFormData } from '../../utils/objectToFormdata';
import { showToastr } from '../../utils/helpers';

function* updateProfileWorker(action) {
	try {
		const { data } = action && action.payload;
		yield updateProfile(data);

		yield put(updateProfileSuccess());

		yield put(
			showToastr({
				message: `Profile Updated Successfully`,
				type: 'success',
			})
		);
	} catch (e) {
		yield put(updateProfileFail(e?.response?.data?.errors[0]?.description));
	}
}

function* updateSiteConfigurationWorker(action) {
	try {
		const { data } = action && action.payload;
		yield updateSiteConfiguration(objectToFormData(data));

		yield put(updateSiteConfigurationSuccess());
		yield put(
			showToastr({
				message: `Site Configuration Updated Successfully`,
				type: 'success',
			})
		);
	} catch (e) {
		yield put(
			updateSiteConfigurationFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* resetProfilePasswordWorker(action) {
	try {
		const { data } = action && action.payload;
		yield resetProfilePassword({ data });

		yield put(resetProfilePasswordSuccess());

		window.localStorage.clear();

		yield put(
			showToastr({
				message: `Profile Password Reset Successfully`,
				type: 'success',
			})
		);
	} catch (e) {
		yield put(
			resetProfilePasswordFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

export function* ProfileDataWatcher() {
	yield takeLatest(UPDATE_PROFILE_START, updateProfileWorker);
	yield takeLatest(
		UPDATE_SITE_CONFIGURATION_START,
		updateSiteConfigurationWorker
	);
	yield takeLatest(RESET_PROFILE_PASSWORD_START, resetProfilePasswordWorker);
}

function* ProfileDataSaga() {
	yield all([fork(ProfileDataWatcher)]);
}

export default ProfileDataSaga;
