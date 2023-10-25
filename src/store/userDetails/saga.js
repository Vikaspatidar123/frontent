import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getUserDetailsSuccess,
	getUserDetailsFail,
	getUserDocumentsSuccess,
	getUserDocumentsFail,
} from './actions';
import { GET_USER_DETAILS, GET_USER_DOCUMENTS } from './actionTypes';
import { getUserDetails, getUserDocument } from '../../network/getRequests';

function* getUserDetailsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDetails(payload);

		yield put(getUserDetailsSuccess(data?.data?.getUser));
	} catch (e) {
		yield put(getUserDetailsFail(e.message));
	}
}

function* getUserDocumentsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDocument(payload);

		yield put(getUserDocumentsSuccess(data?.data?.userDocument));
	} catch (e) {
		yield put(getUserDocumentsFail(e.message));
	}
}

function* userDetailsWatcher() {
	yield takeLatest(GET_USER_DETAILS, getUserDetailsWorker);
	yield takeLatest(GET_USER_DOCUMENTS, getUserDocumentsWorker);
}

function* UserDetailsSaga() {
	yield all([fork(userDetailsWatcher)]);
}

export default UserDetailsSaga;
