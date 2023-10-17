import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import {
	CREATE_REVIEW_START,
	FETCH_REVIEW_MANAGEMENT_START,
} from './actionTypes';
import {
	createReviewFail,
	createReviewSuccess,
	fetchReviewManagementFail,
	fetchReviewManagementSuccess,
} from './actions';
import { getReviewManagement } from '../../network/getRequests';
import { createReview } from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';

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

function* createReviewWorker(action) {
	try {
		const { data } = action && action.payload;

		yield createReview(data);

		showToastr({
			message: `Review Created Successfully`,
			type: 'success',
		});

		yield put(createReviewSuccess());
	} catch (e) {
		yield put(createReviewFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* reviewManagementSaga() {
	yield takeEvery(FETCH_REVIEW_MANAGEMENT_START, fetchReviewManagement);
	yield takeEvery(CREATE_REVIEW_START, createReviewWorker);
}

export default reviewManagementSaga;
