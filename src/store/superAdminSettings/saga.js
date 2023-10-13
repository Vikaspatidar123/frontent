import { put, takeLatest, fork, all } from 'redux-saga/effects';

// Redux States
import { GET_SA_BANNERS, GET_DOCUMENT_LABEL } from './actionTypes';
import {
	getSABannersSuccess,
	getSABannersFail,
	getDocumentLabelSuccess,
	getDocumentLabelFail,
} from './actions';
import { getAllSABanners, getDocumentLabel } from '../../network/getRequests';

function* getAllSABannersWorker(action) {
	try {
		const { adminId, tenantId, limit, pageNo } = action && action.payload;

		const { data } = yield getAllSABanners({
			adminId,
			tenantId,
			limit,
			pageNo,
		});

		yield put(getSABannersSuccess(data?.data?.banners));
	} catch (e) {
		yield put(getSABannersFail(e?.response?.data?.errors[0]?.description));
	}
}

function* getDocumentLabelWorker(action) {
	try {
		const { userId } = action && action.payload;
		const { data } = yield getDocumentLabel(userId);
		yield put(getDocumentLabelSuccess(data?.data?.documentLabel));
	} catch (e) {
		yield put(getDocumentLabelFail(e?.response?.data?.errors[0]?.description));
	}
}

export function* getAllSABannersWatcher() {
	yield takeLatest(GET_SA_BANNERS, getAllSABannersWorker);
}

export function* getDocumentLabelWatcher() {
	yield takeLatest(GET_DOCUMENT_LABEL, getDocumentLabelWorker);
}

function* SASettingsSaga() {
	yield all([fork(getAllSABannersWatcher)]);
	yield all([fork(getDocumentLabelWatcher)]);
}

export default SASettingsSaga;
