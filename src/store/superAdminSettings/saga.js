import { put, takeLatest, fork, all } from 'redux-saga/effects';

// Redux States
import {
	GET_SA_BANNERS,
	GET_DOCUMENT_LABEL,
	CREATE_SA_BANNERS_START,
	CREATE_KYC_LABELS_START,
	EDIT_KYC_LABELS_START,
	EDIT_SA_BANNERS_START,
	GET_LOYALTY_LEVEL,
	UPDATE_LOYALTY_LEVEL,
	DELETE_SA_BANNERS_START,
} from './actionTypes';

import {
	getSABannersSuccess,
	getSABannersFail,
	getDocumentLabelSuccess,
	getDocumentLabelFail,
	createSABannersSuccess,
	createSABannersFail,
	createKYCLabelsSuccess,
	createKYCLabelsFail,
	editKYCLabelsSuccess,
	editKYCLabelsFail,
	editSABannersSuccess,
	editSABannersFail,
	getLoyaltyLevelSuccess,
	getLoyaltyLevelFail,
	updateLoyaltyLevelSuccess,
	updateLoyaltyLevelFail,
	getLoyaltyLevel,
	deleteSABannersSuccess,
	deleteSABannersFail,
} from './actions';

import {
	getAllSABanners,
	getDocumentLabelCall,
	getloyaltyLevel,
} from '../../network/getRequests';

import { objectToFormData } from '../../utils/objectToFormdata';
import { showToastr } from '../../utils/helpers';
import {
	createKYCLabels,
	createSABanners,
	updateKYCLabels,
} from '../../network/postRequests';

import { editBanners, updateloyaltyLevel } from '../../network/putRequests';

import { deleteSABanners } from '../../network/deleteRequests';
import { formPageTitle } from '../../components/Common/constants';

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
		const { data } = yield getDocumentLabelCall({ userId });
		yield put(getDocumentLabelSuccess(data?.data));
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

		window.localStorage.removeItem(formPageTitle.bannerManagement);

		yield put(createSABannersSuccess());
	} catch (e) {
		yield put(createSABannersFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* createKYCLabelsWorker(action) {
	try {
		const { data } = action && action.payload;
		yield createKYCLabels(data);

		showToastr({
			message: `Label Created Successfully`,
			type: 'success',
		});

		window.localStorage.removeItem(formPageTitle.kyc);
		yield put(createKYCLabelsSuccess());
	} catch (e) {
		yield put(createKYCLabelsFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editKYCLabelsWorker(action) {
	try {
		const { data } = action && action.payload;
		yield updateKYCLabels(data);

		showToastr({
			message: `Label Updated Successfully`,
			type: 'success',
		});

		yield put(editKYCLabelsSuccess());
	} catch (e) {
		yield put(editKYCLabelsFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editSABannersWorker(action) {
	try {
		const { data } = action && action.payload;
		yield editBanners(objectToFormData(data));

		showToastr({
			message: `Label Updated Successfully`,
			type: 'success',
		});

		yield put(editSABannersSuccess());
	} catch (e) {
		yield put(editSABannersFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getloyaltyLevelWorker() {
	try {
		const { data } = yield getloyaltyLevel();

		yield put(getLoyaltyLevelSuccess(data?.data?.loyaltyLevel));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(getLoyaltyLevelFail(e?.response?.data?.errors[0]?.description));
	}
}

function* updateloyaltyLevelWorker(action) {
	try {
		const { loyaltyLevel, isTenant, tenantId = '' } = action && action.payload;

		yield updateloyaltyLevel({
			isTenant,
			data: { loyaltyLevel: loyaltyLevel?.loyaltyLevel, tenantId },
		});

		yield put(updateLoyaltyLevelSuccess());

		showToastr({
			message: `Data Updated Successfully`,
			type: 'success',
		});
		yield put(getLoyaltyLevel({ isTenant }));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(updateLoyaltyLevelFail());
	}
}

function* deleteSABannersWorker(action) {
	try {
		const { bannerType } = action && action.payload;

		yield deleteSABanners({
			bannerType,
		});

		showToastr({
			message: 'Banner Deleted Successfully',
			type: 'success',
		});

		yield put(deleteSABannersSuccess());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(deleteSABannersFail());
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

export function* createKYCLabelsWatcher() {
	yield takeLatest(CREATE_KYC_LABELS_START, createKYCLabelsWorker);
}

export function* editKYCLabelsWatcher() {
	yield takeLatest(EDIT_KYC_LABELS_START, editKYCLabelsWorker);
}

export function* editSABannersWatcher() {
	yield takeLatest(EDIT_SA_BANNERS_START, editSABannersWorker);
}

export function* getLoyaltyLevelWatcher() {
	yield takeLatest(GET_LOYALTY_LEVEL, getloyaltyLevelWorker);
}

export function* updateLoyaltyLevelWatcher() {
	yield takeLatest(UPDATE_LOYALTY_LEVEL, updateloyaltyLevelWorker);
}

export function* deleteSABannersWatcher() {
	yield takeLatest(DELETE_SA_BANNERS_START, deleteSABannersWorker);
}

function* SASettingsSaga() {
	yield all([fork(getAllSABannersWatcher)]);
	yield all([fork(getDocumentLabelWatcher)]);
	yield all([fork(getSABannersWatcher)]);
	yield all([fork(createKYCLabelsWatcher)]);
	yield all([fork(editKYCLabelsWatcher)]);
	yield all([fork(editSABannersWatcher)]);
	yield all([fork(getLoyaltyLevelWatcher)]);
	yield all([fork(updateLoyaltyLevelWatcher)]);
	yield all([fork(deleteSABannersWatcher)]);
}

export default SASettingsSaga;
