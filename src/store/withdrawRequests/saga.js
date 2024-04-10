import { call, put, takeEvery } from 'redux-saga/effects';
// Login Redux States
import { FETCH_WITHDRAW_REQUESTS_START } from './actionTypes';
import {
	fetchWithdrawRequestsFail,
	fetchWithdrawRequestsSuccess,
} from './actions';
import { getWithdrawRequests } from '../../network/getRequests';

function* fetchWithdrawRequests(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(getWithdrawRequests, payload);
		yield put(fetchWithdrawRequestsSuccess(response?.data?.data?.users));
	} catch (error) {
		yield put(fetchWithdrawRequestsFail(error));
	}
}

function* withdrawRequestsSaga() {
	yield takeEvery(FETCH_WITHDRAW_REQUESTS_START, fetchWithdrawRequests);
}

export default withdrawRequestsSaga;
