/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSportsTransactionStart } from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
import {
	ActionTypes,
	Amount,
	CreatedAt,
	CurrencyCode,
	Email,
	Id,
	NonCashAmount,
	Status,
} from '../SportsTransactionListCol';

const useSportsTransactionListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsTransaction, loading: isSportsTransactionLoading } =
		useSelector((state) => state.SportsTransaction);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};
	useEffect(() => {
		dispatch(
			fetchSportsTransactionStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	const formattedSportsTransaction = useMemo(() => {
		const formattedValues = [];
		if (sportsTransaction) {
			sportsTransaction.rows.map((txn) =>
				formattedValues.push({
					...txn,
					email: txn.users.email,
					currencyCode: txn.users.currencyCode,
					createdAt: getDateTime(txn.createdAt),
				})
			);
		}
		return formattedValues;
	}, [sportsTransaction]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'transactionId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => <Email {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Non Cash Amount',
				accessor: 'nonCashAmount',
				filterable: true,
				Cell: (cellProps) => <NonCashAmount {...cellProps} />,
			},
			{
				Header: 'Currency Code',
				accessor: 'currencyCode',
				filterable: true,
				Cell: (cellProps) => <CurrencyCode {...cellProps} />,
			},
			{
				Header: 'Action Types',
				accessor: 'actionType',
				Cell: (cellProps) => <ActionTypes {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
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
		totalSportsTransactionCount: sportsTransaction?.count,
		isSportsTransactionLoading,
		formattedSportsTransaction,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsTransactionListing;
