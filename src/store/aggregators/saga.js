import { put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CREATE_AGGREGATORS_START, GET_AGGREGATORS_START } from './actionTypes';
import {
	getAggregatorsListSuccess,
	getAggregatorsListFailure,
	createAggregatorSuccess,
	createAggregatorFail,
} from './actions';
import { getAggregators } from '../../network/getRequests';
import { showToastr } from '../toastr/actions';
import { createAggregator } from '../../network/postRequests';

function* getAggregatorsWorker(action) {
	try {
		const { limit, pageNo } = action && action.payload;
		const { data } = yield getAggregators({
			limit,
			pageNo,
		});
		yield put(getAggregatorsListSuccess(data?.data?.aggregators));
	} catch (e) {
		yield toast(e?.response?.data?.errors[0].description, 'error');

		yield put(
			getAggregatorsListFailure(e?.response?.data?.errors[0].description)
		);
	}
}

function* createAggregatorWorker(action) {
	try {
		const { data } = action && action.payload;

		yield createAggregator(data);

		yield put(
			showToastr({
				message: `Aggregator Created Successfully`,
				type: 'success',
			})
		);

		yield put(createAggregatorSuccess());
	} catch (e) {
		yield put(createAggregatorFail());

		yield put(
			showToastr({
				message: e?.response?.data?.errors[0]?.description || e.message,
				type: 'error',
			})
		);
	}
}

function* aggregatorsSaga() {
	yield takeEvery(GET_AGGREGATORS_START, getAggregatorsWorker);
	yield takeEvery(CREATE_AGGREGATORS_START, createAggregatorWorker);
}

export default aggregatorsSaga;
