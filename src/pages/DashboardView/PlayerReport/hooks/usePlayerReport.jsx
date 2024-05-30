/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyValueData, Username } from '../playerListCol';
import { getTopPlayers } from '../../../../store/dashboardView/actions';

const usePlayerReport = () => {
	const dispatch = useDispatch();
	const [topPlayersDateOption, setTopPlayersDateOption] = useState('last7days');
	const [currencyId, setCurrencyId] = useState(null);
	const [orderBy, setOrderBy] = useState(null);
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
				Header: 'Revenue',
				accessor: 'totalrevenue',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Profit',
				accessor: 'profit',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Deposit',
				accessor: 'total_deposit_count',
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
				Header: 'Casino Bet Count',
				accessor: 'total_casino_bet_count',
				filterable: true,
				Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
			},
			{
				Header: 'Casino Bet',
				accessor: 'total_casino_bet',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Casino Win',
				accessor: 'total_casino_win',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},

			{
				Header: 'SB Bet Count',
				accessor: 'total_sb_bet_count',
				filterable: true,
				Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
			},
			{
				Header: 'SB Bet',
				accessor: 'total_sb_bet',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'SB Win',
				accessor: 'total_sb_win',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Deposit Count',
				accessor: 'total_deposit',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
		];
	}, [currencyId]);

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
	};
};

export default usePlayerReport;
