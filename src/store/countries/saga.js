/* eslint-disable no-param-reassign */
import { call, put, takeEvery, select } from 'redux-saga/effects';

// Login Redux States
import {
	EDIT_COUNTRIES_START,
	FETCH_COUNTRIES_START,
	UPDATE_COUNTRIES_STATUS_START,
} from './actionTypes';
import {
	fetchCountriesFail,
	fetchCountriesSuccess,
	updateCountryStatusSuccess,
	updateCountryStatusFail,
	editCountryFail,
	editCountrySuccess,
} from './actions';
import { getCountries } from '../../network/getRequests';
import {
	editCountryDetails,
	superAdminViewToggleStatus,
} from '../../network/putRequests';
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
		const payload = action && action.payload;

		yield superAdminViewToggleStatus(payload);

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});

		const { countries } = yield select((state) => state.Countries);
		const updatedCountries = countries?.rows?.map((country) => {
			if (country?.countryId === payload.countryId) {
				country.status = payload.status;
			}
			return country;
		});

		yield put(
			fetchCountriesSuccess({
				...countries,
				rows: updatedCountries,
			})
		);

		yield put(updateCountryStatusSuccess());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(updateCountryStatusFail());
	}
}

function* editCountryWorker(action) {
	try {
		const { data } = action && action.payload;

		yield editCountryDetails(data);

		showToastr({
			message: 'Country updated Successfully',
			type: 'success',
		});

		yield put(editCountrySuccess());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(editCountryFail());
	}
}

function* countriesSaga() {
	yield takeEvery(FETCH_COUNTRIES_START, fetchCountries);
	yield takeEvery(UPDATE_COUNTRIES_STATUS_START, updateCountryStatusWorker);
	yield takeEvery(EDIT_COUNTRIES_START, editCountryWorker);
}

export default countriesSaga;
