import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { getAdminDetailsSuccess, getAdminDetailsFail } from './actions';
import { GET_ADMINS_DATA } from './actionTypes';

import { getAllAdmins } from '../../network/getRequests';

function* getAdminsDetail(action) {
	const {
		limit,
		pageNo,
		orderBy,
		search,
		sort,
		adminRoleId,
		status = '',
	} = action && action.payload;
	try {
		const { data } = yield getAllAdmins({
			limit,
			pageNo,
			orderBy,
			search,
			sort,
			adminRoleId,
			status,
		});
		yield put(getAdminDetailsSuccess(data?.data?.adminDetails));
	} catch (error) {
		yield put(
			getAdminDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

export function* watchGetAdminsData() {
	yield takeLatest(GET_ADMINS_DATA, getAdminsDetail);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
