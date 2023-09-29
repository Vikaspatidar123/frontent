import { API_SUCCESS, API_FAIL, GET_CHARTS_DATA } from './actionTypes';

const INIT_STATE = {
	chartsData: [],
};

const Dashboard = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case API_SUCCESS:
			switch (payload.actionType) {
				case GET_CHARTS_DATA:
					return {
						...state,
						chartsData: payload.data,
					};
				default:
					return state;
			}
		case API_FAIL:
			switch (payload.actionType) {
				case GET_CHARTS_DATA:
					return {
						...state,
						chartsDataError: payload.error,
					};

				default:
					return state;
			}
		default:
			return state;
	}
};

export default Dashboard;
