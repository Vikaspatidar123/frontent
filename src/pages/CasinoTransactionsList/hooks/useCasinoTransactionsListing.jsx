/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCasinoTransactionsStart } from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
import { statusType } from '../constants';
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

const useCasinoTransactionsListing = () => {
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
			})
		);
	}, [currentPage, itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions.rows.map((txn) =>
				formattedValues.push({
					...txn,
					userEmail: txn.User.email,
					amountWithCurr: `${txn.amount} ${txn.User.currencyCode}`,
					bonusAmt: `${txn.nonCashAmount} ${txn.User.currencyCode}`,
					createdAt: getDateTime(txn.createdAt),
					statusText: statusType?.[parseInt(txn.status, 10) + 1].label,
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
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'User Email',
				accessor: 'userEmail',
				filterable: true,
				Cell: (cellProps) => <UserEmail {...cellProps} />,
			},
			{
				Header: 'Game Name',
				accessor: 'gameIdentifier',
				filterable: true,
				Cell: (cellProps) => <GameName {...cellProps} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: (cellProps) => <ActionType {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Bonus Money',
				accessor: 'bonusAmt',
				Cell: (cellProps) => <BonusMoney {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Created At',
				accessor: 'createdAt',
				Cell: (cellProps) => <CreatedAt {...cellProps} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalCasinoTransactionsCount: casinoTransactions?.count,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useCasinoTransactionsListing;
