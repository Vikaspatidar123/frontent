import { call, put, takeEvery } from 'redux-saga/effects';
import {
	FETCH_RESTRICTED_COUNTRIES_START,
	FETCH_UNRESTRICTED_COUNTRIES_START,
} from './actionTypes';
import {
	fetchRestrictedCountriesFail,
	fetchRestrictedCountriesSuccess,
	fetchUnrestrictedCountriesFail,
	fetchUnrestrictedCountriesSuccess,
} from './actions';
import {
	fetchRestrictedCountries,
	fetchUnrestrictedCountries,
} from '../../network/getRequests';

function* fetchRestrictedCountriesWorker(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(fetchRestrictedCountries, payload);
		yield put(
			fetchRestrictedCountriesSuccess(response?.data?.data?.restrictedCountries)
		);
	} catch (error) {
		yield put(fetchRestrictedCountriesFail(error));
	}
}

function* fetchUnrestrictedCountriesWorker(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(fetchUnrestrictedCountries, payload);
		yield put(
			fetchUnrestrictedCountriesSuccess(response?.data?.data?.transactionDetail)
		);
	} catch (error) {
		yield put(fetchUnrestrictedCountriesFail(error));
	}
}

function* restrictedCountriesSaga() {
	yield takeEvery(
		FETCH_RESTRICTED_COUNTRIES_START,
		fetchRestrictedCountriesWorker
	);
	yield takeEvery(
		FETCH_UNRESTRICTED_COUNTRIES_START,
		fetchUnrestrictedCountriesWorker
	);
}

export default restrictedCountriesSaga;
