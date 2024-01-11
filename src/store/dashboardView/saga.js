import { put, takeEvery, all, fork, delay } from 'redux-saga/effects';

// Crypto Redux States
import {
	GET_LIVE_PLAYER_START,
	GET_DEMOGRAPHIC_START,
	GET_KPI_REPORT_START,
} from './actionTypes';
import {
	getLivePlayerInfoStart,
	getLivePlayerInfoSuccess,
	getLivePlayerInfoFail,
	getDemographicStart,
	getDemographicSuccess,
	getDemographicFail,
	// getKpiReportStart,
	getKpiReportSuccess,
	getKpiReportFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import { kpiReportConstant } from './config/kpiReport';
import // getDashboardLiveInfoService,
// getDashboardDemoGraphicService,
'../../network/getRequests';

function* getLivePlayerData() {
	try {
		yield getLivePlayerInfoStart();
		// const { data } = yield getDashboardLiveInfoService();
		const data = {
			totalPlayers: '107',
			todayTotalGgr: '0',
			loggedInPlayer: 5,
			depositConvRate: '0.00',
			registrationConvRate: '100.00',
			deviceLoggedIn: [
				{
					device_type: 'desktop',
					count: '5',
				},
			],
		};
		yield put(getLivePlayerInfoSuccess(data));
	} catch (e) {
		yield put(getLivePlayerInfoFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getDemoGraphicData() {
	try {
		yield getDemographicStart();
		// const { data } = yield getDashboardDemoGraphicService(action.payload);
		const data = [
			{
				country_code: 'AD',
				signUpCount: '2',
				depositCount: '0',
				countryName: 'Andorra',
				currency: 'EUR',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AF',
				signUpCount: '10',
				depositCount: '0',
				countryName: 'Afghanistan',
				currency: 'AFN',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AI',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'Anguilla',
				currency: 'XCD',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AL',
				signUpCount: '3',
				depositCount: '0',
				countryName: 'Albania',
				currency: 'ALL',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AO',
				signUpCount: '3',
				depositCount: '0',
				countryName: 'Angola',
				currency: 'AOA',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AR',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'Argentina',
				currency: 'ARS',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AS',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'American Samoa',
				currency: 'USD',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'AX',
				signUpCount: '7',
				depositCount: '0',
				countryName: 'Aland Islands',
				currency: 'EUR',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'BS',
				signUpCount: '2',
				depositCount: '0',
				countryName: 'Bahamas',
				currency: 'BSD',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'CA',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'Canada',
				currency: 'CAD',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'GY',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'Guyana',
				currency: 'GYD',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'HR',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'Croatia',
				currency: 'HRK',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'IN',
				signUpCount: '48',
				depositCount: '0',
				countryName: 'India',
				currency: 'INR',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'IO',
				signUpCount: '1',
				depositCount: '0',
				countryName: 'British Indian Ocean Territory',
				currency: 'USD',
				conversionRate: '0',
				depositAmount: '0',
			},
			{
				country_code: 'US',
				signUpCount: '25',
				depositCount: '0',
				countryName: 'United States',
				currency: 'USD',
				conversionRate: '0',
				depositAmount: '0',
			},
		];
		yield put(getDemographicSuccess(data));
	} catch (e) {
		yield put(getDemographicFail());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* getKpiData() {
	try {
		// yield getKpiReportStart();
		yield delay(500);
		yield put(getKpiReportSuccess(kpiReportConstant));
	} catch (e) {
		yield put(getKpiReportFail());
		showToastr({
			message: 'Json Load Error',
			type: 'error',
		});
	}
}

export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
	yield takeEvery(GET_KPI_REPORT_START, getKpiData);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
