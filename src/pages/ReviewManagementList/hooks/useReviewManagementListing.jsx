/* eslint-disable react/jsx-props-no-spreading */
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
			Cell: (cellProps) => <Id {...cellProps} />,
		},
		{
			Header: 'Username',
			accessor: 'userName',
			filterable: true,
			Cell: (cellProps) => <UserName {...cellProps} />,
		},
		{
			Header: 'Description',
			accessor: 'description',
			filterable: true,
			Cell: (cellProps) => <Description {...cellProps} />,
		},
		{
			Header: 'Rating',
			accessor: 'rating',
			filterable: true,
			Cell: (cellProps) => <Rating {...cellProps} />,
		},
		{
			Header: 'Status',
			accessor: 'status',
			filterable: true,
			Cell: (cellProps) => <Status {...cellProps} />,
		},
		{
			Header: 'Actions',
			filterable: true,
			Cell: (cellProps) => <Actions {...cellProps} />,
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
