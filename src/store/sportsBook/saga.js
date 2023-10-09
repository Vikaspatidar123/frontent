import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getSportsListSuccess, getSportsListFail } from './actions';
import { GET_SPORTS_LIST } from './actionTypes';

import { getSportsList } from '../../network/getRequests';

function* sportsListingWorker(action) {
	try {
		const { data } = yield getSportsList(action.payload);
		yield put(getSportsListSuccess(data?.data?.sportsList));
	} catch (error) {
		yield put(getSportsListFail(error?.response?.data?.errors[0]?.description));
	}
}

export function* sportsListingWatcher() {
	yield takeLatest(GET_SPORTS_LIST, sportsListingWorker);
}

function* sportsBookSaga() {
	yield all([fork(sportsListingWatcher)]);
}

export default sportsBookSaga;
