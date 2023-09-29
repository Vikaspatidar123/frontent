import {
	GET_JOB_LIST_FAIL,
	GET_JOB_LIST_SUCCESS,
	ADD_JOB_LIST_SUCCESS,
	ADD_JOB_LIST_FAIL,
	UPDATE_JOB_LIST_SUCCESS,
	UPDATE_JOB_LIST_FAIL,
	DELETE_JOB_LIST_SUCCESS,
	DELETE_JOB_LIST_FAIL,
	GET_APPLY_JOB_SUCCESS,
	GET_APPLY_JOB_FAIL,
	DELETE_APPLY_JOB_SUCCESS,
	DELETE_APPLY_JOB_FAIL,
} from './actionTypes';

const INIT_STATE = {
	jobs: [],
	error: {},
	loading: true,
};

const JobReducer = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_JOB_LIST_SUCCESS:
			return {
				...state,
				jobs: payload,
				loading: true,
			};

		case GET_JOB_LIST_FAIL:
			return {
				...state,
				error: payload,
			};

		case ADD_JOB_LIST_SUCCESS:
			return {
				...state,
				jobs: [...state.jobs, payload],
			};

		case ADD_JOB_LIST_FAIL:
			return {
				...state,
				error: payload,
			};

		case UPDATE_JOB_LIST_SUCCESS:
			return {
				...state,
				jobs: state.jobs.map((job) =>
					job.id.toString() === payload.id.toString()
						? { job, ...payload }
						: job
				),
			};

		case UPDATE_JOB_LIST_FAIL:
			return {
				...state,
				error: payload,
			};

		case DELETE_JOB_LIST_SUCCESS:
			return {
				...state,
				jobs: state.jobs.filter(
					(job) => job.id.toString() !== payload.toString()
				),
			};

		case DELETE_JOB_LIST_FAIL:
			return {
				...state,
				error: payload,
			};
		case GET_APPLY_JOB_SUCCESS:
			return {
				...state,
				jobApply: payload,
				loading: true,
			};
		case GET_APPLY_JOB_FAIL:
			return {
				...state,
				error: payload,
			};
		case DELETE_APPLY_JOB_SUCCESS:
			return {
				...state,
				jobApply: state.jobApply.filter(
					(data) => data.id.toString() !== payload.toString()
				),
			};
		case DELETE_APPLY_JOB_FAIL:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export default JobReducer;
