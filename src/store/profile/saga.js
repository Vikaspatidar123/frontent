import { put, takeLatest, fork, all } from 'redux-saga/effects';

//  Redux States
import {
	UPDATE_PROFILE_START,
	UPDATE_SITE_CONFIGURATION_START,
	RESET_PROFILE_PASSWORD_START,
	GET_SITE_CONFIGURATION_START,
} from './actionTypes';
import {
	updateProfileSuccess,
	updateProfileFail,
	updateSiteConfigurationSuccess,
	updateSiteConfigurationFail,
	resetProfilePasswordSuccess,
	resetProfilePasswordFail,
	getSiteConfigurationSuccess,
	getSiteConfigurationFail,
} from './actions';
import { updateSiteConfiguration } from '../../network/putRequests';
import { objectToFormData } from '../../utils/objectToFormdata';
import { showToastr } from '../../utils/helpers';
import { getSiteConfiguration } from '../../network/getRequests';
import {
	updateProfile,
	resetProfilePassword,
} from '../../network/postRequests';

function* updateProfileWorker(action) {
	try {
		const { data } = action && action.payload;
		yield updateProfile(data);

		yield put(updateProfileSuccess());

		showToastr({
			message: `Profile Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(updateProfileFail(e?.response?.data?.errors[0]?.description));

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getSiteConfigurationWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getSiteConfiguration(payload);
		yield put(
			getSiteConfigurationSuccess(data?.data?.siteInformation?.[0]?.value)
		);
	} catch (e) {
		yield put(
			getSiteConfigurationFail(e?.response?.data?.errors[0]?.description)
		);

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateSiteConfigurationWorker(action) {
	try {
		const { data } = action && action.payload;
		yield updateSiteConfiguration(objectToFormData(data));

		yield put(updateSiteConfigurationSuccess());

		showToastr({
			message: `Site Configuration Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(
			updateSiteConfigurationFail(e?.response?.data?.errors[0]?.description)
		);

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* resetProfilePasswordWorker(action) {
	try {
		const { data } = action && action.payload;
		yield resetProfilePassword({ data });

		yield put(resetProfilePasswordSuccess());

		window.localStorage.clear();

		showToastr({
			message: `Profile Password Reset Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(
			resetProfilePasswordFail(e?.response?.data?.errors[0]?.description)
		);

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

export function* ProfileDataWatcher() {
	yield takeLatest(UPDATE_PROFILE_START, updateProfileWorker);
	yield takeLatest(
		UPDATE_SITE_CONFIGURATION_START,
		updateSiteConfigurationWorker
	);
	yield takeLatest(RESET_PROFILE_PASSWORD_START, resetProfilePasswordWorker);
	yield takeLatest(GET_SITE_CONFIGURATION_START, getSiteConfigurationWorker);
}

function* ProfileDataSaga() {
	yield all([fork(ProfileDataWatcher)]);
}

export default ProfileDataSaga;
