import { call, put, takeEvery } from 'redux-saga/effects';
import { clearEmptyProperty } from '../../utils/helpers';
// Login Redux States
import { FETCH_SPORTS_TRANSACTION_START } from './actionTypes';
import {
	fetchSportsTransactionFail,
	fetchSportsTransactionSuccess,
} from './actions';
import { getSportsTransaction } from '../../network/getRequests';

function* fetchSportsTransaction(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const response = yield call(getSportsTransaction, payload);
		yield put(
			fetchSportsTransactionSuccess(response?.data?.data?.transactionDetail)
		);
	} catch (error) {
		yield put(fetchSportsTransactionFail(error));
	}
}

function* sportsTransactionSaga() {
	yield takeEvery(FETCH_SPORTS_TRANSACTION_START, fetchSportsTransaction);
}

export default sportsTransactionSaga;
