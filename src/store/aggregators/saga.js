/* eslint-disable no-param-reassign */
import { put, select, takeEvery } from 'redux-saga/effects';
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
import { formPageTitle } from '../../components/Common/constants';

function* getAggregatorsWorker(action) {
	try {
		const payload = clearEmptyProperty(action && action.payload);
		const { data } = yield getAggregators(payload);
		yield put(getAggregatorsListSuccess(data?.data));
	} catch (e) {
		yield showToastr({
			message: e?.response?.data?.errors[0].description,
			type: 'error',
		});

		yield put(
			getAggregatorsListFailure(e?.response?.data?.errors[0].description)
		);
	}
}

function* createAggregatorWorker(action) {
	try {
		const { payload, handleCallback } = action && action.payload;
		yield createAggregator(payload);
		if (handleCallback) handleCallback();
		showToastr({
			message: `Aggregator Created Successfully`,
			type: 'success',
		});

		window.localStorage.removeItem(formPageTitle.aggregators);

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
		const payload = action && action.payload;

		yield superAdminViewToggleStatus(payload);

		yield put(updateAggregatorStatusSuccess());

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});

		const { aggregatorsData } = yield select(
			(state) => state.AggregatorsReducer
		);

		const updatedAggregatorsData = aggregatorsData?.aggregators?.map(
			(aggregator) => {
				if (aggregator.id === payload.gameAggregatorId) {
					aggregator.isActive = payload.status;
				}
				return aggregator;
			}
		);

		yield put(
			getAggregatorsListSuccess({
				...aggregatorsData,
				aggregators: updatedAggregatorsData,
			})
		);
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
