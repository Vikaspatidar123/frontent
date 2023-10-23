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
	createCasinoCategorySuccess,
	createCasinoCategoryFailure,
	createCasinoSubCategorySuccess,
	createCasinoSubCategoryFailure,
	updateCasinoStatusSuccess,
	updateCasinoStatusFail,
	updateSACasinoGamesStatusSuccess,
	updateSACasinoGamesStatusFail,
	editCasinoCategorySuccess,
	editCasinoCategoryFailure,
	editCasinoProvidersSuccess,
	editCasinoProvidersFailure,
	editCasinoSubCategorySuccess,
	editCasinoSubCategoryFailure,
	editCasinoGamesSuccess,
	editCasinoGamesFailure,
} from './actions';

import {
	GET_CASINO_CATEGORY_DATA,
	GET_CASINO_SUB_CATEGORY_DATA,
	GET_LANGUAGE_DATA_START,
	GET_CASINO_PROVIDERS_DATA,
	GET_CASINO_GAMES,
	CREATE_CASINO_PROVIDERS,
	CREATE_CASINO_CATEGORY_START,
	CREATE_CASINO_SUBCATEGORY_START,
	UPDATE_CASINO_STATUS_START,
	UPDATE_SA_CASINO_GAMES_STATUS_START,
	EDIT_CASINO_CATEGORY,
	EDIT_CASINO_PROVIDERS,
	EDIT_CASINO_SUBCATEGORY_START,
	EDIT_CASINO_GAMES_START,
} from './actionTypes';

import {
	getAllCasinoGames,
	getAllCasinoProviders,
	getCasinoCategoryListing,
	getCasinoSubCategoryListing,
	getLanguages,
} from '../../network/getRequests';

import {
	createCasinoCategory,
	createCasinoProvider,
	createCasinoSubCategory,
} from '../../network/postRequests';

import {
	editCasinoCategory,
	editCasinoGames,
	editCasinoProvider,
	editCasinoSubCategory,
	superAdminViewToggleStatus,
} from '../../network/putRequests';
import { objectToFormData } from '../../utils/objectToFormdata';
import { showToastr } from '../../utils/helpers';

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
		const payload = action && action.payload;

		const { data } = yield getLanguages(payload);

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
		const payload = action && action.payload;
		const { data } = yield getAllCasinoProviders(payload);
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

		showToastr({
			message: `Provider Created Successfully`,
			type: 'success',
		});

		yield put(createCasinoProvidersSuccess());
	} catch (e) {
		yield put(createCasinoProvidersFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editCasinoProviderWorker(action) {
	try {
		const { data } = action && action.payload;
		yield editCasinoProvider(objectToFormData(data));

		showToastr({
			message: `Provider Updated Successfully`,
			type: 'success',
		});

		yield put(editCasinoProvidersSuccess());
	} catch (e) {
		yield put(editCasinoProvidersFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* createCasinoCategoryWorker(action) {
	try {
		const { data } = action && action.payload;
		yield createCasinoCategory(data);

		showToastr({
			message: `Category Created Successfully`,
			type: 'success',
		});

		yield put(createCasinoCategorySuccess());
	} catch (e) {
		yield put(createCasinoCategoryFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editCasinoCategoryWorker(action) {
	try {
		const { data } = action && action.payload;
		yield editCasinoCategory(data);

		showToastr({
			message: `Category Updated Successfully`,
			type: 'success',
		});

		yield put(editCasinoCategorySuccess());
	} catch (e) {
		yield put(editCasinoCategoryFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* createCasinoSubCategoryWorker(action) {
	try {
		const { data } = action && action.payload;
		yield createCasinoSubCategory(objectToFormData(data));

		showToastr({
			message: `Sub Category Created Successfully`,
			type: 'success',
		});

		yield put(createCasinoSubCategorySuccess());
	} catch (e) {
		yield put(createCasinoSubCategoryFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editCasinoSubCategoryWorker(action) {
	try {
		const { data } = action && action.payload;
		yield editCasinoSubCategory(objectToFormData(data));

		showToastr({
			message: `Sub Category Updated Successfully`,
			type: 'success',
		});

		yield put(editCasinoSubCategorySuccess());
	} catch (e) {
		yield put(editCasinoSubCategoryFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateCasinoStatusWorker(action) {
	try {
		const { data } = action && action.payload;

		yield superAdminViewToggleStatus(data);

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});

		yield put(updateCasinoStatusSuccess());
	} catch (e) {
		yield put(updateCasinoStatusFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* editCasinoGamesWorker(action) {
	try {
		const { data } = action && action.payload;

		yield editCasinoGames(objectToFormData(data));

		showToastr({
			message: `Game Updated Successfully`,
			type: 'success',
		});

		yield put(editCasinoGamesSuccess());
	} catch (e) {
		yield put(editCasinoGamesFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* updateSACasinoGamesStatusWorker(action) {
	try {
		const {
			data,
			// limit,
			// pageNo,
			// casinoCategoryId,
			// search,
			// isActive,
			// tenantId,
			// selectedProvider
		} = action && action.payload;

		yield superAdminViewToggleStatus(data);
		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});

		yield put(updateSACasinoGamesStatusSuccess());
	} catch (e) {
		yield put(updateSACasinoGamesStatusFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

export function* casinoManagementWatcher() {
	yield takeLatest(GET_CASINO_CATEGORY_DATA, getCasinoCategoryWorker);
	yield takeLatest(GET_CASINO_SUB_CATEGORY_DATA, getCasinoSubCategoryWorker);
	yield takeLatest(GET_LANGUAGE_DATA_START, getLanguagesWorker);
	yield takeLatest(GET_CASINO_PROVIDERS_DATA, getAllCasinoProvidersWorker);
	yield takeLatest(GET_CASINO_GAMES, getAllCasinoGamesWorker);
	yield takeLatest(CREATE_CASINO_PROVIDERS, createCasinoProviderWorker);
	yield takeLatest(EDIT_CASINO_CATEGORY, editCasinoCategoryWorker);
	yield takeLatest(CREATE_CASINO_CATEGORY_START, createCasinoCategoryWorker);
	yield takeLatest(
		CREATE_CASINO_SUBCATEGORY_START,
		createCasinoSubCategoryWorker
	);
	yield takeLatest(UPDATE_CASINO_STATUS_START, updateCasinoStatusWorker);
	yield takeLatest(
		UPDATE_SA_CASINO_GAMES_STATUS_START,
		updateSACasinoGamesStatusWorker
	);
	yield takeLatest(EDIT_CASINO_PROVIDERS, editCasinoProviderWorker);
	yield takeLatest(EDIT_CASINO_SUBCATEGORY_START, editCasinoSubCategoryWorker);
	yield takeLatest(EDIT_CASINO_GAMES_START, editCasinoGamesWorker);
}

function* CasinoManagementSaga() {
	yield all([fork(casinoManagementWatcher)]);
}

export default CasinoManagementSaga;
