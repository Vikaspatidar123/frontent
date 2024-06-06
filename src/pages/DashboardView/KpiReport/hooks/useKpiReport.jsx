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
import { getPercentage } from '../../../../utils/helpers';

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

	const formattedKPIReport = useMemo(
		() =>
			kPIReport?.map((report) => {
				const ggr =
					Number(report?.totalBetAmount || 0) -
					Number(report?.totalWinAmount || 0);
				const oldGgr =
					Number(report?.totalOldBetAmount || 0) -
					Number(report?.totalOldWinAmount || 0);
				const deltaGgr = getPercentage(ggr, oldGgr);
				const deltaTotalBetAmount = getPercentage(
					Number(report?.totalBetAmount || 0),
					Number(report?.totalOldBetAmount || 0)
				);

				return {
					...report,
					ggr,
					oldGgr,
					deltaGgr,
					deltaTotalBetAmount,
				};
			}) || [],
		[kPIReport]
	);

	useEffect(() => {
		setCurrencyId(defaultCurrency.id);
	}, [defaultCurrency.id]);

	useEffect(() => {
		if (activeKpiReportTab && currencyId) {
			loadKPIReport();
		}
	}, [activeKpiReportTab, kpiReportDateOption, currencyId]);

	const kPIReportColumn = useMemo(() => {
		const currency =
			currencies?.currencies?.find((curr) => curr.id === currencyId) ||
			defaultCurrency;
		return [
			{
				Header: 'Name',
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
				Header: 'Old GGR',
				accessor: 'oldGgr',
				filterable: true,
				Cell: ({ cell }) => (
					<Ggr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Delta GGR',
				accessor: 'deltaGgr',
				filterable: true,
				Cell: ({ cell }) => (
					<DeltaGgr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Total Wagered Amount',
				accessor: 'totalBetAmount',
				filterable: true,
				Cell: ({ cell }) => (
					<RealBet cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Delta Wagered Amount',
				accessor: 'deltaTotalBetAmount',
				disableFilters: true,
				Cell: ({ cell }) => <DeltaTotalBets cell={cell?.value ?? '0'} />,
			},
			{
				Header: 'Total Payout',
				accessor: 'totalWinAmount',
				disableFilters: true,
				Cell: ({ cell }) => (
					<Ggr cell={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Wagered Count',
				accessor: 'totalBets',
				disableFilters: true,
				Cell: ({ cell }) => <TotalBets cell={cell?.value ?? '0'} />,
			},
		];
	}, [currencyId, defaultCurrency.symbol]);
	return {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReport: formattedKPIReport,
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
