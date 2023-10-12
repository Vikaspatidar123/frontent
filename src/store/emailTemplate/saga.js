import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getAllEmailTemplatesSuccess,
	getAllEmailTemplatesFail,
} from './actions';
import { GET_ALL_EMAIL_TEMPLATES } from './actionTypes';

import { getEmailTemplates } from '../../network/getRequests';

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

export function* getEmailTemplateWatcher() {
	yield takeLatest(GET_ALL_EMAIL_TEMPLATES, getAllEmailTemplatesWorker);
}

function* EmailTemplateSaga() {
	yield all([fork(getEmailTemplateWatcher)]);
}

export default EmailTemplateSaga;
