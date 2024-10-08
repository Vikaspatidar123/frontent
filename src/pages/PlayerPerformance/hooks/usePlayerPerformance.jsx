/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyValueData, PlayerPNL, Username } from '../PlayerPerformanceListCol';
import { fetchPlayerPerformanceStart } from '../../../store/playerPerformance/actions';

const usePlayerPerformance = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { playerPerformance, loading } = useSelector(
		(state) => state.PlayerPerformance
	);
	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	useEffect(() => {
		dispatch(
			fetchPlayerPerformanceStart({
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	const topPlayerFormatted = useMemo(
		() =>
			playerPerformance?.reportData?.map((player) => ({
				...player,
				totalWagered: (
					Number(player?.total_casino_bet || 0) +
					Number(player?.total_sb_bet || 0) +
					Number(player?.total_tournament_enrolls || 0)
				)?.toFixed(2),
			})) || [],
		[playerPerformance]
	);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	const columns = useMemo(() => {
		const currency =
			currencies?.currencies?.find(
				(curr) => curr.id === filterValues?.currencyId
			) || defaultCurrency;
		return [
			{
				Header: 'Username',
				accessor: 'username',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Username value={cell?.value || '-'} cell={cell} />,
			},
			{
				Header: 'Wagered',
				accessor: 'totalWagered',
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
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Casino Payout',
				accessor: 'total_casino_win',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},

			{
				Header: 'SB Wagered Count',
				accessor: 'total_sb_bet_count',
				filterable: true,
				Cell: ({ cell }) => <KeyValueData value={cell?.value ?? '0'} />,
			},
			{
				Header: 'SB Wagered',
				accessor: 'total_sb_bet',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueData value={cell?.value ?? '0'} defaultCurrency={currency} />
				),
			},
			{
				Header: 'SB Payout',
				accessor: 'total_sb_win',
				filterable: true,
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
	}, [filterValues?.currencyId]);

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: playerPerformance?.reportData || [],
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalCount: playerPerformance?.totalPages || 0,
		loading,
		playerPerformance: topPlayerFormatted,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default usePlayerPerformance;
