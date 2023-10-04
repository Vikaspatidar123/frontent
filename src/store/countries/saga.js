import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_COUNTRIES_START } from './actionTypes';
import { fetchCountriesFail, fetchCountriesSuccess } from './actions';
import { fetchCountriesApi } from '../../helpers/countries_helper';

function* fetchCountries({ payload }) {
	try {
		const response = yield call(fetchCountriesApi, payload);
		console.log('COUNTRIES DATA', response);
		yield put(fetchCountriesSuccess(response));
	} catch (error) {
		yield put(fetchCountriesFail(error));
	}
}

function* authSaga() {
	yield takeEvery(FETCH_COUNTRIES_START, fetchCountries);
}

export default authSaga;
