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
	const [currencyId, setCurrencyId] = useState('');
	const [orderBy, setOrderBy] = useState('');
	const { gameReport, isGameReportLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const { currencies } = useSelector((state) => state.Currencies);

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
		if (activeGameReportTab) {
			loadGameReport();
		}
	}, [activeGameReportTab, gameReportDateOption, orderBy, currencyId]);

	const gameReportColumn = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <IdValue cell={cell?.value || ''} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name cell={cell?.value || ''} />,
			},
			{
				Header: 'TOTAL PLAYER',
				accessor: 'totalPlayers',
				filterable: true,
				Cell: ({ cell }) => <NumberPlayer cell={cell?.value || ''} />,
			},
			{
				Header: 'TOTAL BETS AMOUNT',
				accessor: 'totalBetAmount',
				filterable: true,
				Cell: ({ cell }) => <TotalBetsAmount cell={cell?.value || ''} />,
			},
			{
				Header: 'TOTAL WIN AMOUNT',
				accessor: 'totalWinAmount',
				disableFilters: true,
				Cell: ({ cell }) => <TotalWins cell={cell?.value || ''} />,
			},
			{
				Header: 'GAME REVENUE',
				accessor: 'gameRevenue',
				disableFilters: true,
				Cell: ({ cell }) => <GameRevenue cell={cell?.value || ''} />,
			},
			{
				Header: 'PAYOUT',
				accessor: 'payout',
				disableFilters: true,
				Cell: ({ cell }) => <Payout cell={cell?.value || ''} />,
			},
		],
		[]
	);

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
