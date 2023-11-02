import { put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
	CREATE_AGGREGATORS_START,
	GET_AGGREGATORS_START,
	UPDATE_AGGREGATORS_STATUS_START,
} from './actionTypes';
import {
	getAggregatorsListSuccess,
	getAggregatorsListFailure,
	createAggregatorSuccess,
	createAggregatorFail,
	updateAggregatorStatusSuccess,
	updateAggregatorStatusFail,
} from './actions';
import { getAggregators } from '../../network/getRequests';
import { createAggregator } from '../../network/postRequests';
import { superAdminViewToggleStatus } from '../../network/putRequests';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';

function* getAggregatorsWorker(action) {
	try {
		const payload = clearEmptyProperty(action && action.payload);
		const { data } = yield getAggregators(payload);
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

		showToastr({
			message: `Aggregator Created Successfully`,
			type: 'success',
		});

		yield put(createAggregatorSuccess());
	} catch (e) {
		yield put(createAggregatorFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateSuperAdminAggregatorStatusWorker(action) {
	try {
		const { data, limit, pageNo } = action && action.payload;

		yield superAdminViewToggleStatus(data);

		yield put(updateAggregatorStatusSuccess());

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});

		yield getAggregators({ limit, pageNo });
	} catch (e) {
		yield put(updateAggregatorStatusFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* aggregatorsSaga() {
	yield takeEvery(GET_AGGREGATORS_START, getAggregatorsWorker);
	yield takeEvery(CREATE_AGGREGATORS_START, createAggregatorWorker);
	yield takeEvery(
		UPDATE_AGGREGATORS_STATUS_START,
		updateSuperAdminAggregatorStatusWorker
	);
}

export default aggregatorsSaga;
