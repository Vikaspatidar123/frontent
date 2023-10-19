import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactionBankingStart } from '../../../store/actions';
import { statusType, transactionType, walletType } from '../constants';
import { getDateTime } from '../../../helpers/dateFormatter';

const useTransactionBankingListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
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
				paymentProvider: searchText,
			})
		);
	}, [currentPage, searchText, itemsPerPage]);

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

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount: transactionBanking?.count,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useTransactionBankingListing;
