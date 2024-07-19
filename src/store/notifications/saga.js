/* eslint-disable no-param-reassign */
import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import {
	CREATE_NOTIFICATIONS_START,
	EDIT_NOTIFICATIONS_START,
	FETCH_NOTIFICATIONS_START,
	NOTIFY_PLAYERS_START,
} from './actionTypes';
import {
	createNotificationFail,
	createNotificationSuccess,
	editNotificationFail,
	editNotificationSuccess,
	fetchNotificationsFail,
	fetchNotificationsStart,
	fetchNotificationsSuccess,
	notifyPlayersFail,
	notifyPlayersSuccess,
} from './actions';
import { getNotifications } from '../../network/getRequests';
import {
	createNotification,
	updateNotification,
	notifyPlayersRequest,
} from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import { formPageTitle } from '../../components/Common/constants';
import { objectToFormData } from '../../utils/objectToFormdata';

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

function* notifyPlayersWorker(action) {
	try {
		const { payload, navigate } = action && action.payload;
		yield notifyPlayersRequest(objectToFormData(payload));

		showToastr({
			message: `Players notified Successfully`,
			type: 'success',
		});

		if (navigate) {
			navigate('/notifications');
		}

		yield put(notifyPlayersSuccess());
	} catch (e) {
		yield put(notifyPlayersFail());
	}
}

function* NotificationsSaga() {
	yield takeEvery(FETCH_NOTIFICATIONS_START, fetchNotifications);
	yield takeEvery(CREATE_NOTIFICATIONS_START, createNotificationWorker);
	yield takeEvery(EDIT_NOTIFICATIONS_START, editNotificationWorker);
	yield takeEvery(NOTIFY_PLAYERS_START, notifyPlayersWorker);
}

export default NotificationsSaga;
