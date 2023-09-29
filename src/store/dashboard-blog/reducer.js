import { API_SUCCESS, API_FAIL, GET_VISITOR_DATA } from './actionType';

const INIT_STATE = {
	visitor: [],
};

const DashboardBlog = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case API_SUCCESS:
			switch (payload.actionType) {
				case GET_VISITOR_DATA:
					return {
						...state,
						visitor: payload.data,
					};
				default:
					return state;
			}
		case API_FAIL:
			switch (payload.actionType) {
				case GET_VISITOR_DATA:
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

export default DashboardBlog;
