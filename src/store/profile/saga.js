import {
	put,
	takeLatest,
	fork,
	all,
	select,
	takeEvery,
} from 'redux-saga/effects';
import { objectToFormData } from '../../utils/objectToFormdata';

//  Redux States
import {
	UPDATE_PROFILE_START,
	UPDATE_SITE_CONFIGURATION_START,
	RESET_PROFILE_PASSWORD_START,
	GET_SITE_CONFIGURATION_START,
	UPDATE_LOGO,
	UPDATE_APP_SETTING,
	UPDATE_REFERRAL,
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
	updateReferralRequest,
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
		console.warn('Error is updating site configuration.');
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
		console.warn('Error in update settings');
	}
}

function* updateLogoWorker(action) {
	try {
		const data = action && action.payload;
		yield uploadLogoRequest(objectToFormData(data));

		showToastr({
			message: `Logo uploaded successfully`,
			type: 'success',
		});
	} catch (e) {
		console.warn('Error while uploading logo');
	}
}

function* updateReferralWorker(action) {
	try {
		const data = action && action.payload;

		yield updateReferralRequest(data);
		const [key] = Object.keys(data || {});

		// For locally updating the state without api call.
		const { siteConfigDetails } = yield select((state) => state.ProfileData);
		const referralValue =
			typeof siteConfigDetails?.referral?.value === 'string'
				? JSON.parse(siteConfigDetails.referral.value)
				: siteConfigDetails?.referral?.value;
		const updatedSiteConfig = {
			...siteConfigDetails,
			referral: {
				...(siteConfigDetails?.referral || {}),
				value: {
					...(referralValue || {}),
					...(key === 'status'
						? { isActive: !referralValue?.isActive }
						: { [key]: data[key] }),
				},
			},
		};
		yield put(getSiteConfigurationSuccess(updatedSiteConfig));
		showToastr({
			message: `Referral settings updated successfully`,
			type: 'success',
		});
	} catch (e) {
		console.warn('Error while uploading logo');
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
	yield takeEvery(UPDATE_REFERRAL, updateReferralWorker);
}

function* ProfileDataSaga() {
	yield all([fork(ProfileDataWatcher)]);
}

export default ProfileDataSaga;
