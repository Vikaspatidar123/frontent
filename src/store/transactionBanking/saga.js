import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_TRANSACTION_BANKING_START } from './actionTypes';
import {
	fetchTransactionBankingFail,
	fetchTransactionBankingSuccess,
} from './actions';
import { getTransactionBanking } from '../../network/getRequests';

function* fetchTransactionBanking({ payload }) {
	try {
		const response = yield call(getTransactionBanking, payload);
		yield put(
			fetchTransactionBankingSuccess(response?.data?.data?.transactionDetail)
		);
	} catch (error) {
		yield put(fetchTransactionBankingFail(error));
	}
}

function* transactionBankingSaga() {
	yield takeEvery(FETCH_TRANSACTION_BANKING_START, fetchTransactionBanking);
}

export default transactionBankingSaga;
