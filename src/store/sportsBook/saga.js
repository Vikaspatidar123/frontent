import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getSportsListSuccess,
	getSportsListFail,
	getSportsCountriesSuccess,
	getSportsCountriesFail,
	getSportsTournamentListSuccess,
	getSportsTournamentListFail,
	updateStatusSuccess,
	updateStatusFail,
} from './actions';
import {
	GET_SPORTS_LIST,
	GET_SPORTS_COUNTRIES,
	GET_SPORTS_TOURNAMENT_LIST,
	UPDATE_STATUS_START,
} from './actionTypes';

import {
	getSportsList,
	getCountriesList,
	getTournamentsList,
} from '../../network/getRequests';

import { updateStatus } from '../../network/putRequests';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';

function* sportsListingWorker(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getSportsList(payload);
		yield put(getSportsListSuccess(data?.data?.sportsList));
	} catch (error) {
		yield put(getSportsListFail(error?.response?.data?.errors[0]?.description));
	}
}

function* sportsCountriesWorker(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getCountriesList(payload);
		yield put(getSportsCountriesSuccess(data?.data?.countryList));
	} catch (error) {
		yield put(
			getSportsCountriesFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* sportsTournamentListWorker(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getTournamentsList(payload);
		yield put(getSportsTournamentListSuccess(data?.data));
	} catch (error) {
		yield put(
			getSportsTournamentListFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateStatusWorker(action) {
	try {
		yield updateStatus(action.payload);
		yield put(updateStatusSuccess(action.payload));

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(updateStatusFail(e?.response?.data?.errors[0]?.description));
	}
}

export function* sportsListingWatcher() {
	yield takeLatest(GET_SPORTS_LIST, sportsListingWorker);
}

export function* sportsCountriesWatcher() {
	yield takeLatest(GET_SPORTS_COUNTRIES, sportsCountriesWorker);
}

export function* sportsTournamentListWatcher() {
	yield takeLatest(GET_SPORTS_TOURNAMENT_LIST, sportsTournamentListWorker);
}

export function* updateStatusWatcher() {
	yield takeLatest(UPDATE_STATUS_START, updateStatusWorker);
}

function* sportsBookSaga() {
	yield all([fork(sportsListingWatcher)]);
	yield all([fork(sportsCountriesWatcher)]);
	yield all([fork(sportsTournamentListWatcher)]);
	yield all([fork(updateStatusWatcher)]);
}

export default sportsBookSaga;
