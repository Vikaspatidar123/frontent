import {
	GET_PROJECTS_FAIL,
	GET_PROJECTS_SUCCESS,
	GET_PROJECT_DETAIL_FAIL,
	GET_PROJECT_DETAIL_SUCCESS,
	ADD_PROJECT_SUCCESS,
	ADD_PROJECT_FAIL,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAIL,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAIL,
} from './actionTypes';

const INIT_STATE = {
	projects: [],
	projectDetail: {},
	error: {},
	loading: true,
};

const projects = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_PROJECTS_SUCCESS:
			return {
				...state,
				projects: payload,
				loading: true,
			};

		case GET_PROJECTS_FAIL:
			return {
				...state,
				error: payload,
			};
		case ADD_PROJECT_SUCCESS:
			return {
				...state,
				projects: [...state.projects, payload],
			};

		case ADD_PROJECT_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_PROJECT_DETAIL_SUCCESS:
			return {
				...state,
				projectDetail: payload,
			};

		case UPDATE_PROJECT_SUCCESS:
			return {
				...state,
				projects: state.projects.map((project) =>
					project.id.toString() === payload.id.toString()
						? { project, ...payload }
						: project
				),
			};

		case UPDATE_PROJECT_FAIL:
			return {
				...state,
				error: payload,
			};

		case DELETE_PROJECT_SUCCESS:
			return {
				...state,
				projects: state.projects.filter(
					(project) => project.id.toString() !== payload.toString()
				),
			};

		case DELETE_PROJECT_FAIL:
			return {
				...state,
				error: payload,
			};

		case GET_PROJECT_DETAIL_FAIL:
			return {
				...state,
				error: payload,
			};

		default:
			return state;
	}
};

export default projects;
