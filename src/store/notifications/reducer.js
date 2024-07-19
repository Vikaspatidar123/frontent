import {
	FETCH_NOTIFICATIONS_FAIL,
	FETCH_NOTIFICATIONS_START,
	FETCH_NOTIFICATIONS_SUCCESS,
	CREATE_NOTIFICATIONS_FAIL,
	CREATE_NOTIFICATIONS_START,
	CREATE_NOTIFICATIONS_SUCCESS,
	EDIT_NOTIFICATIONS_START,
	EDIT_NOTIFICATIONS_SUCCESS,
	EDIT_NOTIFICATIONS_FAIL,
	RESET_NOTIFICATIONS_DATA,
	NOTIFY_PLAYERS_START,
	NOTIFY_PLAYERS_SUCCESS,
	NOTIFY_PLAYERS_FAIL,
} from './actionTypes';

const initialState = {
	notifications: null,
	error: '',
	loading: false,
	isCreateNotificationError: false,
	isCreateNotificationSuccess: false,
	isCreateNotificationLoading: false,
	isEditNotificationError: false,
	isEditNotificationSuccess: false,
	isEditNotificationLoading: false,
	notifyPlayerLoading: false,
	notifyPlayerSuccess: false,
};

const notificationReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_NOTIFICATIONS_START:
			return {
				...state,
				loading: true,
			};

		case FETCH_NOTIFICATIONS_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};

		case FETCH_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				loading: false,
				notifications: payload,
			};

		case RESET_NOTIFICATIONS_DATA:
			return {
				...state,
				loading: false,
				notifications: null,
				error: '',
			};

		case CREATE_NOTIFICATIONS_START:
			return {
				...state,
				isCreateNotificationLoading: true,
				isCreateNotificationSuccess: false,
			};

		case CREATE_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				isCreateNotificationLoading: false,
				isCreateNotificationSuccess: true,
			};

		case CREATE_NOTIFICATIONS_FAIL:
			return {
				...state,
				isCreateNotificationError: payload,
				isCreateNotificationLoading: false,
				isCreateNotificationSuccess: false,
			};

		case EDIT_NOTIFICATIONS_START:
			return {
				...state,
				isEditNotificationLoading: true,
				isEditNotificationSuccess: false,
			};

		case EDIT_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				isEditNotificationLoading: false,
				isEditNotificationSuccess: true,
			};

		case EDIT_NOTIFICATIONS_FAIL:
			return {
				...state,
				isEditNotificationError: payload,
				isEditNotificationLoading: false,
				isEditNotificationSuccess: false,
			};
		case NOTIFY_PLAYERS_START:
			return {
				...state,
				notifyPlayerLoading: true,
				notifyPlayerSuccess: false,
			};

		case NOTIFY_PLAYERS_SUCCESS:
			return {
				...state,
				notifyPlayerLoading: false,
				notifyPlayerSuccess: true,
			};
		case NOTIFY_PLAYERS_FAIL:
			return {
				...state,
				notifyPlayerLoading: false,
				notifyPlayerSuccess: false,
			};

		default:
			return { ...state };
	}
};

export default notificationReducer;
