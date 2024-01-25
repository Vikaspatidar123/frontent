/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	fetchTransactionBankingStart,
	resetTransactionBankingData,
} from '../../../store/actions';
import { LEDGER_TYPES, statusType } from '../constants';
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
					id: transaction?.id,
					actionee: transaction?.transaction?.adminUser?.email,
					amountWithCurr: transaction.amount,
					purpose: transaction?.purpose,
					currencyCode: transaction?.wallet?.currency?.code,
					transactionType: LEDGER_TYPES.find(
						(trans) => trans.value === transaction?.type
					)?.label,
					status: statusType.find(
						(status) => status.value === transaction?.transaction?.status
					)?.label,
					// actionType: `${transactionType.find(
					//   (type) => type.value === transaction.transactionType
					// )?.label
					//   } ${handleWalletType({
					//     type: transaction.transactionType,
					//     amountType: transaction.amountType,
					//   })}`,
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
				Header: 'Id',
				accessor: 'id',
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
				Header: 'Actionee',
				accessor: 'actionee',
				filterable: true,
				Cell: ({ cell }) => <Actionee value={cell.value} />,
			},
			// {
			//   Header: 'Payment Provider',
			//   accessor: 'paymentProvider',
			//   filterable: true,
			//   Cell: ({ cell }) => <PaymentProvider value={cell.value} />,
			// },
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: ({ cell }) => (
					<Amount
						value={cell.value}
						currencyCode={cell?.row?.original?.currencyCode}
					/>
				),
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
		totalTransactionBankingCount: transactionBanking?.count,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	};
};

export default useTransactionBankingListing;
