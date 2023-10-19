import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWithdrawRequestsStart } from '../../../store/actions';
import { formatDateYMD } from '../../../helpers/dateFormatter';

const getStatus = (status) => {
	switch (status) {
		case 0:
			return 'Pending';

		case 5:
			return 'Approved';

		case 2:
			return 'Cancelled';

		default:
			return 'NA';
	}
};

const useWithdrawRequestsListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { withdrawRequests, loading: isWithdrawRequestsLoading } = useSelector(
		(state) => state.WithdrawRequests
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchWithdrawRequestsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText, itemsPerPage]);

	const formattedWithdrawRequests = useMemo(() => {
		const formattedValues = [];
		if (withdrawRequests) {
			withdrawRequests.rows.map((request) =>
				formattedValues.push({
					...request,
					amountWithCurr: `${request.amount} ${request.User?.currencyCode}`,
					statusText: getStatus(request.status),
					updatedAt: formatDateYMD(request.updatedAt) || 'NA',
				})
			);
		}
		return formattedValues;
	}, [withdrawRequests]);

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalWithdrawRequestsCount: withdrawRequests?.count,
		isWithdrawRequestsLoading,
		formattedWithdrawRequests,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useWithdrawRequestsListing;
