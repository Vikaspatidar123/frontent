import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getAllEmailTemplatesSuccess,
	getAllEmailTemplatesFail,
	getImageGallerySuccess,
	getImageGalleryFail,
	uploadImageGallerySuccess,
	uploadImageGalleryFail,
	getImageGallery,
	deleteImageGallerySuccess,
	deleteImageGalleryFail,
} from './actions';
import {
	GET_ALL_EMAIL_TEMPLATES,
	GET_IMAGE_GALLERY,
	UPLOAD_IMAGE_GALLERY,
	DELETE_IMAGE_GALLERY,
} from './actionTypes';

import {
	getEmailTemplates,
	getImageGalleryData,
} from '../../network/getRequests';
import { uploadGallery } from '../../network/putRequests';
import { deleteFromGallery } from '../../network/deleteRequests';
import { showToastr } from '../../utils/helpers';
import { objectToFormData } from '../../utils/objectToFormdata';

function* getAllEmailTemplatesWorker(action) {
	try {
		const { isTenant = false } = action && action.payload;
		const { data } = yield getEmailTemplates({ isTenant });
		yield put(getAllEmailTemplatesSuccess(data?.data));
	} catch (e) {
		yield put(
			getAllEmailTemplatesFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* getImageGalleryWorker() {
	try {
		const { data } = yield getImageGalleryData();
		yield put(getImageGallerySuccess(data?.data?.gallery));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(getImageGalleryFail());
	}
}

function* uploadImageGalleryWorker(action) {
	try {
		const data = action && action.payload;
		yield uploadGallery(objectToFormData(data));
		yield put(uploadImageGallerySuccess());

		showToastr({
			message: 'Image uploaded successfully',
			type: 'success',
		});
		yield put(getImageGallery());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(
			uploadImageGalleryFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* deleteFromGalleryWorker(action) {
	try {
		const data = action && action.payload;
		yield deleteFromGallery(data);
		yield put(deleteImageGallerySuccess());
		showToastr({
			message: 'Image deleted successfully',
			type: 'success',
		});
		yield put(getImageGallery());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(deleteImageGalleryFail());
	}
}

export function* getEmailTemplateWatcher() {
	yield takeLatest(GET_ALL_EMAIL_TEMPLATES, getAllEmailTemplatesWorker);
	yield takeLatest(GET_IMAGE_GALLERY, getImageGalleryWorker);
	yield takeLatest(UPLOAD_IMAGE_GALLERY, uploadImageGalleryWorker);
	yield takeLatest(DELETE_IMAGE_GALLERY, deleteFromGalleryWorker);
}

function* EmailTemplateSaga() {
	yield all([fork(getEmailTemplateWatcher)]);
}

export default EmailTemplateSaga;
