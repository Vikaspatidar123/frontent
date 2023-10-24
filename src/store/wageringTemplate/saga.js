import { put, takeLatest, all, fork } from 'redux-saga/effects';
import { clearEmptyProperty } from '../../utils/helpers';
// Crypto Redux States
import {
	getWageringTemplateDetailsSuccess,
	getWageringTemplateDetailsFail,
} from './actions';
import { GET_WAGERING_TEMPLATE_DETAILS } from './actionTypes';

import { getSuperAdminWageringTemplate } from '../../network/getRequests';

function* getWageringTemplateDetailWorker(action) {
	try {
		const payload = clearEmptyProperty(action && action.payload);

		const { data } = yield getSuperAdminWageringTemplate(payload);

		yield put(getWageringTemplateDetailsSuccess(data?.data?.wageringTemplates));
	} catch (e) {
		yield put(getWageringTemplateDetailsFail(e.message));
	}
}

function* wageringTemplateWatcher() {
	yield takeLatest(
		GET_WAGERING_TEMPLATE_DETAILS,
		getWageringTemplateDetailWorker
	);
}

function* WageringTemplateDetailsSaga() {
	yield all([fork(wageringTemplateWatcher)]);
}

export default WageringTemplateDetailsSaga;
