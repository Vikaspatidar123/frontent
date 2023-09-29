import { API_SUCCESS, API_FAIL, GET_WALLET_DATA } from './actionType';

const INIT_STATE = {
	walletbalanceData: [],
};

const DashboardCrypto = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case API_SUCCESS:
			switch (payload.actionType) {
				case GET_WALLET_DATA:
					return {
						...state,
						walletbalanceData: payload.data,
					};
				default:
					return state;
			}
		case API_FAIL:
			switch (payload.actionType) {
				case GET_WALLET_DATA:
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

export default DashboardCrypto;
