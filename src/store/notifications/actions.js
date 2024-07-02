import {
	FETCH_NOTIFICATIONS_FAIL,
	FETCH_NOTIFICATIONS_START,
	FETCH_NOTIFICATIONS_SUCCESS,
	CREATE_NOTIFICATIONS_FAIL,
	CREATE_NOTIFICATIONS_START,
	CREATE_NOTIFICATIONS_SUCCESS,
	EDIT_NOTIFICATIONS_SUCCESS,
	EDIT_NOTIFICATIONS_FAIL,
	EDIT_NOTIFICATIONS_START,
	RESET_NOTIFICATIONS_DATA,
} from './actionTypes';

export const fetchNotificationsStart = (payload) => ({
	type: FETCH_NOTIFICATIONS_START,
	payload,
});

export const fetchNotificationsSuccess = (payload) => ({
	type: FETCH_NOTIFICATIONS_SUCCESS,
	payload,
});

export const fetchNotificationsFail = (history) => ({
	type: FETCH_NOTIFICATIONS_FAIL,
	payload: { history },
});

export const resetNotificationsData = (history) => ({
	type: RESET_NOTIFICATIONS_DATA,
	payload: { history },
});

export const createNotificationSuccess = (payload) => ({
	type: CREATE_NOTIFICATIONS_SUCCESS,
	payload,
});

export const createNotificationFail = (payload) => ({
	type: CREATE_NOTIFICATIONS_FAIL,
	payload,
});

export const createNotificationStart = (payload) => ({
	type: CREATE_NOTIFICATIONS_START,
	payload,
});

export const editNotificationSuccess = (payload) => ({
	type: EDIT_NOTIFICATIONS_SUCCESS,
	payload,
});

export const editNotificationFail = (payload) => ({
	type: EDIT_NOTIFICATIONS_FAIL,
	payload,
});

export const editNotificationStart = (payload) => ({
	type: EDIT_NOTIFICATIONS_START,
	payload,
});
