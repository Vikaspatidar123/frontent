/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { json2csv } from 'json-2-csv';
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
import { downloadReport } from '../../../helpers/common';
import { showToastr } from '../../../utils/helpers';
import { getGameReports } from '../../../network/getRequests';
import ExportList from '../../../components/Common/ExportList';

const useGameTransactionsListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [isDownloading, setIsDownloading] = useState({
		fullCsv: false,
	});
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
				(curr) => curr.id === filterValues?.currencyId
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
				Header: 'Total Revenue',
				accessor: 'gameRevenue',
				disableFilters: true,
				Cell: ({ cell }) => (
					<GameRevenue cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Played By',
				accessor: 'totalPlayers',
				filterable: true,
				Cell: ({ cell }) => <NumberPlayer cell={cell?.value ?? '0'} />,
			},
			{
				Header: 'Total Wagered',
				accessor: 'totalBetAmount',
				filterable: true,
				Cell: ({ cell }) => (
					<TotalBetsAmount cell={cell?.value ?? 0} defaultCurrency={currency} />
				),
			},
			{
				Header: 'Total Payout',
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
	}, [filterValues?.currencyId]);

	const fetchReportData = async (report) => {
		setIsDownloading((prev) => ({
			...prev,
			[report.type]: true,
		}));
		const { data } = await getGameReports({
			perPage: itemsPerPage,
			page: currentPage,
			...filterValues,
		});
		setIsDownloading((prev) => ({
			...prev,
			[report.type]: false,
		}));
		if (!data?.data?.gameReport || data.data.gameReport.length === 0) {
			showToastr({
				message: 'No records found to download.',
				type: 'error',
			});
			return;
		}
		const csvJsonData = data?.data?.gameReport?.map((transaction) => ({
			ID: transaction?.id,
			NAME: transaction?.name,
			'TOTAL REVENUE': transaction?.gameRevenue,
			'PLAYED BY': transaction?.gameRevenue,
			'TOTAL WAGERED': transaction?.totalBetAmount,
			'TOTAL PAYOUT': transaction?.totalWinAmount,
			RTP: transaction?.payout,
		}));
		downloadReport('csv', json2csv(csvJsonData), 'Game Reports');
	};

	const exportList = useMemo(() => [
		{
			label: 'Download',
			isDownload: true,
			isCsv: true,
			tooltip: 'Download CSV Report',
			icon: <i className="mdi mdi-download-multiple" />,
			buttonColor: 'primary',
			type: 'fullCsv',
			handleDownload: fetchReportData,
			isDownloading: isDownloading.fullCsv,
		},
	]);

	const actionList = <ExportList exportList={exportList} />;

	return {
		currentPage,
		setCurrentPage,
		totalCount: gameTransactions?.totalPages || 0,
		loading,
		gameTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		actionList,
	};
};

export default useGameTransactionsListing;
