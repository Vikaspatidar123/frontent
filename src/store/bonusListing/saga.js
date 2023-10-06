import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getBonusDetailsSuccess, getBonusDetailsFail } from './actions';
import { GET_BONUS_DETAILS_DATA } from './actionTypes';

import { getAllBonus } from '../../network/getRequests';

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

export function* watchGetBonusData() {
	yield takeLatest(GET_BONUS_DETAILS_DATA, getBonusListingWorker);
}

function* BonusDetailsSaga() {
	yield all([fork(watchGetBonusData)]);
}

export default BonusDetailsSaga;
