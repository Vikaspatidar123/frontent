/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	GameRevenue,
	IdValue,
	Name,
	NumberPlayer,
	Payout,
	TotalBetsAmount,
	TotalWins,
} from '../gameListCol';
import { TABS } from '../../constant';
import { getGameReportStart } from '../../../../store/dashboardView/actions';

const useGameReport = () => {
	const dispatch = useDispatch();
	const [gameReportDateOption, setGameReportDateOption] = useState('last7days');
	const [activeGameReportTab, setActiveGameReportTab] = useState(TABS.GAME);
	const [currencyId, setCurrencyId] = useState(null);
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
				dateOptions: gameReportDateOption,
				orderBy,
				currencyId,
			})
		);
	};

	useEffect(() => {
		setCurrencyId(defaultCurrency.id);
	}, [defaultCurrency.id]);

	useEffect(() => {
		if (activeGameReportTab && currencyId) {
			loadGameReport();
		}
	}, [activeGameReportTab, gameReportDateOption, orderBy, currencyId]);

	const gameReportColumn = useMemo(() => {
		const currency =
			currencies?.currencies?.find((curr) => curr.id === currencyId) ||
			defaultCurrency;

		return [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <IdValue cell={cell?.value || '-'} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name cell={cell?.value || '-'} />,
			},
			{
				Header: 'TOTAL PLAYER',
				accessor: 'totalPlayers',
				filterable: true,
				Cell: ({ cell }) => <NumberPlayer cell={cell?.value ?? '0'} />,
			},
			{
				Header: 'TOTAL BETS AMOUNT',
				accessor: 'totalBetAmount',
				filterable: true,
				Cell: ({ cell }) => (
					<TotalBetsAmount cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'TOTAL WIN AMOUNT',
				accessor: 'totalWinAmount',
				disableFilters: true,
				Cell: ({ cell }) => (
					<TotalWins cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'GAME REVENUE',
				accessor: 'gameRevenue',
				disableFilters: true,
				Cell: ({ cell }) => (
					<GameRevenue cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'PAYOUT',
				accessor: 'payout',
				disableFilters: true,
				Cell: ({ cell }) => (
					<Payout cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
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
