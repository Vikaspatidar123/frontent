import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import {
	FETCH_COUNTRIES_START,
	UPDATE_COUNTRIES_STATUS_START,
} from './actionTypes';
import {
	fetchCountriesFail,
	fetchCountriesSuccess,
	fetchCountriesStart,
	updateCountryStatusSuccess,
	updateCountryStatusFail,
} from './actions';
import { getCountries } from '../../network/getRequests';
import { superAdminViewToggleStatus } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

function* fetchCountries({ payload }) {
	try {
		const response = yield call(getCountries, payload);
		yield put(fetchCountriesSuccess(response?.data?.data?.countries));
	} catch (error) {
		yield put(fetchCountriesFail(error));
	}
}

function* updateCountryStatusWorker(action) {
	try {
		const { data, limit, pageNo, isActive, name, kycMethod } =
			action && action.payload;

		yield superAdminViewToggleStatus(data);

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});

		yield fetchCountriesStart({
			limit,
			pageNo,
			isActive,
			name,
			kycMethod,
		});

		yield put(updateCountryStatusSuccess());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(updateCountryStatusFail());
	}
}

function* countriesSaga() {
	yield takeEvery(FETCH_COUNTRIES_START, fetchCountries);
	yield takeEvery(UPDATE_COUNTRIES_STATUS_START, updateCountryStatusWorker);
}

export default countriesSaga;
