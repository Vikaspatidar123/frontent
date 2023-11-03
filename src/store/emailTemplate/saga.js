/* eslint-disable */
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
	getDynamicKeysSuccess,
	getDynamicKeysFail,
	getEmailTypesSuccess,
	getEmailTypesFail,
	testEmailTemplateSuccess,
	testEmailTemplateFail,
	createEmailTemplateSuccess,
	createEmailTemplateFail,
	getEmailTemplateSuccess,
	getEmailTemplateFail,
	updateEmailTemplateSuccess,
	updateEmailTemplateFail,
	deleteEmailTemplateSuccess,
	deleteEmailTemplateFail,
} from './actions';

import {
	GET_ALL_EMAIL_TEMPLATES,
	GET_IMAGE_GALLERY,
	UPLOAD_IMAGE_GALLERY,
	DELETE_IMAGE_GALLERY,
	GET_DYNAMIC_KEYS,
	GET_EMAIL_TYPES,
	TEST_EMAIL_TEMPLATE,
	CREATE_EMAIL_TEMPLATE,
	GET_EMAIL_TEMPLATE,
	UPDATE_EMAIL_TEMPLATE,
	DELETE_EMAIL_TEMPLATE,
} from './actionTypes';

import {
	getEmailTemplates,
	getImageGalleryData,
	getEmailTypes,
	getEmailTemplate,
} from '../../network/getRequests';

import {
	testEmailTemplateEndPoint,
	createEmailTemplate,
} from '../../network/postRequests';

import { uploadGallery, updateEmailTemplate } from '../../network/putRequests';
import {
	deleteFromGallery,
	deleteEmailTemplate,
} from '../../network/deleteRequests';
import { showToastr } from '../../utils/helpers';
import { objectToFormData } from '../../utils/objectToFormdata';
import { emailDynamicOptions } from '../../pages/EmailTemplate/Constant';

function* getAllEmailTemplatesWorker(action) {
	try {
		const { data } = yield getEmailTemplates();
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

function* getDynamicKeysWorker(action) {
	try {
		const { type, emailTypes } = action && action.payload;
		const data = yield emailDynamicOptions({ type, emailTypes });
		yield put(getDynamicKeysSuccess(data));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(getDynamicKeysFail());
	}
}

function* getEmailTypesWorker() {
	try {
		const { data } = yield getEmailTypes();
		yield put(getEmailTypesSuccess(data?.data));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(getEmailTypesFail());
	}
}

function* testEmailTemplateWorker(action) {
	try {
		const { data, setIsTestTemplateModalVisible, setTestEmail } =
			action && action.payload;

		const res = yield testEmailTemplateEndPoint(data);

		yield put(testEmailTemplateSuccess());
		setIsTestTemplateModalVisible(false);
		setTestEmail('');
		res?.data?.data?.emailSent?.success
			? showToastr({
					message: 'Email Sent Successfully',
					type: 'success',
			  })
			: showToastr({
					message: 'Email Sending Unsuccessful',
					type: 'error',
			  });
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(testEmailTemplateFail());
	}
}

function* createEmailTemplateWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		yield createEmailTemplate(data);

		showToastr({
			message: 'Template Created Successfully',
			type: 'success',
		});

		yield put(createEmailTemplateSuccess());
		if (navigate) {
			navigate('/email-templates');
		}
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(createEmailTemplateFail());
	}
}

function* getemailTemplateWorker(action) {
	try {
		const emailTemplateId = action && action.payload;

		const { data } = yield getEmailTemplate(emailTemplateId);

		yield put(getEmailTemplateSuccess(data?.data?.emailTemplate));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(getEmailTemplateFail());
	}
}

function* updateEmailTemplateWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		yield updateEmailTemplate(data);

		showToastr({
			message: 'Template Updated Successfully',
			type: 'success',
		});

		yield put(updateEmailTemplateSuccess());

		if (navigate) {
			navigate('/email-templates');
		}
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(updateEmailTemplateFail());
	}
}

function* deleteTemplateWorker(action) {
	try {
		const data = action && action.payload;
		yield deleteEmailTemplate(data);

		yield getEmailTemplates();
		yield put(deleteEmailTemplateSuccess());

		showToastr({
			message: 'Template Deleted Successfully',
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(deleteEmailTemplateFail());
	}
}

export function* getEmailTemplateWatcher() {
	yield takeLatest(GET_ALL_EMAIL_TEMPLATES, getAllEmailTemplatesWorker);
	yield takeLatest(GET_IMAGE_GALLERY, getImageGalleryWorker);
	yield takeLatest(UPLOAD_IMAGE_GALLERY, uploadImageGalleryWorker);
	yield takeLatest(DELETE_IMAGE_GALLERY, deleteFromGalleryWorker);
	yield takeLatest(GET_DYNAMIC_KEYS, getDynamicKeysWorker);
	yield takeLatest(GET_EMAIL_TYPES, getEmailTypesWorker);
	yield takeLatest(TEST_EMAIL_TEMPLATE, testEmailTemplateWorker);
	yield takeLatest(CREATE_EMAIL_TEMPLATE, createEmailTemplateWorker);
	yield takeLatest(GET_EMAIL_TEMPLATE, getemailTemplateWorker);
	yield takeLatest(UPDATE_EMAIL_TEMPLATE, updateEmailTemplateWorker);
	yield takeLatest(DELETE_EMAIL_TEMPLATE, deleteTemplateWorker);
}

function* EmailTemplateSaga() {
	yield all([fork(getEmailTemplateWatcher)]);
}

export default EmailTemplateSaga;
