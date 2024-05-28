/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const useSportsTransactionsListing = (filterValues = {}, userId = '') => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsTransactions, loading } = useSelector(
		(state) => state.SportsTransaction
	);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const defaultCurrency = useSelector(
		(state) => state.Currencies.defaultCurrency
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
					actionType: txn?.ledger?.fromWalletId ? 'Debit' : 'Credit',
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
						txn?.user?.userTags?.map((tags) => tags?.tag?.tag)?.join(', ') ||
						'-',
				})
			);
		}
		return formattedValues;
	}, [sportsTransactions]);

	const columns = useMemo(
		() => [
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
						defaultCurrency={defaultCurrency}
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
				Header: 'Tags',
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
				Header: 'Created At',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		],
		[]
	);

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: formattedSportsTransactions,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalSportsTransactionsCount: sportsTransactions?.totalPages || 0,
		loading,
		formattedSportsTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useSportsTransactionsListing;
