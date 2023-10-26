import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_SPORTS_MATCHES_START } from './actionTypes';
import { fetchSportsMatchesFail, fetchSportsMatchesSuccess } from './actions';
import { getSportsMatches } from '../../network/getRequests';
import { clearEmptyProperty } from '../../utils/helpers';

function* fetchSportsMatches(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const response = yield call(getSportsMatches, payload);
		yield put(fetchSportsMatchesSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchSportsMatchesFail(error));
	}
}

function* sportsMatchesSaga() {
	yield takeEvery(FETCH_SPORTS_MATCHES_START, fetchSportsMatches);
}

export default sportsMatchesSaga;
