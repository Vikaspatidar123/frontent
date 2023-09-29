import {
	GET_MAILS_LIST_FAIL,
	GET_MAILS_LIST_SUCCESS,
	GET_SELECTED_MAILS_SUCCESS,
	GET_SELECTED_MAILS_FAIL,
	SET_FOLDER_SELECTED_MAILS_SUCCESS,
	SET_FOLDER_SELECTED_MAILS_FAIL,
	SELECT_FOLDER_SUCCESS,
	SELECT_FOLDER_FAIL,
	UPDATE_MAIL_SUCCESS,
	UPDATE_MAIL_FAIL,
} from './actionTypes';

const INIT_STATE = {
	mailslists: [],
	error: {},
	selectedmails: [],
	folderId: [],
	folders: [],
	loading: true,
};

const Mails = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_MAILS_LIST_SUCCESS:
			return {
				...state,
				mailslists: payload,
				loading: true,
			};

		case GET_MAILS_LIST_FAIL:
			return {
				...state,
				error: payload,
			};

		case SELECT_FOLDER_SUCCESS:
			return {
				...state,
				folders: payload,
			};

		case SELECT_FOLDER_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_SELECTED_MAILS_SUCCESS:
			return {
				...state,
				selectedmails: [],
			};

		case GET_SELECTED_MAILS_FAIL:
			return {
				...state,
				error: payload,
			};

		case UPDATE_MAIL_SUCCESS:
			return {
				...state,
				mailslists: state.mailslists.map((mail) =>
					mail.id.toString() === payload.id.toString()
						? { ...mail, ...payload }
						: mail
				),
			};

		case UPDATE_MAIL_FAIL:
			return {
				...state,
				error: payload,
			};

		case SET_FOLDER_SELECTED_MAILS_SUCCESS:
			return {
				...state,
				selectedmails: state.selectedmails,
				folderId: payload,
			};

		case SET_FOLDER_SELECTED_MAILS_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default Mails;
