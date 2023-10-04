import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getCasinoCategoryDetailSuccess, getCasinoCategoryDetailFailure, getCasinoSubCategoryDetailSuccess, getCasinoSubCategoryDetailFailure } from './actions';
import { GET_CASINO_CATEGORY_DATA, GET_CASINO_SUB_CATEGORY_DATA } from './actionTypes';

import { getCasinoCategoryListing, getCasinoSubCategoryListing } from '../../network/getRequests';

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
		yield put(getCasinoSubCategoryDetailFailure(error?.response?.data?.errors[0]?.description));
	}
}

export function* watchGetAdminsData() {
	yield takeLatest(GET_CASINO_CATEGORY_DATA, getCasinoCategoryWorker);
	yield takeLatest(GET_CASINO_SUB_CATEGORY_DATA, getCasinoSubCategoryWorker);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
