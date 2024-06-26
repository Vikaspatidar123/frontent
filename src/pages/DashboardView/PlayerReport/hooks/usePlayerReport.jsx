/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyValueData, Username, PlayerPNL } from '../playerListCol';
import { getTopPlayers } from '../../../../store/dashboardView/actions';
import { TABS } from '../../constant';

const usePlayerReport = () => {
	const dispatch = useDispatch();
	const [topPlayersDateOption, setTopPlayersDateOption] = useState('last7days');
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
				dateOptions: topPlayersDateOption,
				orderBy,
				currencyId,
			})
		);
	};

	useEffect(() => {
		setCurrencyId(defaultCurrency.id);
	}, [defaultCurrency.id]);

	useEffect(() => {
		if (currencyId) fetchTopPlayers();
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
				Cell: ({ cell }) => <Username value={cell?.value || '-'} />,
			},
			{
				Header: 'Total Wagered',
				accessor: 'totalrevenue',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Platform P&L',
				accessor: 'profit',
				filterable: true,
				Cell: ({ cell }) => (
					<PlayerPNL value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			...(activePerformance === TABS.CASINO
				? [
						{
							Header: 'Casino Wagered Count',
							accessor: 'total_casino_bet_count',
							filterable: true,
							Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
						},
						{
							Header: 'Casino Wagered Amount',
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
							Header: 'Casino Payout',
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
							Header: 'SportsBook Wagered Count',
							accessor: 'total_sb_bet_count',
							filterable: true,
							Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
						},
						{
							Header: 'SportsBook Wagered',
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
							Header: 'SportsBook Payout',
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
		topPlayers,
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
