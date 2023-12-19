import {
	// call,
	put,
	takeLatest,
} from 'redux-saga/effects';
import { ROLES_START } from './actionTypes';
// import { getAdminRole } from '../../../network/getRequests';
import { getRolesError, getRolesSuccess } from './actions';

export function* getRoles() {
	try {
		// let roles = yield call(getAdminRole);
		// roles = roles.data.data.roles;
		const roles = [
			{
				adminRoleId: 1,
				name: 'Super Admin',
				abbr: null,
				level: 1,
			},
			{
				adminRoleId: 2,
				name: 'Admin',
				abbr: null,
				level: 2,
			},
			{
				adminRoleId: 3,
				name: 'Manager',
				abbr: null,
				level: 3,
			},
		];
		yield put(getRolesSuccess(roles));
	} catch (er) {
		yield put(getRolesError(`Unable to get roles ${er?.message || ''}`));
	}
}

export default function* rolesWatcherSaga() {
	yield takeLatest(ROLES_START, getRoles);
}
