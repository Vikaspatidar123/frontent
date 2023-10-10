import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getSportsListSuccess,
	getSportsListFail,
	getSportsCountriesSuccess,
	getSportsCountriesFail,
	getSportsTournamentListSuccess,
	getSportsTournamentListFail,
} from './actions';
import {
	GET_SPORTS_LIST,
	GET_SPORTS_COUNTRIES,
	GET_SPORTS_TOURNAMENT_LIST,
} from './actionTypes';

import {
	getSportsList,
	getCountriesList,
	getTournamentsList,
} from '../../network/getRequests';

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

function* sportsTournamentListWorker(action) {
	try {
		const { data } = yield getTournamentsList(action.payload);
		yield put(getSportsTournamentListSuccess(data?.data));
	} catch (error) {
		yield put(
			getSportsTournamentListFail(error?.response?.data?.errors[0]?.description)
		);
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
function* sportsBookSaga() {
	yield all([fork(sportsListingWatcher)]);
	yield all([fork(sportsCountriesWatcher)]);
	yield all([fork(sportsTournamentListWatcher)]);
}

export default sportsBookSaga;
