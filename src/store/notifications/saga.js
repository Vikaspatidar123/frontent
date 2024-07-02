/* eslint-disable no-param-reassign */
import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import {
	CREATE_NOTIFICATIONS_START,
	EDIT_NOTIFICATIONS_START,
	FETCH_NOTIFICATIONS_START,
} from './actionTypes';
import {
	createNotificationFail,
	createNotificationSuccess,
	editNotificationFail,
	editNotificationSuccess,
	fetchNotificationsFail,
	fetchNotificationsStart,
	fetchNotificationsSuccess,
} from './actions';
import { getNotifications } from '../../network/getRequests';
import {
	createNotification,
	updateNotification,
	// updateNotificationStatus,
} from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import { formPageTitle } from '../../components/Common/constants';

function* fetchNotifications({ payload }) {
	try {
		const response = yield call(getNotifications, payload);
		yield put(fetchNotificationsSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchNotificationsFail(error));
	}
}

function* createNotificationWorker(action) {
	try {
		const { data, page, perPage } = action && action.payload;

		delete data.language;

		yield createNotification(data);

		yield put(fetchNotificationsStart({ page, perPage }));

		showToastr({
			message: `Notification Created Successfully`,
			type: 'success',
		});

		window.localStorage.removeItem(formPageTitle.notification);

		yield put(createNotificationSuccess());
	} catch (e) {
		yield put(createNotificationFail());
	}
}

function* editNotificationWorker(action) {
	try {
		const { data, page, perPage } = action && action.payload;

		delete data.language;

		yield updateNotification(data);

		yield put(fetchNotificationsStart({ page, perPage }));

		showToastr({
			message: `Notification Updated Successfully`,
			type: 'success',
		});

		yield put(editNotificationSuccess());
	} catch (e) {
		yield put(editNotificationFail());
	}
}

function* NotificationsSaga() {
	yield takeEvery(FETCH_NOTIFICATIONS_START, fetchNotifications);
	yield takeEvery(CREATE_NOTIFICATIONS_START, createNotificationWorker);
	yield takeEvery(EDIT_NOTIFICATIONS_START, editNotificationWorker);
}

export default NotificationsSaga;
