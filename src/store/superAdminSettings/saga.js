import { put, takeLatest, fork, all } from 'redux-saga/effects';

// Redux States
import {
	GET_SA_BANNERS,
	GET_DOCUMENT_LABEL,
	CREATE_SA_BANNERS_START,
} from './actionTypes';
import {
	getSABannersSuccess,
	getSABannersFail,
	getDocumentLabelSuccess,
	getDocumentLabelFail,
	createSABannersSuccess,
	createSABannersFail,
} from './actions';
import { getAllSABanners, getDocumentLabel } from '../../network/getRequests';
import { objectToFormData } from '../../utils/objectToFormdata';
import { showToastr } from '../../utils/helpers';
import { createSABanners } from '../../network/postRequests';

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

function* createSABannersWorker(action) {
	try {
		const { data } = action && action.payload;
		yield createSABanners(objectToFormData(data));

		showToastr({
			message: `Banner Created Successfully`,
			type: 'success',
		});

		yield put(createSABannersSuccess());
	} catch (e) {
		yield put(createSABannersFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

export function* getAllSABannersWatcher() {
	yield takeLatest(GET_SA_BANNERS, getAllSABannersWorker);
}

export function* getDocumentLabelWatcher() {
	yield takeLatest(GET_DOCUMENT_LABEL, getDocumentLabelWorker);
}

export function* getSABannersWatcher() {
	yield takeLatest(CREATE_SA_BANNERS_START, createSABannersWorker);
}

function* SASettingsSaga() {
	yield all([fork(getAllSABannersWatcher)]);
	yield all([fork(getDocumentLabelWatcher)]);
	yield all([fork(getSABannersWatcher)]);
}

export default SASettingsSaga;
