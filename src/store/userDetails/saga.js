import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getUserDetailsSuccess,
	getUserDetailsFail,
	getUserDocumentsSuccess,
	getUserDocumentsFail,
	getUserBonusSuccess,
	getUserBonusFail,
	getUserCommentsSuccess,
	getUserCommentsFail,
	createUserCommentSuccess,
	createUserCommentFail,
	resetUserLimitFail,
	resetUserLimitSuccess,
} from './actions';
import {
	CREATE_USER_COMMENT,
	GET_USER_BONUS,
	GET_USER_COMMENTS,
	GET_USER_DETAILS,
	GET_USER_DOCUMENTS,
	RESET_USER_LIMIT,
} from './actionTypes';
import {
	getCommentsList,
	getUserBonuses,
	getUserDetails,
	getUserDocument,
} from '../../network/getRequests';
import {
	createUserCommentEntry,
	resetUserLimitCall,
} from '../../network/postRequests';

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

function* getUserBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserBonuses(payload);

		yield put(getUserBonusSuccess(data?.data?.userBonus));
	} catch (e) {
		yield put(getUserBonusFail(e.message));
	}
}

function* getUserCommentsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getCommentsList(payload);

		yield put(getUserCommentsSuccess(data?.data?.comment));
	} catch (e) {
		yield put(getUserCommentsFail(e.message));
	}
}

function* createUserCommentWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield createUserCommentEntry(payload);

		yield put(createUserCommentSuccess(data?.data?.comment));
	} catch (e) {
		yield put(createUserCommentFail(e.message));
	}
}

function* resetUserLimitWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield resetUserLimitCall(payload);
		yield put(resetUserLimitSuccess(data?.data));
	} catch (e) {
		yield put(resetUserLimitFail(e.message));
	}
}

function* userDetailsWatcher() {
	yield takeLatest(GET_USER_DETAILS, getUserDetailsWorker);
	yield takeLatest(GET_USER_DOCUMENTS, getUserDocumentsWorker);
	yield takeLatest(GET_USER_BONUS, getUserBonusWorker);
	yield takeLatest(GET_USER_COMMENTS, getUserCommentsWorker);
	yield takeLatest(CREATE_USER_COMMENT, createUserCommentWorker);
	yield takeLatest(RESET_USER_LIMIT, resetUserLimitWorker);
}

function* UserDetailsSaga() {
	yield all([fork(userDetailsWatcher)]);
}

export default UserDetailsSaga;
