import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { CREATE_CURRENCIES_START, FETCH_CURRENCIES_START } from './actionTypes';
import {
	createCurrencyFail,
	createCurrencySuccess,
	fetchCurrenciesFail,
	fetchCurrenciesSuccess,
} from './actions';
import { getCurrencies } from '../../network/getRequests';
import { showToastr } from '../toastr/actions';
import { createCurrency } from '../../network/postRequests';

function* fetchCurrencies({ payload }) {
	try {
		const response = yield call(getCurrencies, payload);
		yield put(fetchCurrenciesSuccess(response?.data?.data?.currencies));
	} catch (error) {
		yield put(fetchCurrenciesFail(error));
	}
}

function* createCurrencyWorker(action) {
	try {
		const { data } = action && action.payload;

		yield createCurrency(data);

		yield put(
			showToastr({
				message: `Currency Created Successfully`,
				type: 'success',
			})
		);

		yield put(createCurrencySuccess());
	} catch (e) {
		yield put(createCurrencyFail());

		yield put(
			showToastr({
				message: e?.response?.data?.errors[0]?.description || e.message,
				type: 'error',
			})
		);
	}
}

function* currenciesSaga() {
	yield takeEvery(FETCH_CURRENCIES_START, fetchCurrencies);
	yield takeEvery(CREATE_CURRENCIES_START, createCurrencyWorker);
}

// function* AdminDetailsSaga() {
// 	yield all([fork(watchGetAdminsData)]);
// }

export default currenciesSaga;
