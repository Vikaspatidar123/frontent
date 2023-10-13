import { put, takeLatest, all, fork } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
	getCasinoProvidersDataSuccess,
	getCasinoProvidersDataFailure,
	getCasinoCategoryDetailSuccess,
	getCasinoCategoryDetailFailure,
	getCasinoSubCategoryDetailSuccess,
	getCasinoSubCategoryDetailFailure,
	getCasinoGamesSuccess,
	getCasinoGamesFailure,
	getLanguagesSuccess,
	getLanguagesFailure,
	createCasinoProvidersSuccess,
	createCasinoProvidersFailure,
} from './actions';
import {
	GET_CASINO_CATEGORY_DATA,
	GET_CASINO_SUB_CATEGORY_DATA,
	GET_LANGUAGE_DATA_START,
	GET_CASINO_PROVIDERS_DATA,
	GET_CASINO_GAMES,
	CREATE_CASINO_PROVIDERS,
} from './actionTypes';

import {
	getAllCasinoGames,
	getAllCasinoProviders,
	getCasinoCategoryListing,
	getCasinoSubCategoryListing,
	getLanguages,
} from '../../network/getRequests';
import { showSnackbar } from '../snackbar/actions';
import { createCasinoProvider } from '../../network/postRequests';
import { objectToFormData } from '../../utils/objectToFormdata';

function* getCasinoCategoryWorker(action) {
	const { limit, pageNo, search = '' } = action && action.payload;
	try {
		const { data } = yield getCasinoCategoryListing({
			limit,
			pageNo,
			search,
		});
		yield put(getCasinoCategoryDetailSuccess(data?.data?.casinoCategories));
	} catch (error) {
		toast.error('Something Went wrong', { autoClose: 2000 });
		yield put(
			getCasinoCategoryDetailFailure(
				error?.response?.data?.errors[0]?.description
			)
		);
	}
}

function* getCasinoSubCategoryWorker(action) {
	const { limit, pageNo, gameCategoryId, search, isActive } =
		action && action.payload;
	try {
		const { data } = yield getCasinoSubCategoryListing({
			limit,
			pageNo,
			search,
			gameCategoryId,
			isActive,
		});
		yield put(getCasinoSubCategoryDetailSuccess(data?.data?.casinoSubCategory));
	} catch (error) {
		toast.error('Something Went wrong', { autoClose: 2000 });
		yield put(
			getCasinoSubCategoryDetailFailure(
				error?.response?.data?.errors[0]?.description
			)
		);
	}
}

function* getLanguagesWorker(action) {
	try {
		const { limit = '', pageNo = '', name = '' } = action && action.payload;

		const { data } = yield getLanguages({ limit, pageNo, name });

		yield put(getLanguagesSuccess(data?.data?.languages));
	} catch (error) {
		toast.error('Something Went wrong', { autoClose: 2000 });
		yield put(
			getLanguagesFailure(error?.response?.data?.errors[0].description)
		);
	}
}

function* getAllCasinoProvidersWorker(action) {
	try {
		const { limit, pageNo, search = '' } = action && action.payload;
		const { data } = yield getAllCasinoProviders({
			limit,
			pageNo,
			search,
		});
		yield put(getCasinoProvidersDataSuccess(data?.data?.providerList));
	} catch (e) {
		yield toast(e?.response?.data?.errors[0].description, 'error');
		yield put(
			getCasinoProvidersDataFailure(e?.response?.data?.errors[0].description)
		);
	}
}

function* getAllCasinoGamesWorker(action) {
	try {
		const {
			bonusId,
			limit,
			pageNo,
			casinoCategoryId,
			search,
			isActive,
			tenantId,
			selectedProvider,
			freespins,
			addGame,
			gameSubCategoryId,
			reorder,
		} = action && action.payload;

		const { data } = yield getAllCasinoGames({
			limit,
			pageNo,
			casinoCategoryId,
			search,
			isActive,
			tenantId,
			selectedProvider,
			freespins: freespins || '',
			bonusId: bonusId || '',
			addGame: addGame || false,
			gameSubCategoryId: gameSubCategoryId || '',
			reorder: reorder || 'false',
		});

		yield put(getCasinoGamesSuccess(data?.data?.casinoGames));
	} catch (e) {
		yield toast(e?.response?.data?.errors[0]?.description, 'error');

		yield put(getCasinoGamesFailure(e?.response?.data?.errors[0]?.description));
	}
}

function* createCasinoProviderWorker(action) {
	try {
		const { data } = action && action.payload;
		yield createCasinoProvider(objectToFormData(data));

		yield put(
			showSnackbar({
				message: `Provider Created Successfully`,
				type: 'success',
			})
		);

		yield put(createCasinoProvidersSuccess());
	} catch (e) {
		yield put(createCasinoProvidersFailure());

		yield put(
			showSnackbar({
				message: e?.response?.data?.errors[0]?.description || e.message,
				type: 'error',
			})
		);
	}
}

export function* casinoManagementWatcher() {
	yield takeLatest(GET_CASINO_CATEGORY_DATA, getCasinoCategoryWorker);
	yield takeLatest(GET_CASINO_SUB_CATEGORY_DATA, getCasinoSubCategoryWorker);
	yield takeLatest(GET_LANGUAGE_DATA_START, getLanguagesWorker);
	yield takeLatest(GET_CASINO_PROVIDERS_DATA, getAllCasinoProvidersWorker);
	yield takeLatest(GET_CASINO_GAMES, getAllCasinoGamesWorker);
	yield takeLatest(CREATE_CASINO_PROVIDERS, createCasinoProviderWorker);
}

function* CasinoManagementSaga() {
	yield all([fork(casinoManagementWatcher)]);
}

export default CasinoManagementSaga;
