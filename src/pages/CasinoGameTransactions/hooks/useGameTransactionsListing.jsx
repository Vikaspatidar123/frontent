/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
import { resetCasinoTransactionsData } from '../../../store/actions';
// import { STATUS_TYPE } from '../constants';
import {
	GameRevenue,
	IdValue,
	Name,
	NumberPlayer,
	Payout,
	TotalBetsAmount,
	TotalWins,
	// UserEmail,
} from '../GameTransactionsListCol';
import { fetchGameTransactionsStart } from '../../../store/gameTransactions/actions';

const useGameTransactionsListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { gameTransactions, loading } = useSelector(
		(state) => state.GameTransactions
	);
	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	useEffect(() => {
		dispatch(
			fetchGameTransactionsStart({
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting casino transactions listing redux state
	useEffect(() => () => dispatch(resetCasinoTransactionsData()), []);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};
	const columns = useMemo(() => {
		const currency =
			currencies?.currencies?.find(
				(curr) => curr.id === filterValues.currencyId
			) || defaultCurrency;
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
	}, [filterValues.currencyId]);
	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: gameTransactions?.gameReport || [],
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalCount: gameTransactions?.totalPages || 0,
		loading,
		gameTransactions: gameTransactions?.gameReport || [],
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useGameTransactionsListing;
