/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchWithdrawRequestsStart,
	resetWithdrawRequestsData,
} from '../../../store/actions';
import { formatDateYMD } from '../../../utils/dateFormatter';
import {
	ActionableType,
	Amount,
	Email,
	Id,
	Name,
	PaymentProvider,
	Status,
	TransactionId,
	UpdatedAt,
} from '../WithdrawRequestsListCol';
import { getStatus } from '../constants';

const useWithdrawRequestsListing = (formValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { withdrawRequests, loading: isWithdrawRequestsLoading } = useSelector(
		(state) => state.WithdrawRequests
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchWithdrawRequestsStart({
				perPage: itemsPerPage,
				page: currentPage,
				...formValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting withdraw listing redux state
	useEffect(() => () => dispatch(resetWithdrawRequestsData()), []);

	const formattedWithdrawRequests = useMemo(() => {
		const formattedValues = [];
		if (withdrawRequests) {
			withdrawRequests.rows.map((request) =>
				formattedValues.push({
					...request,
					amountWithCurr: `${request.amount} ${request.User?.currencyCode}`,
					statusText: getStatus(request.status),
					updatedAt: formatDateYMD(request.updatedAt) || 'NA',
				})
			);
		}
		return formattedValues;
	}, [withdrawRequests]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'userId',
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
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Payment Provider',
				accessor: 'paymentProvider',
				filterable: true,
				Cell: ({ cell }) => <PaymentProvider value={cell.value} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'transactionId',
				Cell: ({ cell }) => <TransactionId value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Actionable Type',
				accessor: 'actionableType',
				Cell: ({ cell }) => <ActionableType value={cell.value} />,
			},
			{
				Header: 'Updated At',
				accessor: 'updatedAt',
				Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalWithdrawRequestsCount: withdrawRequests?.count,
		isWithdrawRequestsLoading,
		formattedWithdrawRequests,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useWithdrawRequestsListing;
