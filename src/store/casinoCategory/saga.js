import { put, takeLatest, all, fork } from 'redux-saga/effects';
import { toast } from "react-toastify";

import { getCasinoCategoryDetailSuccess, getCasinoCategoryDetailFailure, getCasinoSubCategoryDetailSuccess, getCasinoSubCategoryDetailFailure, getLanguagesSuccess, getLanguagesFailure } from './actions';
import { GET_CASINO_CATEGORY_DATA, GET_CASINO_SUB_CATEGORY_DATA, GET_LANGUAGE_DATA_START } from './actionTypes';

import { getCasinoCategoryListing, getCasinoSubCategoryListing, getLanguages } from '../../network/getRequests';

function* getCasinoCategoryWorker(action) {
	const { limit, pageNo, orderBy, search, sort, status = '' } =
		action && action.payload
	try {
		const { data } = yield getCasinoCategoryListing({
			limit,
			pageNo,
			orderBy,
			search,
			sort,
			status
		})
		yield put(getCasinoCategoryDetailSuccess(data?.data?.casinoCategories));
	} catch (error) {
		toast.error("Something Went wrong", { autoClose: 2000 });
		yield put(getCasinoCategoryDetailFailure(error?.response?.data?.errors[0]?.description));
	}
}

function* getCasinoSubCategoryWorker(action) {
	const { limit, pageNo, gameCategoryId, search, isActive } =
		action && action.payload
	try {
		const { data } = yield getCasinoSubCategoryListing({
			limit,
			pageNo,
			search,
			gameCategoryId,
			isActive,
		})
		yield put(getCasinoSubCategoryDetailSuccess(data?.data?.casinoSubCategory));
	} catch (error) {
		toast.error("Something Went wrong", { autoClose: 2000 });
		yield put(getCasinoSubCategoryDetailFailure(error?.response?.data?.errors[0]?.description));
	}
}

function* getLanguagesWorker(action) {
	try {
		const { limit = '', pageNo = '', name = '' } = action && action.payload

		const { data } = yield getLanguages({ limit, pageNo, name })

		yield put(getLanguagesSuccess(data?.data?.languages))

	} catch (error) {
		toast.error("Something Went wrong", { autoClose: 2000 });
		yield put(getLanguagesFailure(error?.response?.data?.errors[0].description))
	}
}


export function* watchGetAdminsData() {
	yield takeLatest(GET_CASINO_CATEGORY_DATA, getCasinoCategoryWorker);
	yield takeLatest(GET_CASINO_SUB_CATEGORY_DATA, getCasinoSubCategoryWorker);
	yield takeLatest(GET_LANGUAGE_DATA_START, getLanguagesWorker);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
