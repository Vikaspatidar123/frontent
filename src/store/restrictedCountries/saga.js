import { call, put, takeEvery } from 'redux-saga/effects';
import {
	ADD_RESTRICTED_COUNTRIES_START,
	FETCH_RESTRICTED_COUNTRIES_START,
	FETCH_UNRESTRICTED_COUNTRIES_START,
} from './actionTypes';
import {
	addRestrictedCountriesFail,
	addRestrictedCountriesSuccess,
	fetchRestrictedCountriesFail,
	fetchRestrictedCountriesSuccess,
	fetchUnrestrictedCountriesFail,
	fetchUnrestrictedCountriesSuccess,
} from './actions';
import {
	fetchRestrictedCountries,
	fetchUnrestrictedCountries,
} from '../../network/getRequests';
import { addRestrictedCountriesCall } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';
import { removeRestrictedCountriesCall } from '../../network/deleteRequests';

function* fetchRestrictedCountriesWorker(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(fetchRestrictedCountries, payload);
		yield put(
			fetchRestrictedCountriesSuccess(response?.data?.data?.restrictedCountries)
		);
	} catch (error) {
		yield put(fetchRestrictedCountriesFail(error));
	}
}

function* fetchUnrestrictedCountriesWorker(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(fetchUnrestrictedCountries, payload);
		yield put(
			fetchUnrestrictedCountriesSuccess(
				response?.data?.data?.unrestrictedCountries
			)
		);
	} catch (e) {
		yield put(fetchUnrestrictedCountriesFail(e));
	}
}

function* addRestrictedCountriesWorker(action) {
	try {
		const payload = action && action.payload;
		if (payload.case === 'remove') {
			yield call(removeRestrictedCountriesCall, payload);
		} else {
			yield call(addRestrictedCountriesCall, payload);
		}
		yield put(addRestrictedCountriesSuccess());
		showToastr({
			message:
				payload.case === 'remove'
					? 'Restricted Country Removed Successfully'
					: 'Restricted Countries Updated Successfully',
			type: 'success',
		});
	} catch (error) {
		showToastr({
			message: error?.response?.data?.errors[0]?.description || error.message,
			type: 'error',
		});
		yield put(addRestrictedCountriesFail(error));
	}
}

function* restrictedCountriesSaga() {
	yield takeEvery(
		FETCH_RESTRICTED_COUNTRIES_START,
		fetchRestrictedCountriesWorker
	);
	yield takeEvery(
		FETCH_UNRESTRICTED_COUNTRIES_START,
		fetchUnrestrictedCountriesWorker
	);
	yield takeEvery(ADD_RESTRICTED_COUNTRIES_START, addRestrictedCountriesWorker);
}

export default restrictedCountriesSaga;
