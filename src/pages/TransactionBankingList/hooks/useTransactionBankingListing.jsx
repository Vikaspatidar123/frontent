/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	fetchTransactionBankingStart,
	resetTransactionBankingData,
} from '../../../store/actions';
import { LEDGER_TYPES, STATUS_TYPE } from '../constants';
import {
	Purpose,
	TransactionType,
	Amount,
	CreatedAt,
	Id,
	Status,
	FromWallet,
	ToWallet,
	Tags,
} from '../TransactionBankingCol';

const useTransactionBankingListing = (userId, filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { transactionBanking, loading: isTransactionBankingLoading } =
		useSelector((state) => state.TransactionBanking);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchTransactionBankingStart({
				perPage: itemsPerPage,
				page: currentPage,
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
			transactionBanking?.transactions?.map((transaction) => {
				const transactionData = {
					...transaction,
					ledgerId: transaction?.ledgerId,
					amount: transaction?.ledger?.amount,
					purpose: transaction?.ledger?.purpose,
					transactionType: LEDGER_TYPES.find(
						(type) => type.value === transaction?.ledger?.type
					)?.label,
					status: STATUS_TYPE.find(
						(status) => status.value === transaction?.status
					)?.label,
					createdAt: moment(transaction?.createdAt)
						.local()
						.format('YYYY-MM-DD HH:mm:ss'),
					userTags:
						transaction?.toUserWallet?.user?.userTags
							?.map((tags) => tags?.tag?.tag)
							?.join(', ') || '-',
				};

				if (transaction?.fromAdminWallet && transaction?.toUserWallet) {
					transactionData.from = transaction?.adminUser?.username;
					transactionData.to = transaction?.toUserWallet?.user?.username;
				} else if (transaction?.fromUserWallet && transaction?.toAdminWallet) {
					transactionData.from = transaction?.fromUserWallet?.user?.username;
					transactionData.to = transaction?.adminUser?.username;
				}

				formattedValues.push(transactionData);
				return [];
			});
		}
		return formattedValues;
	}, [transactionBanking]);

	const columns = useMemo(
		() => [
			{
				Header: 'Ledger Id',
				accessor: 'ledgerId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'From',
				accessor: 'from',
				filterable: true,
				Cell: ({ cell }) => <FromWallet value={cell.value} />,
			},
			{
				Header: 'To',
				accessor: 'to',
				filterable: true,
				Cell: ({ cell }) => <ToWallet value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				filterable: true,
				Cell: ({ cell }) => <Purpose value={cell.value} />,
			},
			{
				Header: 'Tags',
				accessor: 'userTags',
				filterable: true,
				Cell: ({ cell }) => <Tags value={cell?.value} />,
			},
			{
				Header: 'Transaction Type',
				accessor: 'transactionType',
				Cell: ({ cell }) => <TransactionType value={cell.value} />,
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

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: formattedTransactionBanking,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount: transactionBanking?.transactions?.length || 0,
		transactionBanking,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useTransactionBankingListing;
