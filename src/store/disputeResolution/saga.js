import { call, put, takeLatest } from 'redux-saga/effects';

// Login Redux States
import {
	FETCH_DISPUTE_DETAILS,
	FETCH_DISPUTES_START,
	SEND_MESSAGE,
} from './actionTypes';
import {
	fetchDisputeDetails,
	fetchDisputeFail,
	fetchDisputesFail,
	fetchDisputesSuccess,
	fetchDisputeSuccess,
	sendMessageSuccess,
} from './actions';
import { getDisputeDetails, getDisputes } from '../../network/getRequests';
import { sendMessageRequest } from '../../network/postRequests';

function* fetchDisputes({ payload }) {
	try {
		const response = yield call(getDisputes, payload);
		yield put(fetchDisputesSuccess(response.data.data));
	} catch (error) {
		yield put(fetchDisputesFail(error));
	}
}

function* fetchDisputeDetailsWorker({ payload }) {
	try {
		const response = yield call(getDisputeDetails, payload);
		yield put(fetchDisputeSuccess(response.data.data?.threadMessages));
	} catch (err) {
		yield put(fetchDisputeFail(err));
	}
}

function* sendMessageWorker({ payload: { data, setShowReplyForm } }) {
	try {
		yield call(sendMessageRequest, data);

		if (typeof setShowReplyForm === 'function') {
			setShowReplyForm('');
		}
		yield put(fetchDisputeDetails({ threadId: data.threadId }));
		yield put(sendMessageSuccess());
	} catch (error) {
		yield put(fetchDisputesFail(error));
	}
}
function* disputesSaga() {
	yield takeLatest(FETCH_DISPUTES_START, fetchDisputes);
	yield takeLatest(FETCH_DISPUTE_DETAILS, fetchDisputeDetailsWorker);
	yield takeLatest(SEND_MESSAGE, sendMessageWorker);
}

export default disputesSaga;
