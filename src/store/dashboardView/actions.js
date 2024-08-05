import {
	GET_DEMOGRAPHIC_START,
	GET_DEMOGRAPHIC_SUCCESS,
	GET_DEMOGRAPHIC_FAIL,
	GET_KPI_REPORT_START,
	GET_KPI_REPORT_SUCCESS,
	GET_KPI_REPORT_FAIL,
	GET_GAME_REPORT_FAIL,
	GET_GAME_REPORT_START,
	GET_GAME_REPORT_SUCCESS,
	GET_KPI_SUMMARY_START,
	GET_KPI_SUMMARY_SUCCESS,
	GET_KPI_SUMMARY_FAIL,
	GET_TOP_PLAYERS_START,
	GET_TOP_PLAYERS_SUCCESS,
	GET_TOP_PLAYERS_FAIL,
	GET_STATS_START,
	GET_STATS_SUCCESS,
	GET_STATS_FAIL,
} from './actionTypes';

export const getStatisticData = (payload) => ({
	type: GET_STATS_START,
	payload,
});

export const getStatisticDataSuccess = (payload) => ({
	type: GET_STATS_SUCCESS,
	payload,
});

export const getStatisticDataFail = (payload) => ({
	type: GET_STATS_FAIL,
	payload,
});

export const getDemographicStart = (payload) => ({
	type: GET_DEMOGRAPHIC_START,
	payload,
});

export const getDemographicSuccess = (payload) => ({
	type: GET_DEMOGRAPHIC_SUCCESS,
	payload,
});

export const getDemographicFail = (payload) => ({
	type: GET_DEMOGRAPHIC_FAIL,
	payload,
});

export const getKpiReportStart = (payload) => ({
	type: GET_KPI_REPORT_START,
	payload,
});

export const getKpiReportSuccess = (payload) => ({
	type: GET_KPI_REPORT_SUCCESS,
	payload,
});

export const getKpiReportFail = (payload) => ({
	type: GET_KPI_REPORT_FAIL,
	payload,
});

export const getGameReportStart = (payload) => ({
	type: GET_GAME_REPORT_START,
	payload,
});

export const getGameReportSuccess = (payload) => ({
	type: GET_GAME_REPORT_SUCCESS,
	payload,
});

export const getGameReportFail = (payload) => ({
	type: GET_GAME_REPORT_FAIL,
	payload,
});

export const getKpiSummaryStart = (payload) => ({
	type: GET_KPI_SUMMARY_START,
	payload,
});

export const getKpiSummarySuccess = (payload) => ({
	type: GET_KPI_SUMMARY_SUCCESS,
	payload,
});

export const getKpiSummaryFail = (payload) => ({
	type: GET_KPI_SUMMARY_FAIL,
	payload,
});

export const getTopPlayers = (payload) => ({
	type: GET_TOP_PLAYERS_START,
	payload,
});

export const getTopPlayersSuccess = (payload) => ({
	type: GET_TOP_PLAYERS_SUCCESS,
	payload,
});

export const getTopPlayersFail = (payload) => ({
	type: GET_TOP_PLAYERS_FAIL,
	payload,
});
