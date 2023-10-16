import { call, put, takeLatest } from 'redux-saga/effects';
import { PERMISSIONS_START, SUPER_ADMIN_START } from './actionTypes';
import {
	getAdminDetails,
	getPermissionDetails,
} from '../../../network/getRequests';
import {
	getPermissionsError,
	getPermissionsSuccess,
	getSuperAdminFail,
	getSuperAdminSuccess,
} from './actions';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../progressLoading/actions';

export function* getPermissions({ payload }) {
	try {
		yield put(showLinearProgress());
		let details = yield call(getAdminDetails, payload);
		details = details.data.data.adminDetails;
		yield put(getPermissionsSuccess(details));
	} catch (er) {
		yield put(getPermissionsError(`Unable to get roles ${er?.message || ''}`));
	}
	yield put(resetLinearProgress());
}

export function* getSuperAdminPermissions() {
	try {
		let details = yield call(getPermissionDetails);
		details = details.data.data.adminDetails;
		yield put(getSuperAdminSuccess(details));
	} catch (er) {
		yield put(getSuperAdminFail(`Unable to get roles ${er?.message || ''}`));
	}
}

export default function* PermissionDetails() {
	yield takeLatest(PERMISSIONS_START, getPermissions);
	yield takeLatest(SUPER_ADMIN_START, getSuperAdminPermissions);
}
