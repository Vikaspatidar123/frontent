/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getAccessToken } from '../../../network/storageUtils';
import {
	getLivePlayerInfoStart,
	getDemographicStart,
} from '../../../store/dashboardView/actions';
import {
	formatDateYMD,
	getDateDaysAgo,
	downloadFileInNewWindow,
} from '../../../utils/helpers';
import { countryFilter } from '../../../utils/countryFilter';
import {
	CustomDate,
	Delta,
	RowName,
	Today,
	Yesterday,
} from '../KpiSummary/KpiListCol';
import {
	BONUSGGR,
	BONUSWIN,
	DELTAGGR,
	DELTATOTALBETS,
	GGR,
	ProviderName,
	REALBET,
	REALWIN,
	TOTALBETS,
} from '../KpiReport/KpiReportListCol';
import {
	GAMEREVENUE,
	IdValue,
	NAME,
	NUMBERFPLAYER,
	NUMBEROFROUNDS,
	PAYOUT,
	TOTALBETSGAME,
	TOTALWINS,
} from '../GameReport/gameListCol';
import {
	CONVERSIONRATE,
	COUNTRY,
	DEPOSITAMOUNT,
	DEPOSITORS,
	SIGNUPS,
} from '../DemographicReport/DemoGraphCol';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';

const { VITE_APP_API_URL } = import.meta.env;

const useDashboardView = () => {
	const dispatch = useDispatch();
	const {
		isLivePlayerLoading,
		livePlayerData,
		demoGraphicData,
		kPISummary,
		kPIReport,
		gameReport,
		isDemographicLoading,
	} = useSelector((state) => state.DashboardViewInfo);

	const [demoGraphState, setDemoGraphState] = useState([
		{
			startDate: getDateDaysAgo(0),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [loggedInOptions, setLoggedInOptions] = useState({});
	const [demoDateOptions, setDemoDateOptions] = useState('yeartodate');
	const [demoGrapFormatedData, setDemoGrapFormatedData] = useState([]);
	const [isRefresh, setIsRefresh] = useState(false);

	const [activeKpiSummTab, setActiveKpiSummTab] = useState('banking');
	const [activeKpiReportTab, setActiveKpiReportTab] = useState('game');
	const [activeGameReportTab, setActiveGameReportTab] = useState('game');

	const fetchData = () => {
		dispatch(
			getDemographicStart({
				startDate: formatDateYMD(demoGraphState.map((a) => a.startDate)),
				endDate: formatDateYMD(demoGraphState.map((a) => a.endDate)),
				dateOptions: demoDateOptions,
			})
		);
	};
	const formatDataHandler = (list) => {
		const tempData = [];

		list &&
			list?.map((item) => {
				const { countryName } = countryFilter(item.country_code);
				const row = {
					x: countryName,
					y: Number(item.signUpCount),
				};
				tempData.push(row);
				return null;
			});

		const finalData = [
			{
				data: tempData,
			},
		];
		setDemoGrapFormatedData(finalData);
	};

	useEffect(() => {
		dispatch(getLivePlayerInfoStart());
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [demoDateOptions, isRefresh]);

	useEffect(() => {
		if (demoGraphicData) formatDataHandler(demoGraphicData);
	}, [demoGraphicData]);

	useEffect(() => {
		if (livePlayerData?.deviceLoggedIn) {
			const apexsaleschartColors = getChartColorsArray(
				'["--bs-primary", "--bs-success", "--bs-danger"]'
			);
			const options = {
				colors: apexsaleschartColors,
				legend: {
					// show: !1,
					position: 'bottom',
				},
				fill: {
					type: 'gradient',
				},
				dataLabels: {
					enabled: true, // Show data labels
				},

				plotOptions: {
					pie: {
						donut: {
							size: '50%',
						},
					},
				},
			};
			const labels = [];
			const series = [];
			livePlayerData?.deviceLoggedIn
				?.filter((d) => d.device_type !== null)
				.map((d) => {
					labels.push(d.device_type);
					series.push(Number(d.count));
					return true;
				});
			options.series = series;
			options.labels = labels;
			setLoggedInOptions(options);
		}
	}, [livePlayerData && livePlayerData?.deviceLoggedIn]);

	const demoGraphOptions = {
		chart: {
			type: 'bar',
		},
		plotOptions: {
			bar: {
				columnWidth: '40%',
				distributed: true,
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
			textAnchor: 'start',
			style: {
				colors: ['#fff'],
			},
		},
	};

	const exportReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/admin/report/demographic?startDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&endDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) || new Date()
			}&dateOptions=${demoDateOptions}&csvDownload=true&token=${getAccessToken()}`
		);
	};

	// FIXME: update the date range after real time implementation
	const exportKPISummaryReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/admin/report/kpi-summary?tab=${activeKpiSummTab}startDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&endDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) || new Date()
			}&csvDownload=true&token=${getAccessToken()}`
		);
	};
	// FIXME: update the date range after real time implementation
	const exportKPIReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/admin/report/kpi?tab=${activeKpiReportTab}&dateOptions=${demoDateOptions}&customStartDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&customEndDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) || new Date()
			}&csvDownload=true&token=${getAccessToken()}`
		);
	};
	// FIXME: update the date range after real time implementation
	const exportGameReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/admin/report/kpi?tab=${activeKpiReportTab}&dateOptions=${demoDateOptions}&customStartDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&customEndDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) || new Date()
			}&csvDownload=true&token=${getAccessToken()}`
		);
	};

	const kPISummaryColumn = useMemo(
		() => [
			{
				Header: 'DATA',
				accessor: 'rowName',
				filterable: true,
				Cell: ({ cell }) => <RowName cell={cell} />,
			},
			{
				Header: 'TODAY',
				accessor: 'today',
				filterable: true,
				Cell: ({ cell }) => <Today cell={cell} />,
			},
			{
				Header: 'YESTERDAY',
				accessor: 'yesterday',
				filterable: true,
				Cell: ({ cell }) => <Yesterday cell={cell} />,
			},
			{
				Header: 'MONTH TO DATE',
				accessor: 'monthToDate',
				filterable: true,
				// Cell: ({ cell }) => <Role cell={cell} />,
			},
			{
				Header: 'CUSTOM DATE',
				accessor: 'customDate',
				filterable: true,
				Cell: ({ cell }) => <CustomDate cell={cell} />,
			},
			{
				Header: 'DELTA',
				accessor: 'delta',
				disableFilters: true,
				Cell: ({ cell }) => <Delta cell={cell} />,
			},
		],
		[]
	);

	const kPIReportColumn = useMemo(
		() => [
			{
				Header: 'PROVIDER/CLIENT',
				accessor: 'provider',
				filterable: true,
				Cell: ({ cell }) => <ProviderName cell={cell} />,
			},
			{
				Header: 'GGR',
				accessor: 'GGR',
				filterable: true,
				Cell: ({ cell }) => <GGR cell={cell} />,
			},
			{
				Header: 'DELTA GGR',
				accessor: 'deltaGGR',
				filterable: true,
				Cell: ({ cell }) => <DELTAGGR cell={cell} />,
			},
			{
				Header: 'REAL BET',
				accessor: 'realBet',
				filterable: true,
				Cell: ({ cell }) => <REALBET cell={cell} />,
			},
			{
				Header: 'REAL WIN',
				accessor: 'realWin',
				filterable: true,
				Cell: ({ cell }) => <REALWIN cell={cell} />,
			},
			{
				Header: 'BONUS Bet',
				accessor: 'bonusBet',
				disableFilters: true,
				Cell: ({ cell }) => <BONUSWIN cell={cell} />,
			},
			{
				Header: 'BONUS WIN',
				accessor: 'bonusWin',
				disableFilters: true,
				Cell: ({ cell }) => <BONUSWIN cell={cell} />,
			},
			{
				Header: 'BONUS GGR',
				accessor: 'bonusGGR',
				disableFilters: true,
				Cell: ({ cell }) => <BONUSGGR cell={cell} />,
			},
			{
				Header: 'TOTAL BETS',
				accessor: 'totalBets',
				disableFilters: true,
				Cell: ({ cell }) => <TOTALBETS cell={cell} />,
			},
			{
				Header: 'DELTA TOTAL BETS',
				accessor: 'deltaTotalBets',
				disableFilters: true,
				Cell: ({ cell }) => <DELTATOTALBETS cell={cell} />,
			},
		],
		[]
	);

	const gameReportColumn = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <IdValue cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <NAME cell={cell} />,
			},
			{
				Header: 'NUMBER OF ROUNDS',
				accessor: 'roundCount',
				filterable: true,
				Cell: ({ cell }) => <NUMBEROFROUNDS cell={cell} />,
			},
			{
				Header: 'NUMBER OF PLAYER',
				accessor: 'playerCount',
				filterable: true,
				Cell: ({ cell }) => <NUMBERFPLAYER cell={cell} />,
			},
			{
				Header: 'TOTAL BETS',
				accessor: 'totalBet',
				filterable: true,
				Cell: ({ cell }) => <TOTALBETSGAME cell={cell} />,
			},
			{
				Header: 'TOTAL WINS',
				accessor: 'totalWin',
				disableFilters: true,
				Cell: ({ cell }) => <TOTALWINS cell={cell} />,
			},
			{
				Header: 'GAME REVENUE',
				accessor: 'GGR',
				disableFilters: true,
				Cell: ({ cell }) => <GAMEREVENUE cell={cell} />,
			},
			{
				Header: 'PAYOUT',
				accessor: 'payout',
				disableFilters: true,
				Cell: ({ cell }) => <PAYOUT cell={cell} />,
			},
		],
		[]
	);
	const demoGraphColumn = useMemo(
		() => [
			{
				Header: 'COUNTRY',
				accessor: 'countryName',
				filterable: true,
				Cell: ({ cell }) => <COUNTRY cell={cell} />,
			},
			{
				Header: 'SIGN UPS',
				accessor: 'signUpCount',
				filterable: true,
				Cell: ({ cell }) => <SIGNUPS cell={cell} />,
			},
			{
				Header: 'DEPOSITORS',
				accessor: 'depositCount',
				filterable: true,
				Cell: ({ cell }) => <DEPOSITORS cell={cell} />,
			},
			{
				Header: 'DEPOSIT AMOUNT',
				accessor: 'depositAmount',
				filterable: true,
				Cell: ({ cell }) => <DEPOSITAMOUNT cell={cell} />,
			},
			{
				Header: 'CONVERSION RATE',
				accessor: 'conversionRate',
				filterable: true,
				Cell: ({ cell }) => <CONVERSIONRATE cell={cell} />,
			},
		],
		[]
	);
	return {
		isLivePlayerLoading,
		livePlayerData,
		demoGrapFormatedData,
		demoGraphOptions,
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReport,
		kPIReportColumn,
		gameReport,
		gameReportColumn,
		activeGameReportTab,
		setActiveGameReportTab,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		loggedInOptions,
		exportReport,
		exportGameReport,
		exportKPIReport,
		exportKPISummaryReport,
		isRefresh,
		setIsRefresh,
	};
};

useDashboardView.propTypes = {};

useDashboardView.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDashboardView;
