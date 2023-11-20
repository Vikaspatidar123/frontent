/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
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
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Non Cash Amount',
				accessor: 'nonCashAmount',
				filterable: true,
				Cell: ({ cell }) => <NonCashAmount value={cell.value} />,
			},
			{
				Header: 'Currency Code',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
			},
			{
				Header: 'Action Types',
				accessor: 'actionType',
				Cell: ({ cell }) => <ActionTypes value={cell.value} />,
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
