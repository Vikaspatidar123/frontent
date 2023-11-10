/* eslint-disable default-case */
import { put, takeLatest, all, fork, select } from 'redux-saga/effects';

// Crypto Redux States
import {
	getSportsListSuccess,
	getSportsListFail,
	getSportsCountriesSuccess,
	getSportsCountriesFail,
	getSportsTournamentListSuccess,
	getSportsTournamentListFail,
	updateStatusSuccess,
	updateStatusFail,
	updateCompanyOddSuccess,
	getSportsMatchDetailSuccess,
	getSportsMatchDetailFail,
	getSportsMatchDetailStart,
	updateOdsVariationFail,
	updateOdsVariationSuccess,
	deatechOdsVariationFail,
	deatechOdsVariationSuccess,
} from './actions';
import {
	GET_SPORTS_LIST,
	GET_SPORTS_COUNTRIES,
	GET_SPORTS_TOURNAMENT_LIST,
	UPDATE_STATUS_START,
	UPDATE_COMPANYODD_START,
	DETACH_ODDSVARIATION_START,
	UPDATE_ODDSVARIATION_START,
	GET_SPORTS_MATCHESDETAIL_START,
} from './actionTypes';

import {
	getSportsList,
	getCountriesList,
	getTournamentsList,
	getSportsMatchesDetailApi,
} from '../../network/getRequests';

import {
	detachOddsVariationApi,
	updateCompanyOddApi,
	updateOddsVariationApi,
	updateStatus,
} from '../../network/putRequests';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';

function* sportsListingWorker(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getSportsList(payload);
		yield put(getSportsListSuccess(data?.data?.sportsList));
	} catch (error) {
		yield put(getSportsListFail(error?.response?.data?.errors[0]?.description));
	}
}

function* sportsCountriesWorker(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getCountriesList(payload);
		yield put(getSportsCountriesSuccess(data?.data?.countryList));
	} catch (error) {
		yield put(
			getSportsCountriesFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* sportsTournamentListWorker(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getTournamentsList(payload);
		yield put(getSportsTournamentListSuccess(data?.data));
	} catch (error) {
		yield put(
			getSportsTournamentListFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateStatusWorker(action) {
	try {
		const payload = action && action.payload;
		yield updateStatus(payload);
		yield put(updateStatusSuccess(payload));

		switch (payload.code) {
			case 'SPORTS': {
				const { sportsListInfo } = yield select((state) => state.SportsList);

				const updatedSportsList = sportsListInfo?.rows?.map((item) => {
					if (item.sportId === payload.sportId) {
						return {
							...item,
							isActive: payload.status,
						};
					}
					return item;
				});

				yield put(
					getSportsListSuccess({
						...sportsListInfo,
						rows: updatedSportsList,
					})
				);
				break;
			}
			case 'SPORTCONTRY': {
				const { sportsCountries } = yield select((state) => state.SportsList);

				const updatedCountryList = sportsCountries?.rows?.map((item) => {
					if (item.countryId === payload.sportCountryId) {
						return {
							...item,
							isActive: payload.status,
						};
					}
					return item;
				});

				yield put(
					getSportsCountriesSuccess({
						...sportsCountries,
						rows: updatedCountryList,
					})
				);
				break;
			}
		}

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(updateStatusFail(e?.response?.data?.errors[0]?.description));
	}
}

function* getSportsMatchesDetailWorker(action) {
	try {
		const { data } = yield getSportsMatchesDetailApi(action.payload);

		yield put(getSportsMatchDetailSuccess(data?.data));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(
			getSportsMatchDetailFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateOddsVariationWorker(action) {
	try {
		const { data } = yield updateOddsVariationApi(action.payload);
		if (action.payload.toggleModal) action.payload.toggleModal();
		if (action.payload.setVaryPercentage) action.payload.setVaryPercentage();
		yield put(updateOdsVariationSuccess(data?.data));
		yield put(getSportsMatchDetailStart({ matchId: action.payload.matchId }));
		yield;
		showToastr({
			message: data?.data?.message,
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(
			updateOdsVariationFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* detachOddsVariationWorker(action) {
	try {
		const { data } = yield detachOddsVariationApi(action.payload);
		if (action.payload.toggleDetachMarketModal)
			action.payload.toggleDetachMarketModal();
		yield put(deatechOdsVariationSuccess(data?.data));
		yield;
		showToastr({
			message: data?.data?.message,
			type: 'success',
		});
		yield put(getSportsMatchDetailStart({ matchId: action.payload.marketId }));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(
			deatechOdsVariationFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateCompanyOddWorker(action) {
	try {
		const { data } = yield updateCompanyOddApi(action.payload);
		yield;
		showToastr({
			message: data?.data?.message,
			type: 'success',
		});
		yield put(updateCompanyOddSuccess(action.payload));
		yield put(getSportsMatchDetailStart({ matchId: action.payload.matchId }));
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(
			updateOdsVariationFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

export function* sportsListingWatcher() {
	yield takeLatest(GET_SPORTS_LIST, sportsListingWorker);
}

export function* sportsCountriesWatcher() {
	yield takeLatest(GET_SPORTS_COUNTRIES, sportsCountriesWorker);
}

export function* sportsTournamentListWatcher() {
	yield takeLatest(GET_SPORTS_TOURNAMENT_LIST, sportsTournamentListWorker);
}

export function* updateStatusWatcher() {
	yield takeLatest(UPDATE_STATUS_START, updateStatusWorker);
}

export function* getSportsMatchesDetailWatcher() {
	yield takeLatest(
		GET_SPORTS_MATCHESDETAIL_START,
		getSportsMatchesDetailWorker
	);
}

export function* updateOddsVariationWatcher() {
	yield takeLatest(UPDATE_ODDSVARIATION_START, updateOddsVariationWorker);
}

export function* detachOddsVariationWatcher() {
	yield takeLatest(DETACH_ODDSVARIATION_START, detachOddsVariationWorker);
}

export function* updateCompanyOddWatcher() {
	yield takeLatest(UPDATE_COMPANYODD_START, updateCompanyOddWorker);
}

function* sportsBookSaga() {
	yield all([fork(sportsListingWatcher)]);
	yield all([fork(sportsCountriesWatcher)]);
	yield all([fork(sportsTournamentListWatcher)]);
	yield all([fork(updateStatusWatcher)]);
	yield all([fork(getSportsMatchesDetailWatcher)]);
	yield all([fork(updateOddsVariationWatcher)]);
	yield all([fork(detachOddsVariationWatcher)]);
	yield all([fork(updateCompanyOddWatcher)]);
}

export default sportsBookSaga;
