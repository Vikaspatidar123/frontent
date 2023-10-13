import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getAdminDetailsSuccess,
	getAdminDetailsFail,
	addSuperAdminUserSuccess,
	addSuperAdminUserFail,
	updateSuperAdminUserSuccess,
	updateSuperAdminUserFail,
} from './actions';
import {
	GET_ADMINS_DATA,
	ADD_SUPER_ADMIN_USER,
	UPDATE_SUPER_ADMIN_USER,
} from './actionTypes';

import { getAllAdmins } from '../../network/getRequests';
import { addSuperAdminUser } from '../../network/postRequests';
import { showSnackbar } from '../snackbar/actions';
import { updateSuperAdminUser } from '../../network/putRequests';

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

function* addSuperAdminUserWorker(action) {
	try {
		const { data } = action && action.payload;

		yield addSuperAdminUser(data);

		yield put(
			showSnackbar({
				message: `${data?.role} Created Successfully`,
				type: 'success',
			})
		);

		yield put(addSuperAdminUserSuccess());

		// navigate(AdminsRoutes.Admins)
	} catch (e) {
		yield put(addSuperAdminUserFail());

		yield put(
			showSnackbar({
				message: e?.response?.data?.errors[0]?.description || e.message,
				type: 'error',
			})
		);
	}
}

function* updateSuperAdminUserWorker(action) {
	try {
		const { data } = action && action.payload;

		yield updateSuperAdminUser(data);

		yield put(
			showSnackbar({
				message: `${data?.role} Updated Successfully`,
				type: 'success',
			})
		);

		yield put(updateSuperAdminUserSuccess());

		// navigate(AdminsRoutes.Admins)
	} catch (e) {
		yield put(updateSuperAdminUserFail());

		yield put(
			showSnackbar({
				message: e?.response?.data?.errors[0]?.description || e.message,
				type: 'error',
			})
		);
	}
}

export function* watchGetAdminsData() {
	yield takeLatest(GET_ADMINS_DATA, getAdminsDetail);
	yield takeLatest(ADD_SUPER_ADMIN_USER, addSuperAdminUserWorker);
	yield takeLatest(UPDATE_SUPER_ADMIN_USER, updateSuperAdminUserWorker);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
