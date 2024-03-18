import { put, takeLatest, fork, all, select } from 'redux-saga/effects';

//  Redux States
import {
	UPDATE_PROFILE_START,
	UPDATE_SITE_CONFIGURATION_START,
	RESET_PROFILE_PASSWORD_START,
	GET_SITE_CONFIGURATION_START,
	UPDATE_LOGO,
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
import { showToastr } from '../../utils/helpers';
import { getSiteConfiguration } from '../../network/getRequests';
import {
	updateProfile,
	resetProfilePassword,
	updateSiteConfiguration,
	uploadLogoRequest,
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
		yield put(getSiteConfigurationSuccess(data?.data));
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
		const data = action && action.payload;
		yield updateSiteConfiguration(data);
		const { siteConfigDetails } = yield select((state) => state.ProfileData);
		const [key] = Object.keys(data || {});
		const updatedSiteConfig = {
			...siteConfigDetails,
			[key]: { ...siteConfigDetails[key], value: `${data[key]}` },
		};
		yield put(getSiteConfigurationSuccess(updatedSiteConfig));
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

function* updateLogoWorker(action) {
	try {
		const data = action && action.payload;
		yield uploadLogoRequest(data);

		showToastr({
			message: `Logo uploaded successfully`,
			type: 'success',
		});
	} catch (e) {
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
	yield takeLatest(UPDATE_LOGO, updateLogoWorker);
}

function* ProfileDataSaga() {
	yield all([fork(ProfileDataWatcher)]);
}

export default ProfileDataSaga;
