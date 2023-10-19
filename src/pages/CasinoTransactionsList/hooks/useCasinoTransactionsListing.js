import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCasinoTransactionsStart } from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
import { statusType } from '../constants';

const useCasinoTransactionsListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);

	useEffect(() => {
		dispatch(
			fetchCasinoTransactionsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				email: searchText,
			})
		);
	}, [currentPage, searchText, itemsPerPage]);

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

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalCasinoTransactionsCount: casinoTransactions?.count,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useCasinoTransactionsListing;
