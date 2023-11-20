/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewManagementStart } from '../../../store/actions';
import {
	Actions,
	Description,
	Id,
	Rating,
	Status,
	UserName,
} from '../ReviewManagementListCol';

const useReviewManagementListing = (formValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		reviewManagement,
		loading: isReviewManagementLoading,
		isCreateReviewSuccess,
	} = useSelector((state) => state.ReviewManagement);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			fetchReviewManagementStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...formValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

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

	useEffect(() => {
		if (isCreateReviewSuccess) fetchData();
	}, [isCreateReviewSuccess]);

	const columns = useMemo(() => [
		{
			Header: 'Id',
			accessor: 'reviewId',
			filterable: true,
			Cell: ({ cell }) => <Id value={cell.value} />,
		},
		{
			Header: 'Username',
			accessor: 'userName',
			filterable: true,
			Cell: ({ cell }) => <UserName value={cell.value} />,
		},
		{
			Header: 'Description',
			accessor: 'description',
			filterable: true,
			Cell: ({ cell }) => <Description value={cell.value} />,
		},
		{
			Header: 'Rating',
			accessor: 'rating',
			filterable: true,
			Cell: ({ cell }) => <Rating value={cell.value} />,
		},
		{
			Header: 'Status',
			accessor: 'status',
			filterable: true,
			disableSortBy: true,
			Cell: ({ cell }) => <Status value={cell.value} />,
		},
		{
			Header: 'Actions',
			filterable: true,
			disableSortBy: true,
			Cell: ({ cell }) => <Actions row={cell.row} />,
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalReviewManagementCount: reviewManagement?.count,
		isReviewManagementLoading,
		formattedReviewManagement,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useReviewManagementListing;
