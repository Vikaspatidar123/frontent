import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getUserDetailsSuccess, getUserDetailsFail } from './actions';
import { GET_USER_DETAILS } from './actionTypes';
import { getUserDetails } from '../../network/getRequests';

function* getUserDetailsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDetails(payload);

		yield put(getUserDetailsSuccess(data?.data?.getUser));
	} catch (e) {
		yield put(getUserDetailsFail(e.message));
	}
}

function* userDetailsWatcher() {
	yield takeLatest(GET_USER_DETAILS, getUserDetailsWorker);
}

function* UserDetailsSaga() {
	yield all([fork(userDetailsWatcher)]);
}

export default UserDetailsSaga;
