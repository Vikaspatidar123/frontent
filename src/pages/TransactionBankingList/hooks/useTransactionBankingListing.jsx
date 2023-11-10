/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactionBankingStart } from '../../../store/actions';
import { statusType, transactionType, walletType } from '../constants';
import { getDateTime } from '../../../helpers/dateFormatter';
import {
	ActionType,
	Actionee,
	ActioneeType,
	Amount,
	CreatedAt,
	Id,
	PaymentProvider,
	Status,
	TransactionId,
} from '../TransactionBankingCol';

const useTransactionBankingListing = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { transactionBanking, loading: isTransactionBankingLoading } =
		useSelector((state) => state.TransactionBanking);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const handleWalletType = ({ type, amountType }) => {
		if (
			[
				'addMoney',
				'removeMoney',
				'addMoneyInternal',
				'removeMoneyInternal',
			]?.includes(type)
		) {
			return `(${walletType[amountType]})`;
		}
		return '';
	};

	useEffect(() => {
		dispatch(
			fetchTransactionBankingStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				userId: userId || '',
			})
		);
	}, [currentPage, itemsPerPage]);

	const formattedTransactionBanking = useMemo(() => {
		const formattedValues = [];
		if (transactionBanking) {
			transactionBanking.rows.map((transaction) =>
				formattedValues.push({
					...transaction,
					amountWithCurr:
						transaction.amount >= 0
							? `${transaction.amount} ${transaction.currencyCode}`
							: `-${transaction.amount} ${transaction.currencyCode}`,
					status: statusType.find(
						(status) => status.value === transaction.status
					).label,
					actionType: `${
						transactionType.find(
							(type) => type.value === transaction.transactionType
						).label
					} ${handleWalletType({
						type: transaction.transactionType,
						amountType: transaction.amountType,
					})}`,
					createdAt: getDateTime(transaction.createdAt),
				})
			);
		}
		return formattedValues;
	}, [transactionBanking]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'transactionBankingId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'paymentTransactionId',
				filterable: true,
				Cell: (cellProps) => <TransactionId {...cellProps} />,
			},
			{
				Header: 'Actionee',
				accessor: 'actioneeEmail',
				filterable: true,
				Cell: (cellProps) => <Actionee {...cellProps} />,
			},
			{
				Header: 'Payment Provider',
				accessor: 'paymentProvider',
				filterable: true,
				Cell: (cellProps) => <PaymentProvider {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: (cellProps) => <ActionType {...cellProps} />,
			},
			{
				Header: 'Actionee Type',
				accessor: 'actioneeType',
				Cell: (cellProps) => <ActioneeType {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: (cellProps) => <CreatedAt {...cellProps} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount: transactionBanking?.count,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useTransactionBankingListing;
