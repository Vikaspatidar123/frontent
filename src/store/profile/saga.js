import { put, takeLatest, fork, all, select } from 'redux-saga/effects';

//  Redux States
import {
	UPDATE_PROFILE_START,
	UPDATE_SITE_CONFIGURATION_START,
	RESET_PROFILE_PASSWORD_START,
	GET_SITE_CONFIGURATION_START,
	UPDATE_LOGO,
	UPDATE_APP_SETTING,
} from './actionTypes';
import {
	updateProfileSuccess,
	updateProfileFail,
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
	updateAppSettingRequest,
	updateLimitsRequest,
} from '../../network/postRequests';

const limitKeys = [
	'minOdds',
	'maxOdds',
	'minStakeAmount',
	'exchangeBetCommission',
];

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
		const [key] = Object.keys(data || {});

		if (limitKeys.includes(key)) {
			yield updateLimitsRequest({ [key]: parseFloat(data[key]) });
		} else {
			yield updateSiteConfiguration(data);
		}

		showToastr({
			message: `Site Configuration Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateAppSetting(action) {
	try {
		const data = action && action.payload;
		const [key] = Object.keys(data || {});

		yield updateAppSettingRequest(data);

		// For locally updating the state without api call.
		const { siteConfigDetails } = yield select((state) => state.ProfileData);
		const updatedSiteConfig = {
			...siteConfigDetails,
			[key]: { ...siteConfigDetails[key], value: `${data[key]}` },
		};
		yield put(getSiteConfigurationSuccess(updatedSiteConfig));

		showToastr({
			message: `Setting Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
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
	yield takeLatest(UPDATE_APP_SETTING, updateAppSetting);
}

function* ProfileDataSaga() {
	yield all([fork(ProfileDataWatcher)]);
}

export default ProfileDataSaga;
