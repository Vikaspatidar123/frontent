/* eslint-disable no-param-reassign */
import { put, takeLatest, all, fork, select } from 'redux-saga/effects';

// Crypto Redux States
import {
	getBonusesSuccess,
	getBonusesFail,
	updateSABonusStatusSuccess,
	updateSABonusStatusFail,
	getBonusCurrencyConversionsSuccess,
	getBonusCurrencyConversionsFail,
	deleteBonusComplete,
	deleteBonusFailure,
	reorderBonusSuccess,
	reorderBonusFailure,
	getBonusDetailSuccess,
	getBonusDetailFail,
} from './actions';

import {
	DELETE_BONUS_START,
	GET_BONUS_CURRENCY_CONVERSION,
	GET_BONUSES_START,
	UPDATE_SA_BONUS_STATUS,
	REORDER_BONUS_START,
	GET_BONUS_DETAIL,
} from './actionTypes';

import {
	getAllBonus,
	getBonusCurrenciesConvertAmount,
	getBonusDetail,
} from '../../network/getRequests';
import { showToastr } from '../../utils/helpers';
import { deleteBonus } from '../../network/deleteRequests';
import { reorderBonus } from '../../network/postRequests';

function* getBonusListingWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getAllBonus(payload);

		yield put(getBonusesSuccess(data?.data));
	} catch (error) {
		yield put(getBonusesFail(error?.response?.data?.errors[0]?.description));
	}
}

function* updateSABonusStatusWorker(action) {
	try {
		const payload = action && action.payload;

		// yield superAdminViewToggleStatus(payload);
		yield put(updateSABonusStatusSuccess());

		const { bonusDetails } = yield select((state) => state.AllBonusDetails);

		const updatedBonusDetails = bonusDetails?.rows?.map((bonus) => {
			if (bonus.bonusId === payload.bonusId) {
				bonus.isActive = payload.status;
			}
			return bonus;
		});

		yield put(
			getBonusesSuccess({
				...bonusDetails,
				rows: updatedBonusDetails,
			})
		);

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(updateSABonusStatusFail());
	}
}

function* getBonusCurrencyConversionsWorker(action) {
	try {
		const payload = action && action.payload;
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

function* getBonusDetailStartWorker(action) {
	try {
		const { bonusId, bonusType = '' } = action && action.payload;
		const { data } = yield getBonusDetail({ bonusId, bonusType });
		yield put(getBonusDetailSuccess(data?.data?.bonusDetails));
	} catch (error) {
		yield put(
			getBonusDetailFail(error?.response?.data?.errors[0]?.description)
		);
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
		yield put(
			deleteBonusFailure(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateReorderBonusWorker(action) {
	try {
		const { data, navigate } = action && action.payload;

		yield reorderBonus(data);

		showToastr({
			message: 'Bonus Reorder succesfully',
			type: 'success',
		});

		yield put(reorderBonusSuccess());

		if (navigate) {
			navigate('/bonus');
		}
	} catch (e) {
		yield put(reorderBonusFailure(e?.response?.data?.errors[0]?.description));
	}
}

export function* watchBonusData() {
	yield takeLatest(GET_BONUS_DETAIL, getBonusDetailStartWorker);
	yield takeLatest(DELETE_BONUS_START, deleteBonusWorker);
	yield takeLatest(GET_BONUSES_START, getBonusListingWorker);
	yield takeLatest(UPDATE_SA_BONUS_STATUS, updateSABonusStatusWorker);
	yield takeLatest(
		GET_BONUS_CURRENCY_CONVERSION,
		getBonusCurrencyConversionsWorker
	);
	yield takeLatest(REORDER_BONUS_START, updateReorderBonusWorker);
}

function* BonusDetailsSaga() {
	yield all([fork(watchBonusData)]);
}

export default BonusDetailsSaga;
