import { call, put, takeLatest, fork, all } from 'redux-saga/effects';

//  Redux States
import {
	CREATE_TOURNAMENT_START,
	GET_TOURNAMENT_DETAILS_START,
	GET_TOURNAMENT_DETAIL_BY_ID_START,
	UPDATE_TOURNAMENT_START,
	// UPDATE_TOURNAMENT_START,
	// GET_TOURNAMENT_LEADERBOARD_DETAIL_START,
	// GET_TOURNAMENT_GAMES_START,
	// UPDATE_TOURNAMENT_STATUS_START,
	// GET_TOURNAMENT_TRANSACTIONS_START,
} from './actionTypes';

import {
	createTournamentFail,
	createTournamentSuccess,
	getTournamentDetailByIdFail,
	getTournamentDetailByIdSuccess,
	getTournamentDetailsFail,
	getTournamentDetailsSuccess,
	updateTournamentFail,
	updateTournamentSuccess,
	// getTournamentGamesFail,
	// getTournamentGamesSuccess,
	// getTournamentLeaderBoardDetailFail,
	// getTournamentLeaderBoardDetailSuccess,
	// getTournamentTransactionFail,
	// getTournamentTransactionSuccess,
	// updateTournamentFail,
	// updateTournamentStatusFail,
	// updateTournamentStatusSuccess,
	// updateTournamentSuccess,
} from './actions';

import { showToastr } from '../../utils/helpers';
import {
	createTournament,
	updateTournament,
	// updateSettledStatus,
} from '../../network/postRequests';
import {
	getTournamentsDetails,
	getTournamentDetailById,
	// getTournamentLeaderBoardDetails,
	// getTournamentGameDetails,
	// getTournamentTransactions,
} from '../../network/getRequests';
import // updateTournamentStatus,
'../../network/putRequests';
// import { objectToFormData } from '../../utils/objectToFormdata';
import { filterEmptyPayload } from '../../network/networkUtils';

function* createTournamentWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		yield createTournament(data);
		yield put(createTournamentSuccess());
		showToastr({
			message: 'Tournament Created Successfully',
			type: 'success',
		});

		if (navigate) navigate('/tournaments');
	} catch (e) {
		yield put(createTournamentFail(e?.response?.data?.errors[0]?.description));
	}
}

function* updateTournamentWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		// if (data.type === 'settled') {
		// 	yield updateSettledStatus(data);
		// } else {
		yield updateTournament(data);
		// }
		yield put(updateTournamentSuccess());
		showToastr({
			message: 'Tournament Updated Successfully',
			type: 'success',
		});

		if (navigate) navigate('/tournaments');
	} catch (e) {
		yield put(updateTournamentFail(e?.response?.data?.errors[0]?.description));
	}
}

function* getTournamentDetailsWorker(action) {
	try {
		const payload = filterEmptyPayload(action.payload);
		const { data } = yield call(getTournamentsDetails, payload);
		yield put(getTournamentDetailsSuccess(data?.data));
	} catch (e) {
		yield put(
			getTournamentDetailsFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

function* getTournamentDetailByIdWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getTournamentDetailById(payload);
		yield put(getTournamentDetailByIdSuccess(data?.data?.tournament));
	} catch (e) {
		yield put(
			getTournamentDetailByIdFail(e?.response?.data?.errors[0]?.description)
		);
	}
}

// function* getTournamentLeaderBoardDetailsWorker(action) {
// 	try {
// 		const payload = action && action.payload;
// 		const { data } = yield getTournamentLeaderBoardDetails(payload);
// 		yield put(getTournamentLeaderBoardDetailSuccess(data?.data?.leaderBoard));
// 	} catch (e) {
// 		yield put(
// 			getTournamentLeaderBoardDetailFail(
// 				e?.response?.data?.errors[0]?.description
// 			)
// 		);

// 		showToastr({
// 			message: e?.response?.data?.errors[0]?.description || e.message,
// 			type: 'error',
// 		});
// 	}
// }

// function* getTournamentGamesWorker(action) {
// 	try {
// 		const payload = action && action.payload;
// 		const { data } = yield getTournamentGameDetails(payload);
// 		yield put(getTournamentGamesSuccess(data?.data?.casinoGames));
// 	} catch (e) {
// 		yield put(
// 			getTournamentGamesFail(e?.response?.data?.errors[0]?.description)
// 		);

// 		showToastr({
// 			message: e?.response?.data?.errors[0]?.description || e.message,
// 			type: 'error',
// 		});
// 	}
// }

// function* updateTournamentStatusWorker(action) {
// 	try {
// 		const data = action && action.payload;

// 		yield updateTournamentStatus(data);

// 		yield put(updateTournamentStatusSuccess());
// 		showToastr({
// 			message: 'Tournament Status Updated Successfully',
// 			type: 'success',
// 		});
// 	} catch (e) {
// 		yield put(
// 			updateTournamentStatusFail(e?.response?.data?.errors[0]?.description)
// 		);

// 		showToastr({
// 			message: e?.response?.data?.errors[0]?.description || e.message,
// 			type: 'error',
// 		});
// 	}
// }

// function* getTournamentTransactionsWorker(action) {
// 	try {
// 		const payload = action && action.payload;
// 		const { data } = yield getTournamentTransactions(payload);
// 		yield put(
// 			getTournamentTransactionSuccess(data?.data?.tournamentTransaction)
// 		);
// 	} catch (e) {
// 		yield put(
// 			getTournamentTransactionFail(e?.response?.data?.errors[0]?.description)
// 		);

// 		showToastr({
// 			message: e?.response?.data?.errors[0]?.description || e.message,
// 			type: 'error',
// 		});
// 	}
// }

export function* TournamentDetailWatcher() {
	yield takeLatest(CREATE_TOURNAMENT_START, createTournamentWorker);
	yield takeLatest(GET_TOURNAMENT_DETAILS_START, getTournamentDetailsWorker);
	// yield takeLatest(GET_TOURNAMENT_GAMES_START, getTournamentGamesWorker);
	yield takeLatest(UPDATE_TOURNAMENT_START, updateTournamentWorker);
	// yield takeLatest(
	// 	GET_TOURNAMENT_TRANSACTIONS_START,
	// 	getTournamentTransactionsWorker
	// );
	// yield takeLatest(
	// 	UPDATE_TOURNAMENT_STATUS_START,
	// 	updateTournamentStatusWorker
	// );
	yield takeLatest(
		GET_TOURNAMENT_DETAIL_BY_ID_START,
		getTournamentDetailByIdWorker
	);
	// yield takeLatest(
	// 	GET_TOURNAMENT_LEADERBOARD_DETAIL_START,
	// 	getTournamentLeaderBoardDetailsWorker
	// );
}

function* TournamentDetailSaga() {
	yield all([fork(TournamentDetailWatcher)]);
}

export default TournamentDetailSaga;
