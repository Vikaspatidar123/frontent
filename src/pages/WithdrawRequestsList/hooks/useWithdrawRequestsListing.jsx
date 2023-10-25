/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWithdrawRequestsStart } from '../../../store/actions';
import { formatDateYMD } from '../../../helpers/dateFormatter';
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

const useWithdrawRequestsListing = () => {
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
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	}, [currentPage, itemsPerPage]);

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
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => <Email {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Payment Provider',
				accessor: 'paymentProvider',
				filterable: true,
				Cell: (cellProps) => <PaymentProvider {...cellProps} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'transactionId',
				Cell: (cellProps) => <TransactionId {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Actionable Type',
				accessor: 'actionableType',
				Cell: (cellProps) => <ActionableType {...cellProps} />,
			},
			{
				Header: 'Updated At',
				accessor: 'updatedAt',
				Cell: (cellProps) => <UpdatedAt {...cellProps} />,
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
