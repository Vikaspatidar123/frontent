import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewManagementStart } from '../../../store/actions';

const itemsPerPage = 10;

const useReviewManagementListing = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { reviewManagement, loading: isReviewManagementLoading } = useSelector(
		(state) => state.ReviewManagement
	);

	useEffect(() => {
		dispatch(
			fetchReviewManagementStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText]);

	const formattedReviewManagement = useMemo(() => {
		const formattedValues = [];
		if (reviewManagement) {
			reviewManagement.rows.map((review) =>
				formattedValues.push({
					...review,
					status: review.status ? 'Active' : 'In-Active',
				})
			);
		}
		return formattedValues;
	}, [reviewManagement]);

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalReviewManagementCount: reviewManagement?.count,
		isReviewManagementLoading,
		formattedReviewManagement,
		itemsPerPage,
	};
};

export default useReviewManagementListing;
