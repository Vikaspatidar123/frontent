import {
	GET_GROUPS_SUCCESS,
	GET_CHATS_SUCCESS,
	GET_GROUPS_FAIL,
	GET_CHATS_FAIL,
	GET_CONTACTS_SUCCESS,
	GET_CONTACTS_FAIL,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAIL,
	POST_ADD_MESSAGE_SUCCESS,
	POST_ADD_MESSAGE_FAIL,
	DELETE_MESSAGE_FAIL,
	DELETE_MESSAGE_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	chats: [],
	groups: [],
	contacts: [],
	messages: [],
	error: {},
	loading: true,
};

const Calendar = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_CHATS_SUCCESS:
			return {
				...state,
				chats: payload,
				loading: true,
			};

		case GET_CHATS_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_GROUPS_SUCCESS:
			return {
				...state,
				groups: payload,
			};

		case GET_GROUPS_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_CONTACTS_SUCCESS:
			return {
				...state,
				contacts: payload,
			};

		case GET_CONTACTS_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_MESSAGES_SUCCESS:
			return {
				...state,
				messages: payload,
				loading: true,
			};

		case GET_MESSAGES_FAIL:
			return {
				...state,
				error: payload,
			};

		case POST_ADD_MESSAGE_SUCCESS:
			return {
				...state,
				messages: state.messages.map((item) => ({
					...item,
					usermessages: [...item.usermessages, payload],
				})),
			};

		case POST_ADD_MESSAGE_FAIL:
			return {
				...state,
				error: payload,
			};
		case DELETE_MESSAGE_SUCCESS:
			return {
				...state,
				messages: state.messages.map((item) => ({
					...item,
					usermessages: item.usermessages.filter((data) => data.id !== payload),
				})),
			};
		case DELETE_MESSAGE_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default Calendar;
