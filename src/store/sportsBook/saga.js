import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getSportsListSuccess,
	getSportsListFail,
	getSportsCountriesSuccess,
	getSportsCountriesFail,
} from './actions';
import { GET_SPORTS_LIST, GET_SPORTS_COUNTRIES } from './actionTypes';

import { getSportsList, getCountriesList } from '../../network/getRequests';

function* sportsListingWorker(action) {
	try {
		const { data } = yield getSportsList(action.payload);
		yield put(getSportsListSuccess(data?.data?.sportsList));
	} catch (error) {
		yield put(getSportsListFail(error?.response?.data?.errors[0]?.description));
	}
}

function* sportsCountriesWorker(action) {
	try {
		const { data } = yield getCountriesList(action.payload);
		yield put(getSportsCountriesSuccess(data?.data?.countryList));
	} catch (error) {
		yield put(
			getSportsCountriesFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

export function* sportsListingWatcher() {
	yield takeLatest(GET_SPORTS_LIST, sportsListingWorker);
}

export function* sportsCountriesWatcher() {
	yield takeLatest(GET_SPORTS_COUNTRIES, sportsCountriesWorker);
}

function* sportsBookSaga() {
	yield all([fork(sportsListingWatcher)]);
	yield all([fork(sportsCountriesWatcher)]);
}

export default sportsBookSaga;
