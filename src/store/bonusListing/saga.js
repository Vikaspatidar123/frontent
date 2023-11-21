/* eslint-disable no-param-reassign */
import { put, takeLatest, all, fork, select } from 'redux-saga/effects';

// Crypto Redux States
import {
	getBonusDetailsSuccess,
	getBonusDetailsFail,
	updateSABonusStatusSuccess,
	updateSABonusStatusFail,
	getBonusCurrencyConversionsSuccess,
	getBonusCurrencyConversionsFail,
} from './actions';
import {
	GET_BONUS_CURRENCY_CONVERSION,
	GET_BONUS_DETAILS_DATA,
	UPDATE_SA_BONUS_STATUS,
} from './actionTypes';

import {
	getAllBonus,
	getBonusCurrenciesConvertAmount,
} from '../../network/getRequests';
import { superAdminViewToggleStatus } from '../../network/putRequests';
import { showToastr, clearEmptyProperty } from '../../utils/helpers';

function* getBonusListingWorker(action) {
	try {
		let payload = action && action.payload;
		payload = clearEmptyProperty(payload);
		const { data } = yield getAllBonus(payload);

		yield put(getBonusDetailsSuccess(data?.data?.bonus));
	} catch (error) {
		yield put(
			getBonusDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateSABonusStatusWorker(action) {
	try {
		const payload = action && action.payload;

		yield superAdminViewToggleStatus(payload);
		yield put(updateSABonusStatusSuccess());

		const { bonusDetails } = yield select((state) => state.AllBonusDetails);

		const updatedBonusDetails = bonusDetails?.rows?.map((bonus) => {
			if (bonus.bonusId === payload.bonusId) {
				bonus.isActive = payload.status;
			}
			return bonus;
		});

		yield put(
			getBonusDetailsSuccess({
				...bonusDetails,
				rows: updatedBonusDetails,
			})
		);

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

function* getBonusCurrencyConversionsWorker(action) {
	try {
		let payload = action && action.payload;
		payload = clearEmptyProperty(payload);
		const { data } = yield getBonusCurrenciesConvertAmount(payload);
		yield put(getBonusCurrencyConversionsSuccess(data?.data?.currenciesAmount));
	} catch (error) {
		yield put(
			getBonusCurrencyConversionsFail(
				error?.response?.data?.errors[0]?.description
			)
		);
	}
}

export function* watchBonusData() {
	yield takeLatest(GET_BONUS_DETAILS_DATA, getBonusListingWorker);
	yield takeLatest(UPDATE_SA_BONUS_STATUS, updateSABonusStatusWorker);
	yield takeLatest(
		GET_BONUS_CURRENCY_CONVERSION,
		getBonusCurrencyConversionsWorker
	);
}

function* BonusDetailsSaga() {
	yield all([fork(watchBonusData)]);
}

export default BonusDetailsSaga;
