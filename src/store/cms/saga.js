import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getAllCmsDetailsSuccess,
	getAllCmsDetailsFail,
	getAllCmsDetails,
	updateSaCmsStatusSuccess,
	updateSaCmsStatusFail,
} from './actions';
import { GET_ALL_CMS_DATA, UPDATE_SA_CMS_STATUS } from './actionTypes';

import { getAllCms } from '../../network/getRequests';
import { superAdminViewToggleStatus } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

function* getCmsDetails(action) {
	const { pageNo, limit, search, isActive } = action && action.payload;

	try {
		const { data } = yield getAllCms({
			limit,
			pageNo,
			search,
			isActive,
		});
		yield put(getAllCmsDetailsSuccess(data?.data?.cmsPages));
	} catch (error) {
		yield put(
			getAllCmsDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateSACMSStatusWorker(action) {
	try {
		const { data, limit, pageNo, tenantId, adminId, search, isActive } =
			action && action.payload;

		yield superAdminViewToggleStatus(data);

		showToastr({
			message: 'CMS Status Updated Successfully',
			type: 'success',
		});

		yield put(updateSaCmsStatusSuccess());
		yield put(
			getAllCmsDetails({
				limit,
				pageNo,
				tenantId,
				adminId,
				search,
				isActive,
			})
		);
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(updateSaCmsStatusFail());
	}
}

export function* watchGetAllCmsData() {
	yield takeLatest(GET_ALL_CMS_DATA, getCmsDetails);
	yield takeLatest(UPDATE_SA_CMS_STATUS, updateSACMSStatusWorker);
}

function* CmsDetailsSaga() {
	yield all([fork(watchGetAllCmsData)]);
}

export default CmsDetailsSaga;
