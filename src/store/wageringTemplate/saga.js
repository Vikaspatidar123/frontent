import { put, takeLatest, all, fork } from 'redux-saga/effects';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';
// Crypto Redux States
import {
	getWageringTemplateDetailsSuccess,
	getWageringTemplateDetailsFail,
	createWageringTemplateDetailsSuccess,
	createWageringTemplateDetailsFail,
} from './actions';
import {
	GET_WAGERING_TEMPLATE_DETAILS,
	CREATE_WAGERING_TEMPLATE_DETAILS,
} from './actionTypes';

import { getSuperAdminWageringTemplate } from '../../network/getRequests';
import { createWageringTemplate } from '../../network/postRequests';

function* getWageringTemplateDetailWorker(action) {
	try {
		const payload = clearEmptyProperty(action && action.payload);

		const { data } = yield getSuperAdminWageringTemplate(payload);

		yield put(getWageringTemplateDetailsSuccess(data?.data?.wageringTemplates));
	} catch (e) {
		yield put(getWageringTemplateDetailsFail(e.message));
	}
}

function* createWageringTemplateWorker(action) {
	try {
		const { templateData, navigate } = action && action.payload;
		yield createWageringTemplate(templateData);

		showToastr({
			message: `Created Wagering Template Successfully`,
			type: 'success',
		});

		yield put(createWageringTemplateDetailsSuccess());

		if (navigate) yield navigate('/wagering-template');
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description,
			type: 'error',
		});
		yield put(createWageringTemplateDetailsFail());
	}
}

function* wageringTemplateWatcher() {
	yield takeLatest(
		GET_WAGERING_TEMPLATE_DETAILS,
		getWageringTemplateDetailWorker
	);
	yield takeLatest(
		CREATE_WAGERING_TEMPLATE_DETAILS,
		createWageringTemplateWorker
	);
}

function* WageringTemplateDetailsSaga() {
	yield all([fork(wageringTemplateWatcher)]);
}

export default WageringTemplateDetailsSaga;
