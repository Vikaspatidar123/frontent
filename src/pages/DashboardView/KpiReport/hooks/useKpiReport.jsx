/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKpiReportStart } from '../../../../store/dashboardView/actions';
import {
	BonusGgr,
	BonusWin,
	DeltaGgr,
	DeltaTotalBets,
	Ggr,
	ProviderName,
	RealBet,
	RealWin,
	TotalBets,
} from '../KpiReportListCol';
import { TABS } from '../../constant';

const useKpiReport = () => {
	const dispatch = useDispatch();
	const [kpiReportDateOption, setKpiReportDateOption] = useState('today');
	const [activeKpiReportTab, setActiveKpiReportTab] = useState(TABS.GAME);

	const { kPIReport, isKpiReportLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const loadKPIReport = () => {
		dispatch(
			getKpiReportStart({
				tab: activeKpiReportTab,
				dateOptions: kpiReportDateOption,
			})
		);
	};

	useEffect(() => {
		if (activeKpiReportTab) {
			loadKPIReport();
		}
	}, [activeKpiReportTab, kpiReportDateOption]);

	const kPIReportColumn = useMemo(() => {
		if (kPIReport) {
			return [
				{
					Header: 'NAME',
					accessor: 'name',
					filterable: true,
					Cell: ({ cell }) => <ProviderName cell={cell?.value?.EN || '-'} />,
				},
				{
					Header: 'GGR',
					accessor: 'ggr',
					filterable: true,
					Cell: ({ cell }) => <Ggr cell={cell?.value || '0'} />,
				},
				{
					Header: 'OLD GGR',
					accessor: 'oldGgr',
					filterable: true,
					Cell: ({ cell }) => <Ggr cell={cell?.value || '0'} />,
				},
				{
					Header: 'DELTA GGR',
					accessor: 'deltaGgr',
					filterable: true,
					Cell: ({ cell }) => <DeltaGgr cell={cell?.value || '0'} />,
				},
				{
					Header: 'REAL BET AMOUNT',
					accessor: 'totalRealBetAmount',
					filterable: true,
					Cell: ({ cell }) => <RealBet cell={cell?.value || '0'} />,
				},
				{
					Header: 'REAL WIN AMOUNT',
					accessor: 'totalRealWinAmount',
					filterable: true,
					Cell: ({ cell }) => <RealWin cell={cell?.value || '0'} />,
				},
				{
					Header: 'BONUS BET AMOUNT',
					accessor: 'totalBonusBetAmount',
					disableFilters: true,
					Cell: ({ cell }) => <BonusWin cell={cell?.value || '0'} />,
				},
				{
					Header: 'BONUS WIN AMOUNT',
					accessor: 'totalBonusWinAmount',
					disableFilters: true,
					Cell: ({ cell }) => <BonusWin cell={cell?.value || '0'} />,
				},
				{
					Header: 'BONUS GGR',
					accessor: 'bonusGgr',
					disableFilters: true,
					Cell: ({ cell }) => <BonusGgr cell={cell?.value || '0'} />,
				},
				{
					Header: 'TOTAL BETS',
					accessor: 'totalBets',
					disableFilters: true,
					Cell: ({ cell }) => <TotalBets cell={cell?.value || '0'} />,
				},
				{
					Header: 'TOTAL OLD BETS',
					accessor: 'totalOldBets',
					disableFilters: true,
					Cell: ({ cell }) => <TotalBets cell={cell?.value || '0'} />,
				},
				{
					Header: 'DELTA TOTAL BETS',
					accessor: 'deltaTotalBetAmount',
					disableFilters: true,
					Cell: ({ cell }) => <DeltaTotalBets cell={cell?.value || '0'} />,
				},
				{
					Header: 'TOTAL BET AMOUNT',
					accessor: 'totalBetAmount',
					filterable: true,
					Cell: ({ cell }) => <RealBet cell={cell?.value || '0'} />,
				},
			];
		}

		return [];
	});

	return {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReport,
		kPIReportColumn,
		isKpiReportLoading,
		kpiReportDateOption,
		loadKPIReport,
		setKpiReportDateOption,
	};
};

export default useKpiReport;
