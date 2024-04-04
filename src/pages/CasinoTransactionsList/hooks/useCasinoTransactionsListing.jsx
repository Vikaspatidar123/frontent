/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
import {
	fetchCasinoTransactionsStart,
	resetCasinoTransactionsData,
} from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
// import { statusType } from '../constants';
import {
	ActionType,
	Amount,
	// BonusMoney,
	ConversionRate,
	CreatedAt,
	CurrencyCode,
	GameName,
	Id,
	Purpose,
	Status,
	// UserEmail,
} from '../CasinoTransactionsListCol';
import { LEDGER_TYPES, statusType } from '../constants';
// import { modules } from '../../../constants/permissions';
// import { getAccessToken } from '../../../network/storageUtils';
// import { downloadFileInNewWindow } from '../../../utils/helpers';

const useCasinoTransactionsListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);

	useEffect(() => {
		dispatch(
			fetchCasinoTransactionsStart({
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

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions?.casinoTransactions?.map((txn) =>
				formattedValues.push({
					id: txn?.id,
					walletId: txn?.walletId,
					transactionId: txn?.transactionId,
					gameId: txn?.gameId,
					amount: txn?.ledger?.amount,
					currencyCode: txn?.wallet?.currency?.code,
					conversionRate: txn?.conversionRate,
					actionType: LEDGER_TYPES.find(
						(type) => type.value === txn?.ledger?.type
					)?.label,
					purpose: txn?.ledger?.purpose,
					status: statusType.find((status) => status.value === txn?.status)
						?.label,
					createdAt: getDateTime(txn?.createdAt),
				})
			);
		}
		return formattedValues;
	}, [casinoTransactions]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'transactionId',
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
				Header: 'Wallet Id',
				accessor: 'walletId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
			},
			{
				Header: 'Conversion Rate',
				accessor: 'conversionRate',
				Cell: ({ cell }) => <ConversionRate value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
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
