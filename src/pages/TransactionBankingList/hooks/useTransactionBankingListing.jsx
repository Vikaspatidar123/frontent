/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	fetchTransactionBankingStart,
	resetTransactionBankingData,
} from '../../../store/actions';
import { statusType, transactionType, walletType } from '../constants';
import { formatDateYMD, getDateTime } from '../../../helpers/dateFormatter';
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
import { downloadFileInNewWindow } from '../../../utils/helpers';
import { getAccessToken } from '../../../network/storageUtils';

// import { modules } from '../../../constants/permissions';

const { VITE_APP_API_URL } = import.meta.env;

const useTransactionBankingListing = (userId, filterValues = {}) => {
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
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting transactions listing redux state
	useEffect(() => () => dispatch(resetTransactionBankingData()), []);

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
					)?.label,
					actionType: `${
						transactionType.find(
							(type) => type.value === transaction.transactionType
						)?.label
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
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'paymentTransactionId',
				filterable: true,
				Cell: ({ cell }) => <TransactionId value={cell.value} />,
			},
			{
				Header: 'Actionee',
				accessor: 'actioneeEmail',
				filterable: true,
				Cell: ({ cell }) => <Actionee value={cell.value} />,
			},
			{
				Header: 'Payment Provider',
				accessor: 'paymentProvider',
				filterable: true,
				Cell: ({ cell }) => <PaymentProvider value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
			},
			{
				Header: 'Actionee Type',
				accessor: 'actioneeType',
				Cell: ({ cell }) => <ActioneeType value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		],
		[]
	);

	const handleDownload = () =>
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/admin/transactions?csvDownload=true&limit=${itemsPerPage}&pageNo=${currentPage}&actioneeType=${
				filterValues.actioneeType || ''
			}&startDate=${formatDateYMD(
				filterValues.startDate || moment().subtract(1, 'month').utc().toDate()
			)}&endDate=${formatDateYMD(
				filterValues.endDate || new Date()
			)}&currencyCode=${filterValues.currencyCode || ''}&transactionType=${
				filterValues.transactionType || ''
			}&adminId=${''}&paymentProvider=${
				filterValues.paymentProvider
			}&token=${getAccessToken()}`
		);

	const buttonList = useMemo(() => [
		{
			label: '',
			handleClick: handleDownload,
			link: '#!',
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount: transactionBanking?.count,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		buttonList,
	};
};

export default useTransactionBankingListing;
