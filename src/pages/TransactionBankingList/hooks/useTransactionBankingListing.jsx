/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	fetchTransactionBankingStart,
	resetTransactionBankingData,
} from '../../../store/actions';
import { STATUS_TYPE } from '../constants';
import {
	Purpose,
	Amount,
	CreatedAt,
	Id,
	Status,
	FromWallet,
	ToWallet,
	Tags,
} from '../TransactionBankingCol';

const useTransactionBankingListing = (filterValues = {}, userId = '') => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { transactionBanking, loading: isTransactionBankingLoading } =
		useSelector((state) => state.TransactionBanking);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const defaultCurrency = useSelector(
		(state) => state.Currencies.defaultCurrency
	);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchTransactionBankingStart({
				perPage: itemsPerPage,
				page: currentPage,
				userId,
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
					ledgerId: transaction?.ledgerId || '-',
					amount: transaction?.ledger?.amount ?? '-',
					purpose: transaction?.ledger?.purpose || '-',
					currency: transaction?.ledger?.currency?.code || '-',
					from: transaction?.ledger?.fromWalletId
						? transaction?.user?.username
						: superAdminUser?.username,
					to: transaction?.ledger?.toWalletId
						? transaction?.user?.username
						: superAdminUser?.username,
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
				Cell: ({ cell }) => (
					<Amount
						value={cell.value}
						type={cell?.row?.original?.ledger?.fromWalletId}
						defaultCurrency={defaultCurrency}
					/>
				),
			},
			{
				Header: 'Currency',
				accessor: 'currency',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
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
