import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getCasinoCategoryDetailSuccess, getCasinoCategoryDetailFailure } from './actions';
import { GET_CASINO_CATEGORY_DATA } from './actionTypes';

import { getCasinoCategoryListing } from '../../network/getRequests';

function* getAdminsDetail(action) {
	const { limit, pageNo, orderBy, search, sort, status = '' } =
      action && action.payload
	try {
		const	{ data } = yield getCasinoCategoryListing({
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

export function* watchGetAdminsData() {
	yield takeLatest(GET_CASINO_CATEGORY_DATA, getAdminsDetail);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
