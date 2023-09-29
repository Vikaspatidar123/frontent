import { API_SUCCESS, API_FAIL, GET_STATISTICS_DATA } from './actionType';

const INIT_STATE = {
	statistic_data: [],
};

const DashboardJob = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case API_SUCCESS:
			switch (payload.actionType) {
				case GET_STATISTICS_DATA:
					return {
						...state,
						statistic_data: payload.data,
					};
				default:
					return state;
			}
		case API_FAIL:
			switch (payload.actionType) {
				case GET_STATISTICS_DATA:
					return {
						...state,
						error: payload.error,
					};
				default:
					return state;
			}
		default:
			return state;
	}
};

export default DashboardJob;
