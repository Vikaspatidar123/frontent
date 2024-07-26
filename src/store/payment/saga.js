/* eslint-disable no-param-reassign */
import { put, takeLatest, all, fork } from 'redux-saga/effects';
import { serialize } from 'object-to-formdata';
import {
	getPaymentListingSuccess,
	getPaymentListingFail,
	createPaymentSuccess,
	createPaymentFail,
	getPaymentDetailsSuccess,
	getPaymentDetailsFail,
	updatePaymentSuccess,
	updatePaymentFail,
	addPaymentProviderSuccess,
	addPaymentProviderFail,
} from './actions';
import {
	CREATE_PAYMENT_PROVIDER,
	GET_PAYMENT_DATA,
	GET_PAYMENT_DETAILS,
	UPDATE_PAYMENT_PROVIDER,
	ADD_PAYMENT_PROVIDER,
} from './actionTypes';

import { getPaymentDetails, getPaymentList } from '../../network/getRequests';
import { showToastr } from '../../utils/helpers';
import {
	addProviderCredentials,
	createPaymentProvider,
	updatePaymentProvider,
} from '../../network/postRequests';
import { filterEmptyPayload } from '../../network/networkUtils';

function* getPaymentWorker(action) {
	try {
		const { data } = yield getPaymentList(action.payload);
		yield put(getPaymentListingSuccess(data?.data));
	} catch (error) {
		yield put(
			getPaymentListingFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* getPaymentDetailsWorker(action) {
	try {
		const { data } = yield getPaymentDetails(action.payload);
		yield put(getPaymentDetailsSuccess(data?.data?.paymentProvider));
	} catch (error) {
		yield put(
			getPaymentDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* createPaymentProviderWorker({ payload }) {
	try {
		payload = serialize(filterEmptyPayload(payload), { indices: true });
		yield createPaymentProvider(payload);
		yield put(createPaymentSuccess(true));
		showToastr({
			message: 'Provider created successfully',
			type: 'success',
		});
	} catch (error) {
		yield put(createPaymentFail());
	}
}

function* updatePaymentProviderWorker({ payload }) {
	try {
		payload = serialize(filterEmptyPayload(payload), { indices: true });
		yield updatePaymentProvider(payload);
		yield put(updatePaymentSuccess(true));
		showToastr({
			message: 'Provider updated successfully',
			type: 'success',
		});
	} catch (error) {
		yield put(updatePaymentFail());
	}
}

function* addPaymentProviderWorker({ payload }) {
	try {
		payload = serialize(filterEmptyPayload(payload), { indices: true });
		yield addProviderCredentials(payload);
		yield put(addPaymentProviderSuccess(true));
		showToastr({
			message: 'Provider updated successfully',
			type: 'success',
		});
	} catch (error) {
		yield put(addPaymentProviderFail());
	}
}

export function* watchPaymentsData() {
	yield takeLatest(GET_PAYMENT_DATA, getPaymentWorker);
	yield takeLatest(CREATE_PAYMENT_PROVIDER, createPaymentProviderWorker);
	yield takeLatest(UPDATE_PAYMENT_PROVIDER, updatePaymentProviderWorker);
	yield takeLatest(GET_PAYMENT_DETAILS, getPaymentDetailsWorker);
	yield takeLatest(ADD_PAYMENT_PROVIDER, addPaymentProviderWorker);
}

function* PaymentsSaga() {
	yield all([fork(watchPaymentsData)]);
}

export default PaymentsSaga;
