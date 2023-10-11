import { put, takeLatest, fork, all } from 'redux-saga/effects';

// Redux States
import { GET_SA_BANNERS } from './actionTypes';
import { getSABannersSuccess, getSABannersFail } from './actions';
import { getAllSABanners } from '../../network/getRequests';

function* getAllSABannersWorker(action) {
	try {
		const { adminId, tenantId, limit, pageNo } = action && action.payload;

		const { data } = yield getAllSABanners({
			adminId,
			tenantId,
			limit,
			pageNo,
		});

		console.log('data: ', data);
		yield put(getSABannersSuccess(data?.data?.banners));
	} catch (e) {
		yield put(getSABannersFail(e?.response?.data?.errors[0]?.description));
	}
}

export function* getAllSABannersWatcher() {
	yield takeLatest(GET_SA_BANNERS, getAllSABannersWorker);
}

function* SASettingsSaga() {
	yield all([fork(getAllSABannersWatcher)]);
}

export default SASettingsSaga;
