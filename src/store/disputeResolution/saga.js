import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_DISPUTES_START } from './actionTypes';
import { fetchDisputesFail, fetchDisputesSuccess } from './actions';
import { getDisputes } from '../../network/getRequests';

function* fetchDisputes({ payload }) {
	try {
		const response = yield call(getDisputes, payload);
		yield put(fetchDisputesSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchDisputesFail(error));
	}
}

function* disputesSaga() {
	yield takeEvery(FETCH_DISPUTES_START, fetchDisputes);
}

export default disputesSaga;
