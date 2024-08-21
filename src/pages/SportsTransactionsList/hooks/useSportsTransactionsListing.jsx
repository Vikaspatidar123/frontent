/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { json2csv } from 'json-2-csv';
// import moment from 'moment';
import { resetCasinoTransactionsData } from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
import {
	ActionType,
	Amount,
	// BonusMoney,
	CreatedAt,
	CurrencyCode,
	FromWallet,
	GameName,
	Id,
	Purpose,
	Status,
	Tags,
	ToWallet,
	// UserEmail,
} from '../SportsTransactionsListCol';
import { STATUS_TYPE } from '../constants';
import { fetchSportsTransactionsStart } from '../../../store/sportsTransactions/actions';
import { downloadReport } from '../../../helpers/common';
import { getSportsTransactions } from '../../../network/getRequests';
import { showToastr } from '../../../utils/helpers';
import ExportList from '../../../components/Common/ExportList';

const useSportsTransactionsListing = (filterValues = {}, userId = '') => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [isDownloading, setIsDownloading] = useState({
		fullCsv: false,
	});
	const { sportsTransactions, loading } = useSelector(
		(state) => state.SportsTransaction
	);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	useEffect(() => {
		dispatch(
			fetchSportsTransactionsStart({
				perPage: itemsPerPage,
				page: currentPage,
				userId,
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

	const formattedSportsTransactions = useMemo(() => {
		const formattedValues = [];
		if (sportsTransactions) {
			sportsTransactions?.sportsbookTransactions?.map((txn) =>
				formattedValues.push({
					...txn,
					id: txn?.id,
					walletId: txn?.walletId,
					transactionId: txn?.transactionId,
					gameId: txn?.gameId,
					amount: txn?.ledger?.amount ?? '-',
					currencyCode: txn?.ledger?.currency?.code,
					conversionRate: txn?.conversionRate,
					actionType: txn?.ledger?.fromWalletId ? 'Credit' : 'Debit',
					from: txn?.ledger?.fromWalletId
						? txn?.user?.username
						: superAdminUser?.username,
					to: txn?.ledger?.toWalletId
						? txn?.user?.username
						: superAdminUser?.username,
					purpose: txn?.ledger?.purpose,
					status: STATUS_TYPE.find((status) => status.value === txn?.status)
						?.label,
					createdAt: getDateTime(txn?.createdAt),
					userTags:
						txn?.user?.userTags?.tags
							?.map((tags) => tags?.tag?.tag)
							?.join(', ') || '-',
				})
			);
		}
		return formattedValues;
	}, [sportsTransactions, superAdminUser]);

	const columns = useMemo(() => {
		const currency =
			currencies?.currencies?.find(
				(curr) => curr.id === filterValues.currencyId
			) || defaultCurrency;

		return [
			{
				Header: 'Transaction Id',
				accessor: 'transactionId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},

			{
				Header: 'Bet id',
				accessor: 'betId',
				filterable: true,
				Cell: ({ cell }) => <GameName value={cell.value} />,
			},
			{
				Header: 'From',
				accessor: 'from',
				filterable: true,
				Cell: ({ cell }) => <FromWallet value={cell.value} />,
			},
			{
				Header: 'To',
				accessor: 'to',
				filterable: true,
				Cell: ({ cell }) => <ToWallet value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => (
					<Amount
						value={cell.value}
						type={cell?.row?.original?.actionType}
						defaultCurrency={currency}
					/>
				),
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
			},
			{
				Header: 'Segments',
				accessor: 'userTags',
				filterable: true,
				Cell: ({ cell }) => <Tags value={cell?.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				filterable: true,
				Cell: ({ cell }) => <Purpose value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		];
	}, [filterValues.currencyId]);

	const fetchReportData = async (report) => {
		setIsDownloading((prev) => ({
			...prev,
			[report.type]: true,
		}));
		const { data } = await getSportsTransactions({
			perPage: itemsPerPage,
			page: currentPage,
			userId,
			...filterValues,
		});
		setIsDownloading((prev) => ({
			...prev,
			[report.type]: false,
		}));
		if (
			!data?.data?.sportsbookTransactions ||
			data.data.sportsbookTransactions.length === 0
		) {
			showToastr({
				message: 'No records found to download.',
				type: 'error',
			});
			return;
		}
		const csvJsonData = data?.data?.sportsbookTransactions.map((txn) => ({
			...txn,
			id: txn?.id,
			walletId: txn?.walletId,
			transactionId: txn?.transactionId,
			gameId: txn?.gameId,
			amount: txn?.ledger?.amount ?? '-',
			currencyCode: txn?.ledger?.currency?.code,
			conversionRate: txn?.conversionRate,
			actionType: txn?.ledger?.fromWalletId ? 'Credit' : 'Debit',
			from: txn?.ledger?.fromWalletId
				? txn?.user?.username
				: superAdminUser?.username,
			to: txn?.ledger?.toWalletId
				? txn?.user?.username
				: superAdminUser?.username,
			purpose: txn?.ledger?.purpose,
			status: STATUS_TYPE.find((status) => status.value === txn?.status)?.label,
			createdAt: getDateTime(txn?.createdAt),
			userTags:
				txn?.user?.userTags?.tags?.map((tags) => tags?.tag?.tag)?.join(', ') ||
				'-',
		}));
		downloadReport('csv', json2csv(csvJsonData), 'Sports Transactions Report');
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
		sportsTransactions,
		loading,
		formattedSportsTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		actionList,
	};
};

export default useSportsTransactionsListing;
