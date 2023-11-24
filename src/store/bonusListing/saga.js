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
	getBonusSuccess,
	getBonusFailure,
	deleteBonusComplete,
	deleteBonusFailure,
} from './actions';
import {
	DELETE_BONUS_START,
	GET_BONUS_CURRENCY_CONVERSION,
	GET_BONUS_DETAILS_DATA,
	GET_BONUS_START,
	UPDATE_SA_BONUS_STATUS,
} from './actionTypes';

import {
	getAllBonus,
	getBonus,
	getBonusCurrenciesConvertAmount,
} from '../../network/getRequests';
import { superAdminViewToggleStatus } from '../../network/putRequests';
import { showToastr, clearEmptyProperty } from '../../utils/helpers';
import { deleteBonus } from '../../network/deleteRequests';

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

function* getBonusStartWorker(action) {
	try {
		const { bonusId, userBonusId = '' } = action && action.payload;
		const { data } = yield getBonus({ bonusId, userBonusId });
		yield put(getBonusSuccess(data?.data?.bonusDetails));
	} catch (error) {
		showToastr({
			message: error?.response?.data?.errors[0]?.description || error.message,
			type: 'error',
		});
		yield put(getBonusFailure(error?.response?.data?.errors[0]?.description));
	}
}

function* deleteBonusWorker(action) {
	try {
		const { data, handleClose } = action && action.payload;
		const { balanceBonus, bonusId } = data;
		const resData = yield deleteBonus({ bonusId, balanceBonus });
		yield put(deleteBonusComplete());
		showToastr({
			message: resData?.data?.data?.message,
			type: 'success',
		});
		if (handleClose) {
			handleClose();
		}
	} catch (error) {
		showToastr({
			message: error?.response?.data?.errors[0]?.description || error.message,
			type: 'error',
		});
		yield put(
			deleteBonusFailure(error?.response?.data?.errors[0]?.description)
		);
	}
}

export function* watchBonusData() {
	yield takeLatest(GET_BONUS_START, getBonusStartWorker);
	yield takeLatest(DELETE_BONUS_START, deleteBonusWorker);
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
