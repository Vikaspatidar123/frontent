/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchCasinoTransactionsStart } from '../../../store/actions';
import { getDateTime, formatDateYMD } from '../../../helpers/dateFormatter';
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
import { modules } from '../../../constants/permissions';
import { getAccessToken } from '../../../network/storageUtils';
import { downloadFileInNewWindow } from '../../../utils/helpers';

const { VITE_APP_API_URL } = import.meta.env;

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
				accessor: 'statusText',
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

	const handleDownload = () =>
		downloadFileInNewWindow(`${VITE_APP_API_URL}/api/admin/casino/transactions?csvDownload=true
    &limit=${itemsPerPage}&pageNo=${currentPage}&startDate=${formatDateYMD(
			filterValues.startDate || moment().subtract(1, 'month').utc().toDate()
		)}&endDate=${formatDateYMD(
			filterValues.endDate || new Date()
		)}&currencyCode=${filterValues.currencyCode || ''}&transactionType=${
			filterValues.transactionType || ''
		}&email=${filterValues.email || ''}&adminId=${''}&token=${
			getAccessToken() || ''
		}`);

	const buttonList = useMemo(() => [
		{
			label: '',
			handleClick: handleDownload,
			link: '#!',
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			module: modules.CasinoManagement,
			operation: 'R',
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
		buttonList,
	};
};

export default useCasinoTransactionsListing;
