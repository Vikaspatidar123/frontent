/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import { put, takeLatest, all, fork, select } from 'redux-saga/effects';

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
	updateCasinoIsFeaturedSuccess,
	updateCasinoIsFeaturedFailure,
	addGameToSubCategorySuccess,
	addGameToSubCategoryFail,
	deleteCasinoSubCategorySuccess,
	deleteCasinoSubCategoryFail,
	deleteCasinoGamesSuccess,
	deleteCasinoGamesFail,
	reorderCasinoCategorySuccess,
	reorderCasinoCategoryFail,
	reorderCasinoSubCategorySuccess,
	reorderCasinoSubCategoryFail,
	reorderCasinoGamesSuccess,
	reorderCasinoGamesFail,
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
	UPDATE_GAME_ISFEATURED_START,
	ADD_GAME_TO_CASINO_SUB_CATEGORY_START,
	DELETE_CASINO_SUB_CATEGORY_START,
	DELETE_CASINO_GAMES_START,
	REORDER_CASINO_CATEGORY_START,
	REORDER_CASINO_SUB_CATEGORY_START,
	REORDER_CASINO_GAMES_START,
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
	isCasinoFeaturedService,
	addGamesToSubCategory,
} from '../../network/postRequests';

import {
	editCasinoCategory,
	editCasinoGames,
	editCasinoProvider,
	editCasinoSubCategory,
	superAdminViewToggleStatus,
	updateCategoryReOrder,
	updateSubCategoryReOrder,
	updateReorderGames,
} from '../../network/putRequests';

import {
	deleteSubCategory,
	deleteCasinoGames,
} from '../../network/deleteRequests';
import { objectToFormData } from '../../utils/objectToFormdata';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';

function* getCasinoCategoryWorker(action) {
	const payload = action && action.payload;
	try {
		const { data } = yield getCasinoCategoryListing(payload);
		yield put(getCasinoCategoryDetailSuccess(data?.data?.casinoCategories));
	} catch (error) {
		showToastr({ message: 'Something Went wrong', type: 'error' });
		yield put(
			getCasinoCategoryDetailFailure(
				error?.response?.data?.errors[0]?.description
			)
		);
	}
}

function* getCasinoSubCategoryWorker(action) {
	try {
		let payload = action && action.payload;
		payload = clearEmptyProperty(payload);
		const { data } = yield getCasinoSubCategoryListing(payload);
		yield put(getCasinoSubCategoryDetailSuccess(data?.data?.casinoSubCategory));
	} catch (error) {
		showToastr({ message: 'Something Went wrong', type: 'error' });
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
		showToastr({ message: 'Something Went wrong', type: 'error' });
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
		showToastr({
			message: e?.response?.data?.errors[0].description,
			type: 'error',
		});
		yield put(
			getCasinoProvidersDataFailure(e?.response?.data?.errors[0].description)
		);
	}
}

function* getAllCasinoGamesWorker(action) {
	try {
		let payload = action && action.payload;
		payload = clearEmptyProperty(payload);

		const { data } = yield getAllCasinoGames(payload);

		yield put(getCasinoGamesSuccess(data?.data?.casinoGames));
	} catch (e) {
		yield showToastr({
			message: e?.response?.data?.errors[0]?.description,
			type: 'error',
		});

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
		const payload = action && action.payload;

		yield superAdminViewToggleStatus(payload);

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});

		switch (payload.code) {
			case 'CASINO_PROVIDER': {
				const providerList = yield select(
					(state) => state.CasinoManagementData.casinoProvidersData
				);

				const updatedProviderList = providerList?.rows?.map((provider) => {
					if (provider.casinoProviderId === payload.casinoProviderId) {
						provider.isActive = payload.status;
					}
					return provider;
				});

				yield put(
					getCasinoProvidersDataSuccess({
						...providerList,
						rows: updatedProviderList,
					})
				);
				break;
			}

			case 'CASINO_SUB_CATEGORY': {
				const subCategoryList = yield select(
					(state) => state.CasinoManagementData.casinoSubCategoryDetails
				);

				const updatedSubCategoryList = subCategoryList?.rows?.map(
					(subCategory) => {
						if (subCategory.gameSubCategoryId === payload.gameSubCategoryId) {
							subCategory.isActive = payload.status;
						}
						return subCategory;
					}
				);

				yield put(
					getCasinoSubCategoryDetailSuccess({
						...subCategoryList,
						rows: updatedSubCategoryList,
					})
				);
			}
		}

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
		const payload = action && action.payload;
		yield superAdminViewToggleStatus(payload);

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});

		yield put(updateSACasinoGamesStatusSuccess());

		switch (payload.code) {
			case 'CASINO_CATEGORY': {
				const { casinoCategoryDetails } = yield select(
					(state) => state.CasinoManagementData
				);

				const updatedCasinoGames = casinoCategoryDetails?.rows?.map((game) => {
					if (game.gameCategoryId === payload.gameCategoryId) {
						game.isActive = payload.status;
					}
					return game;
				});

				yield put(
					getCasinoCategoryDetailSuccess({
						...casinoCategoryDetails,
						rows: updatedCasinoGames,
					})
				);
				break;
			}

			case 'CASINO_GAME': {
				const { casinoGames } = yield select(
					(state) => state.CasinoManagementData
				);

				const updatedCasinoGames = casinoGames?.rows?.map((game) => {
					if (game.casinoGameId === payload.casinoGameId) {
						game.isActive = payload.status;
					}
					return game;
				});

				yield put(
					getCasinoGamesSuccess({
						...casinoGames,
						rows: updatedCasinoGames,
					})
				);
			}
		}
	} catch (e) {
		yield put(updateSACasinoGamesStatusFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}
function* updateGameFeatured(action) {
	try {
		const data = {
			casinoGameId: action.payload.casinoGameId,
			isFeatured: action.payload.isFeatured,
		};
		yield isCasinoFeaturedService(data);
		yield put(updateCasinoIsFeaturedSuccess(action.payload));
	} catch (error) {
		yield put(updateCasinoIsFeaturedFailure(error));
	}
}

function* addGamesToSubCategoryWorker(action) {
	try {
		const { gameSubCategoryId, games, navigate } = action && action.payload;

		yield addGamesToSubCategory({
			gameSubCategoryId,
			games,
		});

		showToastr({
			message: 'Games Added To Sub Category',
			type: 'success',
		});
		if (navigate) {
			navigate('/sub-categories');
		}

		yield put(addGameToSubCategorySuccess());
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(addGameToSubCategoryFail());
	}
}

function* deleteCasinoSubCategoryWorker(action) {
	try {
		const { gameSubCategoryId, limit, pageNo, search } =
			action && action.payload;

		yield deleteSubCategory({
			gameSubCategoryId,
		});

		showToastr({
			message: 'Sub Category Deleted Successfully',
			type: 'success',
		});

		yield put(deleteCasinoSubCategorySuccess());
		yield getCasinoSubCategoryListing({
			gameSubCategoryId,
			limit,
			pageNo,
			search,
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(deleteCasinoSubCategoryFail());
	}
}

function* deleteCasinoGamesWorker(action) {
	try {
		const { casinoGameId, limit, pageNo, search } = action && action.payload;

		yield deleteCasinoGames({
			casinoGameId,
		});

		showToastr({
			message: 'Game Deleted Successfully',
			type: 'success',
		});

		yield put(deleteCasinoGamesSuccess());
		yield getAllCasinoGames({
			casinoGameId,
			limit,
			pageNo,
			search,
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(deleteCasinoGamesFail());
	}
}

function* updateCategoryOrder(action) {
	try {
		const { data, navigate } = action && action.payload;
		yield updateCategoryReOrder(data);
		yield put(reorderCasinoCategorySuccess());

		showToastr({
			message: 'Category Order Updated Successfully',
			type: 'success',
		});
		navigate('/categories');
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(reorderCasinoCategoryFail());
	}
}

function* updateSubCategoryOrder(action) {
	try {
		const { data, navigate } = action && action.payload;
		yield updateSubCategoryReOrder(data);
		yield put(reorderCasinoSubCategorySuccess());

		showToastr({
			message: 'Sub Category Order Updated Successfully',
			type: 'success',
		});
		navigate('/sub-categories');
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(reorderCasinoSubCategoryFail());
	}
}

function* updateReorderGamesWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		yield updateReorderGames({ data });

		yield put(reorderCasinoGamesSuccess());

		showToastr({
			message: 'Games Order Updated Successfully',
			type: 'success',
		});

		navigate('/casino-games');
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(
			reorderCasinoGamesFail(e?.response?.data?.errors[0]?.description)
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
	yield takeLatest(UPDATE_GAME_ISFEATURED_START, updateGameFeatured);
	yield takeLatest(
		ADD_GAME_TO_CASINO_SUB_CATEGORY_START,
		addGamesToSubCategoryWorker
	);
	yield takeLatest(
		DELETE_CASINO_SUB_CATEGORY_START,
		deleteCasinoSubCategoryWorker
	);
	yield takeLatest(DELETE_CASINO_GAMES_START, deleteCasinoGamesWorker);
	yield takeLatest(REORDER_CASINO_CATEGORY_START, updateCategoryOrder);
	yield takeLatest(REORDER_CASINO_SUB_CATEGORY_START, updateSubCategoryOrder);
	yield takeLatest(REORDER_CASINO_GAMES_START, updateReorderGamesWorker);
}

function* CasinoManagementSaga() {
	yield all([fork(casinoManagementWatcher)]);
}

export default CasinoManagementSaga;
