/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	GameRevenue,
	// IdValue,
	Name,
	NumberPlayer,
	Payout,
	TotalBetsAmount,
	TotalWins,
} from '../gameListCol';
import { TABS } from '../../constant';
import { getGameReportStart } from '../../../../store/dashboardView/actions';
import { defaultCurrencyId } from '../../../../constants/config';

const useGameReport = () => {
	const dispatch = useDispatch();
	const [gameReportDateOption, setGameReportDateOption] = useState({
		selected: 'last7days',
		fromDate: '',
		toDate: '',
	});
	const [activeGameReportTab, setActiveGameReportTab] = useState(TABS.GAME);
	const [currencyId, setCurrencyId] = useState(defaultCurrencyId);
	const [orderBy, setOrderBy] = useState(null);
	const { gameReport, isGameReportLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	const loadGameReport = () => {
		dispatch(
			getGameReportStart({
				tab: activeGameReportTab,
				dateOptions: gameReportDateOption.selected,
				fromDate: gameReportDateOption.fromDate,
				toDate: gameReportDateOption.toDate,
				orderBy,
				currencyId,
			})
		);
	};

	useEffect(() => {
		if (activeGameReportTab && currencyId) {
			const { fromDate, toDate, selected } = gameReportDateOption;
			if (selected === 'custom') {
				if (fromDate && toDate) {
					loadGameReport();
				}
			} else {
				loadGameReport();
			}
		}
	}, [activeGameReportTab, gameReportDateOption, orderBy, currencyId]);

	const gameReportColumn = useMemo(() => {
		const currency =
			currencies?.currencies?.find((curr) => curr.id === currencyId) ||
			defaultCurrency;

		return [
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	filterable: true,
			// 	Cell: ({ cell }) => <IdValue cell={cell?.value || '-'} />,
			// },
			{
				Header: 'NAME',
				accessor: 'name',
				customColumnStyle: { fontWeight: 'bold' },
				filterable: true,
				Cell: ({ cell }) => <Name cell={cell?.value || '-'} />,
			},
			{
				Header: 'TOTAL REVENUE',
				accessor: 'gameRevenue',
				disableFilters: true,
				Cell: ({ cell }) => (
					<GameRevenue cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'PLAYED BY',
				accessor: 'totalPlayers',
				filterable: true,
				Cell: ({ cell }) => <NumberPlayer cell={cell?.value ?? '0'} />,
			},
			{
				Header: 'TOTAL WAGERED',
				accessor: 'totalBetAmount',
				filterable: true,
				Cell: ({ cell }) => (
					<TotalBetsAmount cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'TOTAL PAYOUT',
				accessor: 'totalWinAmount',
				disableFilters: true,
				Cell: ({ cell }) => (
					<TotalWins cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},

			{
				Header: 'RTP',
				accessor: 'payout',
				disableFilters: true,
				Cell: ({ cell }) => <Payout cell={cell?.value ?? 0} />,
			},
		];
	}, [currencyId]);

	return {
		gameReport,
		gameReportColumn,
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportDateOption,
		setGameReportDateOption,
		loadGameReport,
		isGameReportLoading,
		currencyId,
		setCurrencyId,
		orderBy,
		setOrderBy,
		currencies,
	};
};

export default useGameReport;
