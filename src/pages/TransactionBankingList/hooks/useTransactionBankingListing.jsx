/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	fetchTransactionBankingStart,
	resetTransactionBankingData,
} from '../../../store/actions';
// import { LEDGER_TYPES, statusType } from '../constants';
// import { formatDateYMD } from '../../../helpers/dateFormatter';
import {
	Purpose,
	Actionee,
	TransactionType,
	Amount,
	CreatedAt,
	Id,
	Status,
} from '../TransactionBankingCol';
import { KeyValueCell } from '../../PlayerDetails/TableCol';
// import { downloadFileInNewWindow } from '../../../utils/helpers';
// import { getAccessToken } from '../../../network/storageUtils';

// import { modules } from '../../../constants/permissions';

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

	// const handleWalletType = ({ type, amountType }) => {
	//   if (
	//     [
	//       'addMoney',
	//       'removeMoney',
	//       'addMoneyInternal',
	//       'removeMoneyInternal',
	//     ]?.includes(type)
	//   ) {
	//     return `(${walletType[amountType]})`;
	//   }
	//   return '';
	// };

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
			transactionBanking?.transactions?.map((transaction) =>
				formattedValues.push({
					ledgerId: transaction?.ledgerId,
					actionee: transaction?.actioneeId,
					amount: transaction?.ledger?.amount,
					purpose: transaction?.ledger?.purpose,
					currencyCode: transaction?.wallet?.currency?.code,
					transactionType: transaction?.ledger?.type,
					status: transaction?.status,
					createdAt: moment(transaction?.createdAt)
						.local()
						.format('YYYY-MM-DD HH:mm:ss'),
				})
			);
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
			// {
			// 	Header: 'Transaction Id',
			// 	accessor: 'paymentTransactionId',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <TransactionId value={cell.value} />,
			// },
			{
				Header: 'Actionee Id',
				accessor: 'actionee',
				filterable: true,
				Cell: ({ cell }) => <Actionee value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => (
					<Amount
						value={cell.value}
						currencyCode={cell?.row?.original?.currencyCode}
					/>
				),
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				filterable: true,
				Cell: ({ cell }) => <Purpose value={cell.value} />,
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
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useTransactionBankingListing;
