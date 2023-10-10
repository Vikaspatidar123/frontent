import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_CASINO_TRANSACTIONS_START } from './actionTypes';
import {
	fetchCasinoTransactionsFail,
	fetchCasinoTransactionsSuccess,
} from './actions';
import { getCasinoTransactions } from '../../network/getRequests';

function* fetchCasinoTransactions({ payload }) {
	try {
		const response = yield call(getCasinoTransactions, payload);
		yield put(
			fetchCasinoTransactionsSuccess(response?.data?.data?.transactionDetail)
		);
	} catch (error) {
		yield put(fetchCasinoTransactionsFail(error));
	}
}

function* playersSaga() {
	yield takeEvery(FETCH_CASINO_TRANSACTIONS_START, fetchCasinoTransactions);
}

export default playersSaga;
