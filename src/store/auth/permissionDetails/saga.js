import { call, put, takeLatest } from 'redux-saga/effects';
import { PERMISSIONS_START } from './actionTypes';
import { getAdminRole } from '../../../network/getRequests';
import { getPermissionsError, getPermissionsSuccess } from './actions';

export function* getRoles() {
	try {
		let roles = yield call(getAdminRole);
		roles = roles.data.data.roles;
		yield put(getPermissionsSuccess(roles));
	} catch (er) {
		yield put(getPermissionsError(`Unable to get roles ${er?.message || ''}`));
	}
}

export default function* rolesWatcherSaga() {
	yield takeLatest(PERMISSIONS_START, getRoles);
}
