import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_REVIEW_MANAGEMENT_START } from './actionTypes';
import {
	fetchReviewManagementFail,
	fetchReviewManagementSuccess,
} from './actions';
import { getReviewManagement } from '../../network/getRequests';

function* fetchReviewManagement({ payload }) {
	try {
		const response = yield call(getReviewManagement, payload);
		yield put(
			fetchReviewManagementSuccess(response?.data?.data?.reviewDetails)
		);
	} catch (error) {
		yield put(fetchReviewManagementFail(error));
	}
}

function* reviewManagementSaga() {
	yield takeEvery(FETCH_REVIEW_MANAGEMENT_START, fetchReviewManagement);
}

export default reviewManagementSaga;
