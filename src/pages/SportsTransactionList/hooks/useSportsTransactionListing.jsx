import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSportsTransactionStart } from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';

const itemsPerPage = 10;

const useSportsTransactionListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsTransaction, loading: isSportsTransactionLoading } =
		useSelector((state) => state.SportsTransaction);

	useEffect(() => {
		dispatch(
			fetchSportsTransactionStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				email: searchText,
			})
		);
	}, [currentPage, searchText]);

	const formattedSportsTransaction = useMemo(() => {
		const formattedValues = [];
		if (sportsTransaction) {
			sportsTransaction.rows.map((txn) =>
				formattedValues.push({
					...txn,
					email: txn.users.email,
					currencyCode: txn.users.currencyCode,
					createdAt: getDateTime(txn.createdAt),
				})
			);
		}
		return formattedValues;
	}, [sportsTransaction]);

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalSportsTransactionCount: sportsTransaction?.count,
		isSportsTransactionLoading,
		formattedSportsTransaction,
		itemsPerPage,
	};
};

export default useSportsTransactionListing;
