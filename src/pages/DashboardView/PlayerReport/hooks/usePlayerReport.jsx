/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyValueData, Username, PlayerPNL } from '../playerListCol';
import { getTopPlayers } from '../../../../store/dashboardView/actions';
import { TABS } from '../../constant';

const usePlayerReport = () => {
	const dispatch = useDispatch();
	const [topPlayersDateOption, setTopPlayersDateOption] = useState({
		selected: 'last7days',
		fromDate: '',
		toDate: '',
	});
	const [currencyId, setCurrencyId] = useState(null);
	const [orderBy, setOrderBy] = useState('total_casino_bet');
	const [activePerformance, setActivePerformance] = useState(TABS.CASINO);
	const { topPlayers, topPlayersLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	const fetchTopPlayers = () => {
		dispatch(
			getTopPlayers({
				dateOptions: topPlayersDateOption?.selected,
				fromDate: topPlayersDateOption?.fromDate,
				toDate: topPlayersDateOption?.toDate,
				orderBy,
				currencyId,
			})
		);
	};

	const topPlayerFormatted = useMemo(
		() =>
			topPlayers?.reportData?.map((player) => ({
				...player,
				platformPL:
					activePerformance === TABS.CASINO
						? (
								Number(player?.total_casino_bet || 0) +
								Number(player?.total_tournament_enrolls || 0) -
								Number(player?.total_casino_win || 0) -
								Number(player?.total_tournament_payouts || 0)
						  )?.toFixed(2)
						: (
								Number(player?.total_sb_bet || 0) +
								Number(player?.total_sb_win || 0)
						  )?.toFixed(2),
				// totalWagered: (
				// 	Number(player?.total_casino_bet || 0) +
				// 	Number(player?.total_sb_bet || 0) +
				// 	Number(player?.total_tournament_enrolls || 0)
				// )?.toFixed(2),
			})) || [],
		[topPlayers, activePerformance]
	);

	useEffect(() => {
		setCurrencyId(defaultCurrency.id);
	}, [defaultCurrency.id]);

	useEffect(() => {
		if (currencyId) {
			const { fromDate, toDate, selected } = topPlayersDateOption;
			if (selected === 'custom') {
				if (fromDate && toDate) {
					fetchTopPlayers();
				}
			} else {
				fetchTopPlayers();
			}
		}
	}, [topPlayersDateOption, orderBy, currencyId]);

	const columns = useMemo(() => {
		const currency =
			currencies?.currencies?.find((curr) => curr.id === currencyId) ||
			defaultCurrency;

		return [
			{
				Header: 'Username',
				accessor: 'username',
				notHidable: true,
				filterable: true,
				customColumnStyle: { fontWeight: 'bold' },
				Cell: ({ cell }) => <Username cell={cell} />,
			},
			// {
			// 	Header: 'Total Wagered',
			// 	accessor: 'totalWagered',
			// 	filterable: true,
			// 	Cell: ({ cell }) => (
			// 		<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
			// 	),
			// },
			{
				Header: 'Platform P&L',
				accessor: 'platformPL',
				filterable: true,
				Cell: ({ cell }) => (
					<PlayerPNL value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			...(activePerformance === TABS.CASINO
				? [
						{
							Header: 'Wagered Count',
							accessor: 'total_casino_bet_count',
							filterable: true,
							Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
						},
						{
							Header: 'Wagered Amount',
							accessor: 'total_casino_bet',
							filterable: true,
							Cell: ({ cell }) => (
								<KeyValueData
									value={cell?.value ?? '0'}
									defaultCurrency={currency}
								/>
							),
						},
						{
							Header: 'Payout',
							accessor: 'total_casino_win',
							filterable: true,
							Cell: ({ cell }) => (
								<KeyValueData
									value={cell?.value ?? '0'}
									defaultCurrency={currency}
								/>
							),
						},
				  ]
				: []),

			...(activePerformance === TABS.SPORT
				? [
						{
							Header: 'Wagered Count',
							accessor: 'total_sb_bet_count',
							filterable: true,
							Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
						},
						{
							Header: 'Wagered',
							accessor: 'total_sb_bet',
							filterable: true,
							Cell: ({ cell }) => (
								<KeyValueData
									value={cell?.value ?? '0'}
									defaultCurrency={currency}
								/>
							),
						},
						{
							Header: 'Payout',
							accessor: 'total_sb_win',
							filterable: true,
							Cell: ({ cell }) => (
								<KeyValueData
									value={cell?.value ?? '0'}
									defaultCurrency={currency}
								/>
							),
						},
				  ]
				: []),
			{
				Header: 'Deposit',
				accessor: 'total_deposit',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Withdraw',
				accessor: 'total_withdraw',
				disableFilters: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Deposit Count',
				accessor: 'total_deposit_count',
				filterable: true,
				Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
			},
		];
	}, [currencyId, activePerformance]);

	const toggle = (tab) => {
		if (activePerformance !== tab) {
			setOrderBy(TABS.CASINO === tab ? 'total_casino_bet' : 'total_sb_bet');
			setActivePerformance(tab);
		}
	};

	return {
		columns,
		topPlayerFormatted,
		topPlayersLoading,
		topPlayersDateOption,
		setTopPlayersDateOption,
		fetchTopPlayers,
		currencyId,
		setCurrencyId,
		orderBy,
		setOrderBy,
		currencies,
		activePerformance,
		toggle,
	};
};

export default usePlayerReport;
