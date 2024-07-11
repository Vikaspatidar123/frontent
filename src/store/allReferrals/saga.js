/* eslint-disable no-param-reassign */
import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import {
	EDIT_ALL_REFERRALS_START,
	FETCH_ALL_REFERRALS_START,
} from './actionTypes';
import { fetchAllReferralsFail, fetchAllReferralsSuccess } from './actions';
import { getAllReferrals } from '../../network/getRequests';
// import {
// 	updateNotification,
// } from '../../network/postRequests';
// import { showToastr } from '../../utils/helpers';

function* fetchAllReferrals({ payload }) {
	try {
		const response = yield call(getAllReferrals, payload);
		yield put(fetchAllReferralsSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchAllReferralsFail(error));
	}
}

function* editReferralSettingsWorker() {
	// try {
	// 	const { data, page, perPage } = action && action.payload;
	// 	delete data.language;
	// 	yield updateNotification(data);
	// 	yield put(fetchNotificationsStart({ page, perPage }));
	// 	showToastr({
	// 		message: `Notification Updated Successfully`,
	// 		type: 'success',
	// 	});
	// 	yield put(editNotificationSuccess());
	// } catch (e) {
	// 	yield put(editNotificationFail());
	// }
}

function* NotificationsSaga() {
	yield takeEvery(FETCH_ALL_REFERRALS_START, fetchAllReferrals);
	yield takeEvery(EDIT_ALL_REFERRALS_START, editReferralSettingsWorker);
}

export default NotificationsSaga;
