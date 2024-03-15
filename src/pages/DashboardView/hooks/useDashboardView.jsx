/* eslint-disable react/prop-types */

import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
	getLivePlayerInfoStart,
	getDemographicStart,
	getKpiReportStart,
	getGameReportStart,
	getKpiSummaryStart,
} from '../../../store/dashboardView/actions';
import { formatDateYMD, getDateDaysAgo } from '../../../utils/helpers';
import { countryFilter } from '../../../utils/countryFilter';
import { Delta, RowName, Today, Yesterday } from '../KpiSummary/KpiListCol';
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
import { TABS } from '../constant';

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
		isKpiReportLoading,
		isKpiSummaryLoading,
		isGameReportLoading,
	} = useSelector((state) => state.DashboardViewInfo);

	const formattedKpiSummary = useMemo(() => {
		if (kPISummary?.length) {
			return Object.values(
				kPISummary.reduce((acc, entry) => {
					Object.keys(entry).forEach((key) => {
						if (key !== 'data') {
							if (!acc[key]) {
								acc[key] = {
									name: key,
									today: 0,
									yesterday: 0,
									monthToDate: 0,
									// CustomDate: 0,
								};
							}
							acc[key][entry.data] = entry[key];
						}
					});
					return acc;
				}, {})
			);
		}
		return [];
	}, [kPISummary]);

	const [demoGraphState] = useState([
		{
			startDate: getDateDaysAgo(0),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [loggedInOptions, setLoggedInOptions] = useState({});
	const [demoDateOptions, setDemoDateOptions] = useState('yeartodate');
	const [kpiSummaryStartDate, setKpiSummaryStartDate] = useState('');
	const [kpiSummaryEndDate, setKpiSummaryEndDate] = useState('');
	const [kpiReportDateOption, setKpiReportDateOption] = useState('today');
	const [gameReportDateOption, setGameReportDateOption] = useState('last7days');
	const [demoGrapFormatedData, setDemoGrapFormatedData] = useState([]);

	const [activeKpiSummTab, setActiveKpiSummTab] = useState(TABS.SPORT);
	const [activeKpiReportTab, setActiveKpiReportTab] = useState(TABS.GAME);
	const [activeGameReportTab, setActiveGameReportTab] = useState(TABS.GAME);

	const fetchData = () => {
		dispatch(
			getDemographicStart({
				startDate: formatDateYMD(demoGraphState.map((a) => a.startDate)),
				endDate: formatDateYMD(demoGraphState.map((a) => a.endDate)),
				dateOptions: demoDateOptions,
			})
		);
	};

	const loadKPISummary = () => {
		dispatch(
			getKpiSummaryStart({
				tab: activeKpiSummTab,
				startDate: kpiSummaryStartDate,
				endDate: kpiSummaryEndDate,
			})
		);
	};

	const loadKPIReport = () => {
		dispatch(
			getKpiReportStart({
				tab: activeKpiReportTab,
				dateOptions: kpiReportDateOption,
			})
		);
	};

	const loadGameReport = () => {
		dispatch(
			getGameReportStart({
				tab: activeGameReportTab,
				dateOptions: gameReportDateOption,
			})
		);
	};

	const formatDataHandler = (list) => {
		const tempData = [];

		if (list?.length) {
			list?.map((item) => {
				const { countryName } = countryFilter(item.countryCode);
				const row = {
					x: countryName,
					y: Number(item.signUpCount),
				};
				tempData.push(row);
				return null;
			});
		}
		const finalData = [
			{
				data: tempData,
			},
		];
		setDemoGrapFormatedData(finalData);
	};

	useEffect(() => {
		if (activeGameReportTab) {
			loadGameReport();
		}
	}, [activeGameReportTab, gameReportDateOption]);

	useEffect(() => {
		if (activeKpiSummTab) {
			loadKPISummary();
		}
	}, [activeKpiSummTab, kpiSummaryStartDate, kpiSummaryEndDate]);

	useEffect(() => {
		if (activeKpiReportTab) {
			loadKPIReport();
		}
	}, [activeKpiReportTab, kpiReportDateOption]);

	useEffect(() => {
		dispatch(getLivePlayerInfoStart());
		fetchData();
		return () => {
			// Dispatch an action to reset Redux state here
			dispatch({ type: 'RESET_DASHBOARD_STATE' });
		};
	}, []);

	useEffect(() => {
		fetchData();
	}, [demoDateOptions]);

	useEffect(() => {
		if (!isEmpty(demoGraphicData?.demograph))
			formatDataHandler(demoGraphicData?.demograph);
	}, [demoGraphicData]);

	useEffect(() => {
		if (livePlayerData) {
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
			labels.push('Total logged in players');
			labels.push('Total players');
			series.push(Number(livePlayerData?.totalLoggedInPlayers));
			series.push(Number(livePlayerData?.totalPlayers));
			options.series = series;
			options.labels = labels;
			setLoggedInOptions(options);
		}
	}, [livePlayerData && livePlayerData?.totalLoggedInPlayers]);

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

	const kPISummaryColumn = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <RowName cell={cell?.value || ''} />,
			},
			{
				Header: 'TODAY',
				accessor: 'today',
				filterable: true,
				Cell: ({ cell }) => <Today cell={cell?.value || ''} />,
			},
			{
				Header: 'YESTERDAY',
				accessor: 'yesterday',
				filterable: true,
				Cell: ({ cell }) => <Yesterday cell={cell?.value || ''} />,
			},
			{
				Header: 'MONTH TO DATE',
				accessor: 'monthToDate',
				filterable: true,
				// Cell: ({ cell }) => <Role cell={cell?.value || ''} />,
			},
			{
				Header: 'DELTA',
				accessor: 'delta',
				disableFilters: true,
				Cell: ({ cell }) => <Delta cell={cell?.value || ''} />,
			},
		],
		[]
	);

	const kPIReportColumn = useMemo(() => {
		if (kPIReport?.length) {
			return [
				{
					Header: 'NAME',
					accessor: 'name',
					filterable: true,
					Cell: ({ cell }) => <ProviderName cell={cell?.value || '-'} />,
				},
				{
					Header: 'GGR',
					accessor: 'ggr',
					filterable: true,
					Cell: ({ cell }) => <GGR cell={cell?.value || '0'} />,
				},
				{
					Header: 'OLD GGR',
					accessor: 'oldGgr',
					filterable: true,
					Cell: ({ cell }) => <GGR cell={cell?.value || '0'} />,
				},
				{
					Header: 'DELTA GGR',
					accessor: 'deltaGgr',
					filterable: true,
					Cell: ({ cell }) => <DELTAGGR cell={cell?.value || '0'} />,
				},
				{
					Header: 'REAL BET AMOUNT',
					accessor: 'totalRealBetAmount',
					filterable: true,
					Cell: ({ cell }) => <REALBET cell={cell?.value || '0'} />,
				},
				{
					Header: 'REAL WIN AMOUNT',
					accessor: 'totalRealWinAmount',
					filterable: true,
					Cell: ({ cell }) => <REALWIN cell={cell?.value || '0'} />,
				},
				{
					Header: 'BONUS BET AMOUNT',
					accessor: 'totalBonusBetAmount',
					disableFilters: true,
					Cell: ({ cell }) => <BONUSWIN cell={cell?.value || '0'} />,
				},
				{
					Header: 'BONUS WIN AMOUNT',
					accessor: 'totalBonusWinAmount',
					disableFilters: true,
					Cell: ({ cell }) => <BONUSWIN cell={cell?.value || '0'} />,
				},
				{
					Header: 'BONUS GGR',
					accessor: 'bonusGgr',
					disableFilters: true,
					Cell: ({ cell }) => <BONUSGGR cell={cell?.value || '0'} />,
				},
				{
					Header: 'TOTAL BETS',
					accessor: 'totalBets',
					disableFilters: true,
					Cell: ({ cell }) => <TOTALBETS cell={cell?.value || '0'} />,
				},
				{
					Header: 'TOTAL OLD BETS',
					accessor: 'totalOldBets',
					disableFilters: true,
					Cell: ({ cell }) => <TOTALBETS cell={cell?.value || '0'} />,
				},
				{
					Header: 'DELTA TOTAL BETS',
					accessor: 'deltaTotalBetAmount',
					disableFilters: true,
					Cell: ({ cell }) => <DELTATOTALBETS cell={cell?.value || '0'} />,
				},
				{
					Header: 'TOTAL BET AMOUNT',
					accessor: 'totalBetAmount',
					filterable: true,
					Cell: ({ cell }) => <REALBET cell={cell?.value || '0'} />,
				},
			];
		}

		return [];
	});

	const gameReportColumn = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <IdValue cell={cell?.value || ''} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <NAME cell={cell?.value || ''} />,
			},
			{
				Header: 'NUMBER OF ROUNDS',
				accessor: 'numberOfRounds',
				filterable: true,
				Cell: ({ cell }) => <NUMBEROFROUNDS cell={cell?.value || ''} />,
			},
			{
				Header: 'NUMBER OF PLAYER',
				accessor: 'numberOfPlayer',
				filterable: true,
				Cell: ({ cell }) => <NUMBERFPLAYER cell={cell?.value || ''} />,
			},
			{
				Header: 'TOTAL BETS',
				accessor: 'totalBets',
				filterable: true,
				Cell: ({ cell }) => <TOTALBETSGAME cell={cell?.value || ''} />,
			},
			{
				Header: 'TOTAL WINS',
				accessor: 'totalWins',
				disableFilters: true,
				Cell: ({ cell }) => <TOTALWINS cell={cell?.value || ''} />,
			},
			{
				Header: 'GAME REVENUE',
				accessor: 'gameRevenue',
				disableFilters: true,
				Cell: ({ cell }) => <GAMEREVENUE cell={cell?.value || ''} />,
			},
			{
				Header: 'PAYOUT',
				accessor: 'payout',
				disableFilters: true,
				Cell: ({ cell }) => <PAYOUT cell={cell?.value || ''} />,
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
				accessor: 'depositorCount',
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
		isKpiReportLoading,
		formattedKpiSummary,
		isKpiSummaryLoading,
		isGameReportLoading,
		kpiSummaryStartDate,
		setKpiSummaryStartDate,
		kpiSummaryEndDate,
		setKpiSummaryEndDate,
		kpiReportDateOption,
		setKpiReportDateOption,
		gameReportDateOption,
		setGameReportDateOption,
		fetchData,
		loadKPISummary,
		loadKPIReport,
		loadGameReport,
	};
};

useDashboardView.propTypes = {};

useDashboardView.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDashboardView;
