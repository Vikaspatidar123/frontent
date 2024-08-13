import { put, takeEvery, all, fork, call, select } from 'redux-saga/effects';

// Crypto Redux States
import { groupBy, isEmpty, keyBy, sortBy } from 'lodash';
import {
	GET_DEMOGRAPHIC_START,
	GET_KPI_REPORT_START,
	GET_GAME_REPORT_START,
	GET_KPI_SUMMARY_START,
	GET_TOP_PLAYERS_START,
	GET_STATS_START,
} from './actionTypes';
import {
	getDemographicSuccess,
	getDemographicFail,
	// getKpiReportStart,
	getKpiReportSuccess,
	getKpiReportFail,
	getGameReportSuccess,
	getGameReportFail,
	getKpiSummarySuccess,
	getKpiSummaryFail,
	getTopPlayersSuccess,
	getTopPlayersFail,
	getStatisticDataSuccess,
	getStatisticDataFail,
} from './actions';
import {
	getDashboardDemoGraphicService,
	getGameReports,
	getKpiReport,
	getKpiSummary,
	getTopPlayersRequest,
	statsDataRequest,
	getCurrencies,
} from '../../network/getRequests';

const cumulativeDataOfAllCurrencies = (records, currencyById) => {
	const groupedByDates = groupBy(records, 'date');
	const cumulativeCurrencyData = Object.entries(groupedByDates).map(
		([date, values]) =>
			values.reduce(
				(acc, cur) => {
					const exchangeRate = Number(
						currencyById?.[cur.currency_id]?.exchangeRate || 1
					);
					acc.active_users_count += Number(cur.active_users_count || 0);
					acc.deposit_count += Number(cur.deposit_count || 0);
					acc.withdraw_count += Number(cur.withdraw_count || 0);
					acc.casino_bet_count += Number(cur.casino_bet_count || 0);
					acc.casino_win_count += Number(cur.casino_win_count || 0);
					acc.sportsbook_bet_count += Number(cur.sportsbook_bet_count || 0);
					acc.sportsbook_win_count += Number(cur.sportsbook_win_count || 0);

					acc.total_deposit_amount +=
						parseFloat(cur.total_deposit_amount || 0) * exchangeRate;
					acc.total_withdraw_amount +=
						parseFloat(cur.total_withdraw_amount || 0) * exchangeRate;
					acc.total_casino_bet_amount +=
						parseFloat(cur.total_casino_bet_amount || 0) * exchangeRate;
					acc.total_casino_win_amount +=
						parseFloat(cur.total_casino_win_amount || 0) * exchangeRate;
					acc.total_sportsbook_bet_amount +=
						parseFloat(cur.total_sportsbook_bet_amount || 0) * exchangeRate;
					acc.total_sportsbook_win_amount +=
						parseFloat(cur.total_sportsbook_win_amount || 0) * exchangeRate;

					return acc;
				},
				{
					date,
					active_users_count: 0,
					deposit_count: 0,
					withdraw_count: 0,
					casino_bet_count: 0,
					casino_win_count: 0,
					sportsbook_bet_count: 0,
					sportsbook_win_count: 0,
					total_deposit_amount: 0,
					total_withdraw_amount: 0,
					total_casino_bet_amount: 0,
					total_casino_win_amount: 0,
					total_sportsbook_bet_amount: 0,
					total_sportsbook_win_amount: 0,
				}
			)
	);

	return sortBy(cumulativeCurrencyData, 'date');
};

const formDataChunks = (data, desiredLength) => {
	try {
		const totalDataPoints = data.length;
		const rangeSize = Math.ceil(totalDataPoints / desiredLength);

		const summarizedData = [];
		for (let i = 0; i < totalDataPoints; i += rangeSize) {
			const rangeEnd = Math.min(i + rangeSize, totalDataPoints);

			const summary = {
				start_date: data[i].date,
				end_date: data[rangeEnd - 1].date,
				deposit_count: 0,
				active_users_count: 0,
				withdraw_count: 0,
				total_deposit_amount: 0,
				total_withdraw_amount: 0,
				casino_bet_count: 0,
				casino_win_count: 0,
				total_casino_bet_amount: 0,
				total_casino_win_amount: 0,
				sportsbook_bet_count: 0,
				sportsbook_win_count: 0,
				total_sportsbook_bet_amount: 0,
				total_sportsbook_win_amount: 0,
			};

			for (let j = i; j < rangeEnd; j += 1) {
				summary.deposit_count += parseFloat(data[j].deposit_count || 0);
				summary.withdraw_count += parseFloat(data[j].withdraw_count || 0);
				summary.total_deposit_amount += parseFloat(
					data[j].total_deposit_amount || 0
				);
				summary.active_users_count += Number(data[j].active_users_count || 0);
				summary.total_withdraw_amount += parseFloat(
					data[j].total_withdraw_amount || 0
				);
				summary.casino_bet_count += parseFloat(data[j].casino_bet_count || 0);
				summary.casino_win_count += parseFloat(data[j].casino_win_count || 0);
				summary.total_casino_bet_amount += parseFloat(
					data[j].total_casino_bet_amount || 0
				);
				summary.total_casino_win_amount += parseFloat(
					data[j].total_casino_win_amount || 0
				);
				summary.sportsbook_bet_count += parseFloat(
					data[j].sportsbook_bet_count || 0
				);
				summary.sportsbook_win_count += parseFloat(
					data[j].sportsbook_win_count || 0
				);
				summary.total_sportsbook_bet_amount += parseFloat(
					data[j].total_sportsbook_bet_amount || 0
				);
				summary.total_sportsbook_win_amount += parseFloat(
					data[j].total_sportsbook_win_amount || 0
				);
			}

			summarizedData.push(summary);
		}

		return summarizedData;
	} catch (err) {
		console.log('Error while grouping dashboard chart data ', err?.message);
		return data.slice(-1 * desiredLength);
	}
};

function* getStatsDataWorker({ payload }) {
	try {
		const { data } = yield statsDataRequest(payload);
		let currencyById = select((state) => state.Currencies.currencyById);
		if (isEmpty(currencyById)) {
			const response = yield call(getCurrencies);
			currencyById = keyBy(response?.data?.data?.currencies || [], 'id');
		}

		const cumulativeCurrencyData = cumulativeDataOfAllCurrencies(
			data?.data?.stats || [],
			currencyById
		);
		const groupedData = formDataChunks(cumulativeCurrencyData, 10);
		yield put(
			getStatisticDataSuccess({
				...(data?.data || {}),
				grouped: groupedData,
			})
		);
	} catch (e) {
		yield put(getStatisticDataFail());
	}
}

function* getDemoGraphicData(action) {
	try {
		const { data } = yield getDashboardDemoGraphicService(action.payload);
		yield put(getDemographicSuccess(data?.data));
	} catch (e) {
		yield put(getDemographicFail());
	}
}

function* getKpiSummaryWorker(action) {
	try {
		const payload = action && action?.payload;
		const { data } = yield getKpiSummary(payload);
		yield put(getKpiSummarySuccess(data?.data?.kpiSummary));
	} catch (e) {
		yield put(getKpiSummaryFail(e?.response?.data?.errors[0]?.description));
	}
}

function* getKpiData(action) {
	try {
		const payload = action && action?.payload;
		const { data } = yield getKpiReport(payload);
		yield put(getKpiReportSuccess(data?.data?.reportData));
	} catch (e) {
		yield put(
			getKpiReportFail(e?.response?.data?.errors[0]?.description || e.message)
		);
	}
}

function* getGameReportWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getGameReports(payload);
		yield put(getGameReportSuccess(data?.data?.gameReport));
	} catch (e) {
		yield put(getGameReportFail(e?.response?.data?.errors[0]?.description));
	}
}

function* topPlayersWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getTopPlayersRequest(payload);
		yield put(getTopPlayersSuccess(data?.data));
	} catch (e) {
		yield put(getTopPlayersFail(e?.response?.data?.errors[0]?.description));
	}
}

export function* watchDashboardViewData() {
	yield takeEvery(GET_STATS_START, getStatsDataWorker);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
	yield takeEvery(GET_KPI_REPORT_START, getKpiData);
	yield takeEvery(GET_GAME_REPORT_START, getGameReportWorker);
	yield takeEvery(GET_KPI_SUMMARY_START, getKpiSummaryWorker);
	yield takeEvery(GET_TOP_PLAYERS_START, topPlayersWorker);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
