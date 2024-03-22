/* eslint-disable no-lonely-if */
import { call, put, takeEvery } from 'redux-saga/effects';
import { ADD_RESTRICTED_COUNTRIES_START } from './actionTypes';
import {
	addRestrictedCountriesFail,
	addRestrictedCountriesSuccess,
} from './actions';
import { showToastr } from '../../utils/helpers';
import {
	addGamesRestrictedCountries,
	addProviderRestrictedCountries,
	removeRestrictedCountriesGame,
	removeRestrictedCountriesProvider,
} from '../../network/postRequests';

function* addRestrictedCountriesWorker(action) {
	try {
		const payload = action && action.payload;
		const { type, operation } = payload;
		delete payload.type;
		delete payload.case;

		if (type === 'providers') {
			if (operation === 'remove') {
				delete payload.operation;
				yield call(removeRestrictedCountriesProvider, payload);
			} else {
				yield call(addProviderRestrictedCountries, payload);
			}
		} else {
			if (operation === 'remove') {
				delete payload.operation;
				yield call(removeRestrictedCountriesGame, payload);
			} else {
				yield call(addGamesRestrictedCountries, payload);
			}
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
		yield put(addRestrictedCountriesFail(error));
	}
}

function* restrictedCountriesSaga() {
	yield takeEvery(ADD_RESTRICTED_COUNTRIES_START, addRestrictedCountriesWorker);
}

export default restrictedCountriesSaga;
