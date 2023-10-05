import { call, put, takeLatest } from 'redux-saga/effects';
import { PERMISSIONS_START } from './actionTypes';
import { getPermissionDetails } from '../../../network/getRequests';
import { getPermissionsError, getPermissionsSuccess } from './actions';

export function* getPermissions() {
	try {
		let details = yield call(getPermissionDetails);
		details = details.data.data.adminDetails;
		yield put(getPermissionsSuccess(details));
	} catch (er) {
		yield put(getPermissionsError(`Unable to get roles ${er?.message || ''}`));
	}
}

export default function* PermissionDetails() {
	yield takeLatest(PERMISSIONS_START, getPermissions);
}
