import {
	API_SUCCESS,
	API_FAIL,
	GET_TOP_SELLING_PRODUCT,
	GET_EARNING_DATA,
} from './actionType';

const INIT_STATE = {
	sellingData: [],
	earningChartData: [],
};

const DashboardSaas = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case API_SUCCESS:
			switch (payload.actionType) {
				case GET_TOP_SELLING_PRODUCT:
					return {
						...state,
						sellingData: payload.data,
					};

				case GET_EARNING_DATA:
					return {
						...state,
						earningChartData: payload.data,
					};
				default:
					return state;
			}
		case API_FAIL:
			switch (payload.actionType) {
				case GET_TOP_SELLING_PRODUCT:
					return {
						...state,
						sellingDataError: payload.error,
					};

				case GET_EARNING_DATA:
					return {
						...state,
						earningChartDataError: payload.error,
					};

				default:
					return state;
			}
		default:
			return state;
	}
};

export default DashboardSaas;
