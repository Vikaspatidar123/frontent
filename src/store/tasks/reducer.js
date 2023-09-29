import {
	GET_TASKS_SUCCESS,
	GET_TASKS_FAIL,
	DELETE_KANBAN,
	DELETE_KANBAN_SUCCESS,
	DELETE_KANBAN_FAIL,
	ADD_CARD_DATA_SUCCESS,
	ADD_CARD_DATA_FAIL,
	UPDATE_CARD_DATA_SUCCESS,
	UPDATE_CARD_DATA_FAIL,
} from './actionTypes';

const INIT_STATE = {
	tasks: [],
	error: {},
	loading: true,
};

const tasks = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_TASKS_SUCCESS:
			return {
				...state,
				tasks: payload,
				loading: true,
			};

		case GET_TASKS_FAIL:
			return {
				...state,
				error: payload,
			};

		case ADD_CARD_DATA_SUCCESS:
			return {
				...state,

				tasks: state.tasks.map((task) => {
					if (task.id === payload.kanId) {
						return {
							...task,
							cards: [...task.cards, payload],
						};
					}
					return task;
				}),
			};

		case ADD_CARD_DATA_FAIL:
			return {
				...state,
				error: payload,
			};

		case UPDATE_CARD_DATA_SUCCESS:
			return {
				...state,
				tasks: state.tasks.map((task) => {
					if (task.id === payload.kanId) {
						return {
							...task,
							cards: task.cards.map((card) =>
								card.id.toString() === payload.id.toString()
									? { card, ...payload }
									: card
							),
						};
					}
					return task;
				}),
			};

		case UPDATE_CARD_DATA_FAIL:
			return {
				...state,
				error: payload,
			};

		case DELETE_KANBAN:
			return {
				...state,
				tasks: state.tasks.map((task) => {
					const updatedCards = task.cards.filter((tsk) => tsk.id !== payload);
					return { ...task, cards: updatedCards };
				}),
			};

		case DELETE_KANBAN_SUCCESS:
			return {
				...state,
				tasks: state.tasks.filter(
					(task) => task.id.toString() !== payload.toString()
				),
			};

		case DELETE_KANBAN_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default tasks;
