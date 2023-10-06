import { put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { GET_AGGREGATORS_START } from './actionTypes';
import {
	getAggregatorsListSuccess,
	getAggregatorsListFailure,
} from './actions';
import { getAggregators } from '../../network/getRequests';

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
function* aggregatorsSaga() {
	yield takeEvery(GET_AGGREGATORS_START, getAggregatorsWorker);
}
export default aggregatorsSaga;
