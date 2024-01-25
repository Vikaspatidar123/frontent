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
	BonusMoney,
	CreatedAt,
	GameName,
	Id,
	Status,
	UserEmail,
} from '../CasinoTransactionsListCol';
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
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting casino transactions listing redux state
	useEffect(() => () => dispatch(resetCasinoTransactionsData()), []);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions.rows.map((txn) =>
				formattedValues.push({
					casinoTransactionId: txn?.casinoTransactionId,
					userEmail: txn?.user?.email,
					gameIdentifier: txn?.gameIdentifier,
					actionType: txn?.actionType,
					amountWithCurr: `${txn?.amount} ${txn?.currencyCode}`,
					bonusAmt: `${txn?.nonCashAmount} ${txn?.currencyCode}`,
					status:
						txn?.status === 0
							? 'Pending'
							: txn?.status === 1
							? 'Completed'
							: txn?.status === 2
							? 'FAILED'
							: 'ROLLBACK',
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
				accessor: 'casinoTransactionId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'User Email',
				accessor: 'userEmail',
				filterable: true,
				Cell: ({ cell }) => <UserEmail value={cell.value} />,
			},
			{
				Header: 'Game Name',
				accessor: 'gameIdentifier',
				filterable: true,
				Cell: ({ cell }) => <GameName value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Bonus Money',
				accessor: 'bonusAmt',
				Cell: ({ cell }) => <BonusMoney value={cell.value} />,
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
		totalCasinoTransactionsCount: casinoTransactions?.count,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useCasinoTransactionsListing;
