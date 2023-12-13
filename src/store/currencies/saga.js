import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import {
	CREATE_CURRENCIES_START,
	EDIT_CURRENCIES_START,
	FETCH_CURRENCIES_START,
} from './actionTypes';
import {
	createCurrencyFail,
	createCurrencySuccess,
	editCurrencyFail,
	editCurrencySuccess,
	fetchCurrenciesFail,
	fetchCurrenciesSuccess,
} from './actions';
import { getCurrencies } from '../../network/getRequests';
import { createCurrency } from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import { updateCurrency } from '../../network/putRequests';
import { formPageTitle } from '../../components/Common/constants';

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

		showToastr({
			message: `Currency Created Successfully`,
			type: 'success',
		});

		window.localStorage.removeItem(formPageTitle.currencies);

		yield put(createCurrencySuccess());
	} catch (e) {
		yield put(createCurrencyFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editCurrencyWorker(action) {
	try {
		const { data } = action && action.payload;

		yield updateCurrency(data);

		showToastr({
			message: `Currency Updated Successfully`,
			type: 'success',
		});

		yield put(editCurrencySuccess());
	} catch (e) {
		yield put(editCurrencyFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* currenciesSaga() {
	yield takeEvery(FETCH_CURRENCIES_START, fetchCurrencies);
	yield takeEvery(CREATE_CURRENCIES_START, createCurrencyWorker);
	yield takeEvery(EDIT_CURRENCIES_START, editCurrencyWorker);
}

// function* AdminDetailsSaga() {
// 	yield all([fork(watchGetAdminsData)]);
// }

export default currenciesSaga;
