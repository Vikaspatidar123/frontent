import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_SPORTS_TRANSACTION_START } from './actionTypes';
import {
	fetchSportsTransactionFail,
	fetchSportsTransactionSuccess,
} from './actions';
import { getSportsTransaction } from '../../network/getRequests';

function* fetchSportsTransaction({ payload }) {
	try {
		const response = yield call(getSportsTransaction, payload);
		yield put(
			fetchSportsTransactionSuccess(response?.data?.data?.transactionDetail)
		);
	} catch (error) {
		yield put(fetchSportsTransactionFail(error));
	}
}

function* playersSaga() {
	yield takeEvery(FETCH_SPORTS_TRANSACTION_START, fetchSportsTransaction);
}

export default playersSaga;
