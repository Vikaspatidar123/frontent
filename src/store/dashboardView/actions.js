import {
	GET_LIVE_PLAYER_START,
	GET_LIVE_PLAYER_SUCCESS,
	GET_LIVE_PLAYER_FAIL,
	GET_DEMOGRAPHIC_START,
	GET_DEMOGRAPHIC_SUCCESS,
	GET_DEMOGRAPHIC_FAIL,
	GET_KPI_REPORT_START,
	GET_KPI_REPORT_SUCCESS,
	GET_KPI_REPORT_FAIL,
} from './actionTypes';

export const getLivePlayerInfoStart = (payload) => ({
	type: GET_LIVE_PLAYER_START,
	payload,
});

export const getLivePlayerInfoSuccess = (payload) => ({
	type: GET_LIVE_PLAYER_SUCCESS,
	payload,
});

export const getLivePlayerInfoFail = (payload) => ({
	type: GET_LIVE_PLAYER_FAIL,
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

export const getKpiReportStart = () => ({
	type: GET_KPI_REPORT_START,
});

export const getKpiReportSuccess = (payload) => ({
	type: GET_KPI_REPORT_SUCCESS,
	payload,
});

export const getKpiReportFail = (payload) => ({
	type: GET_KPI_REPORT_FAIL,
	payload,
});
