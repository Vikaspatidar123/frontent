/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
import {
	fetchCasinoTransactionsStart,
	resetCasinoTransactionsData,
} from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
// import { STATUS_TYPE } from '../constants';
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
} from '../CasinoTransactionsListCol';
import { STATUS_TYPE } from '../constants';
// import { modules } from '../../../constants/permissions';
// import { getAccessToken } from '../../../network/storageUtils';
// import { downloadFileInNewWindow } from '../../../utils/helpers';

const useCasinoTransactionsListing = (filterValues = {}, userId = '') => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);

	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	useEffect(() => {
		dispatch(
			fetchCasinoTransactionsStart({
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

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions?.casinoTransactions?.map((txn) =>
				formattedValues.push({
					...txn,
					id: txn?.id,
					walletId: txn?.walletId,
					transactionId: txn?.transactionId,
					gameId: txn?.gameId,
					gameName: txn?.casinoGame?.name || '-',
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
	}, [casinoTransactions]);

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
				Header: 'Previous Transaction',
				accessor: 'previousTransactionId',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Game ID',
				accessor: 'gameId',
				filterable: true,
				Cell: ({ cell }) => <GameName value={cell.value} />,
			},
			{
				Header: 'Game Name',
				accessor: 'gameName',
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
		];
	}, [filterValues.currencyId]);

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: formattedCasinoTransactions,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalCasinoTransactionsCount: casinoTransactions?.totalPages || 0,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useCasinoTransactionsListing;
