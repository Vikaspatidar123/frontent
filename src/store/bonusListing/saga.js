import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getBonusDetailsSuccess,
	getBonusDetailsFail,
	updateSABonusStatusSuccess,
	updateSABonusStatusFail,
} from './actions';
import { GET_BONUS_DETAILS_DATA, UPDATE_SA_BONUS_STATUS } from './actionTypes';

import { getAllBonus } from '../../network/getRequests';
import { superAdminViewToggleStatus } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

function* getBonusListingWorker(action) {
	const {
		adminId = '',
		tenantId = '',
		limit = '',
		pageNo = '',
		bonusType = '',
		isActive = '',
		search = '',
		userId = '',
		reorder = false,
	} = action && action.payload;
	try {
		const { data } = yield getAllBonus({
			adminId,
			tenantId,
			limit,
			pageNo,
			bonusType,
			isActive,
			search,
			userId,
			reorder,
		});

		yield put(getBonusDetailsSuccess(data?.data?.bonus));
	} catch (error) {
		yield put(
			getBonusDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateSABonusStatusWorker(action) {
	try {
		const {
			// adminId,
			// tenantId,
			// limit,
			// pageNo,
			// bonusType,
			// isActive,
			// search,
			data,
		} = action && action.payload;

		yield superAdminViewToggleStatus(data);
		yield put(updateSABonusStatusSuccess());

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(updateSABonusStatusFail());
	}
}

export function* watchBonusData() {
	yield takeLatest(GET_BONUS_DETAILS_DATA, getBonusListingWorker);
	yield takeLatest(UPDATE_SA_BONUS_STATUS, updateSABonusStatusWorker);
}

function* BonusDetailsSaga() {
	yield all([fork(watchBonusData)]);
}

export default BonusDetailsSaga;
