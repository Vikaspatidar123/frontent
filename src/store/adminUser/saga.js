/* eslint-disable no-param-reassign */
import { takeLatest, put, select } from 'redux-saga/effects';
import { getAllGroups } from '../../network/getRequests';

import { superAdminViewToggleStatus } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

import {
	updateSuperAdminStatusSuccess,
	updateSuperAdminStatusFailure,
	getAllGroupsSuccess,
	getAllGroupsFailure,
} from './actions';

import { getAllAdminsSuccess } from '../actions';

import {
	GET_ALL_GROUP_START,
	UPDATE_SUPER_ADMIN_STATUS_START,
} from './actionTypes';

function* updateSuperAdminStatusWorker(action) {
	try {
		const { payload } = action;

		yield superAdminViewToggleStatus(payload);

		yield put(updateSuperAdminStatusSuccess());

		const { adminDetails } = yield select((state) => state.AllAdmins);

		const newAdminRow = adminDetails?.staff?.map((admin) => {
			if (parseInt(admin?.id, 10) === payload.adminId) {
				admin.isActive = payload.status;
			}
			return admin;
		});

		yield put(
			getAllAdminsSuccess({
				...adminDetails,
				staff: newAdminRow,
			})
		);

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(updateSuperAdminStatusFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getAllGroupsWorker() {
	try {
		const { data } = yield getAllGroups();
		yield put(getAllGroupsSuccess(data?.data?.groupNames));
	} catch (e) {
		yield put(getAllGroupsFailure(e?.response?.data?.errors[0]?.description));
	}
}

export default function* adminUserWatcher() {
	yield takeLatest(GET_ALL_GROUP_START, getAllGroupsWorker);
	yield takeLatest(
		UPDATE_SUPER_ADMIN_STATUS_START,
		updateSuperAdminStatusWorker
	);
}
