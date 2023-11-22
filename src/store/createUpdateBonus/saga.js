/* eslint-disable no-param-reassign */
import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Create Bonus Redux States
import { serialize } from 'object-to-formdata';
import { createBonusSuccess, createBonusFail } from './actions';
import { CREATE_BONUS } from './actionTypes';

import { clearEmptyProperty } from '../../utils/helpers';
import { createBonusCall } from '../../network/postRequests';

function* createBonusWorker(action) {
	try {
		let payload = action && action.payload;
		payload = clearEmptyProperty(payload);
		payload = serialize(payload);
		const { data } = yield createBonusCall(payload);

		yield put(createBonusSuccess(data?.data));
	} catch (error) {
		yield put(
			createBonusFail(
				error?.response?.data?.errors[0]?.description || error.message
			)
		);
	}
}

export function* crudBonusWorker() {
	yield takeLatest(CREATE_BONUS, createBonusWorker);
}

function* CreateBonusSaga() {
	yield all([fork(crudBonusWorker)]);
}

export default CreateBonusSaga;
