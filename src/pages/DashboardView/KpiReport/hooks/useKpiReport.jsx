/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKpiReportStart } from '../../../../store/dashboardView/actions';
import {
	DeltaGgr,
	DeltaTotalBets,
	Ggr,
	ProviderName,
	RealBet,
	TotalBets,
} from '../KpiReportListCol';
import { TABS } from '../../constant';

const useKpiReport = () => {
	const dispatch = useDispatch();
	const [kpiReportDateOption, setKpiReportDateOption] = useState('today');
	const [activeKpiReportTab, setActiveKpiReportTab] = useState(TABS.GAME);
	const [currencyId, setCurrencyId] = useState(null);
	const { kPIReport, isKpiReportLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	const loadKPIReport = () => {
		dispatch(
			getKpiReportStart({
				tab: activeKpiReportTab,
				dateOptions: kpiReportDateOption,
				currencyId,
			})
		);
	};

	useEffect(() => {
		setCurrencyId(defaultCurrency.id);
	}, [defaultCurrency.id]);

	useEffect(() => {
		if (activeKpiReportTab) {
			loadKPIReport();
		}
	}, [activeKpiReportTab, kpiReportDateOption, currencyId]);

	const kPIReportColumn = useMemo(() => {
		const currency =
			currencies?.currencies?.find((curr) => curr.id === currencyId) ||
			defaultCurrency;
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
				Cell: ({ cell }) => (
					<Ggr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'OLD GGR',
				accessor: 'oldGgr',
				filterable: true,
				Cell: ({ cell }) => (
					<Ggr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'DELTA GGR',
				accessor: 'deltaGgr',
				filterable: true,
				Cell: ({ cell }) => (
					<DeltaGgr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'TOTAL BETS',
				accessor: 'totalBets',
				disableFilters: true,
				Cell: ({ cell }) => <TotalBets cell={cell?.value ?? '0'} />,
			},
			{
				Header: 'TOTAL WIN',
				accessor: 'totalWinAmount',
				disableFilters: true,
				Cell: ({ cell }) => (
					<DeltaGgr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'DELTA TOTAL BETS',
				accessor: 'deltaTotalBetAmount',
				disableFilters: true,
				Cell: ({ cell }) => <DeltaTotalBets cell={cell?.value ?? '0'} />,
			},
			{
				Header: 'TOTAL BET AMOUNT',
				accessor: 'totalBetAmount',
				filterable: true,
				Cell: ({ cell }) => (
					<RealBet cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
		];
	}, [currencyId, defaultCurrency.symbol]);
	return {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReport,
		kPIReportColumn,
		isKpiReportLoading,
		kpiReportDateOption,
		loadKPIReport,
		setKpiReportDateOption,
		currencyId,
		setCurrencyId,
		currencies,
	};
};

export default useKpiReport;
