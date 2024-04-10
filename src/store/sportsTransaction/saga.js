import { call, put, takeEvery } from 'redux-saga/effects';
// Login Redux States
import { FETCH_SPORTS_TRANSACTION_START } from './actionTypes';
import {
	fetchSportsTransactionFail,
	fetchSportsTransactionSuccess,
} from './actions';
import { getSportsTransaction } from '../../network/getRequests';

function* fetchSportsTransaction(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(getSportsTransaction, payload);
		yield put(fetchSportsTransactionSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchSportsTransactionFail(error));
	}
}

function* sportsTransactionSaga() {
	yield takeEvery(FETCH_SPORTS_TRANSACTION_START, fetchSportsTransaction);
}

export default sportsTransactionSaga;
