import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getAllCmsDetailsSuccess, getAllCmsDetailsFail } from './actions';
import { GET_ALL_CMS_DATA } from './actionTypes';

import { getAllCms } from '../../network/getRequests';

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

export function* watchGetAllCmsData() {
	yield takeLatest(GET_ALL_CMS_DATA, getCmsDetails);
}

function* CmsDetailsSaga() {
	yield all([fork(watchGetAllCmsData)]);
}

export default CmsDetailsSaga;
