import {
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAIL,
	ADD_EVENT_SUCCESS,
	ADD_EVENT_FAIL,
	UPDATE_EVENT_SUCCESS,
	UPDATE_EVENT_FAIL,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAIL,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAIL,
} from './actionTypes';

const INIT_STATE = {
	events: [],
	categories: [],
	error: {},
};

const Calendar = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_EVENTS_SUCCESS:
			return {
				...state,
				events: payload,
			};

		case GET_EVENTS_FAIL:
			return {
				...state,
				error: payload,
			};

		case ADD_EVENT_SUCCESS:
			return {
				...state,
				events: [...state.events, payload],
			};

		case ADD_EVENT_FAIL:
			return {
				...state,
				error: payload,
			};

		case UPDATE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.map((event) =>
					event.id.toString() === payload.id.toString()
						? { event, ...payload }
						: event
				),
			};

		case UPDATE_EVENT_FAIL:
			return {
				...state,
				error: payload,
			};

		case DELETE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.filter(
					(event) => event.id.toString() !== payload.toString()
				),
			};

		case DELETE_EVENT_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: payload,
			};

		case GET_CATEGORIES_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export default Calendar;
