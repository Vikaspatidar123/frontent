import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_CURRENCIES_START } from './actionTypes';
import { fetchCurrenciesFail, fetchCurrenciesSuccess } from './actions';
import { getCurrencies } from '../../network/getRequests';

function* fetchCurrencies({ payload }) {
	try {
		const response = yield call(getCurrencies, payload);
		yield put(fetchCurrenciesSuccess(response?.data?.data?.Currencies));
	} catch (error) {
		yield put(fetchCurrenciesFail(error));
	}
}

function* currenciesSaga() {
	yield takeEvery(FETCH_CURRENCIES_START, fetchCurrencies);
}

export default currenciesSaga;
