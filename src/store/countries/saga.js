import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_COUNTRIES_START } from './actionTypes';
import { fetchCountriesFail, fetchCountriesSuccess } from './actions';
import { getCountries } from '../../network/getRequests';

function* fetchCountries({ payload }) {
	try {
		const response = yield call(getCountries, payload);
		yield put(fetchCountriesSuccess(response?.data?.data?.countries));
	} catch (error) {
		yield put(fetchCountriesFail(error));
	}
}

function* authSaga() {
	yield takeEvery(FETCH_COUNTRIES_START, fetchCountries);
}

export default authSaga;
