/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import {
	fetchReviewManagementStart,
	resetReviewManagementData,
} from '../../../store/actions';
import {
	Description,
	Id,
	Rating,
	Status,
	UserName,
} from '../ReviewManagementListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';

const useReviewManagementListing = ({ formValues = {}, handleEditClick }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		reviewManagement,
		loading: isReviewManagementLoading,
		isCreateReviewSuccess,
		isUpdateReviewSuccess,
	} = useSelector((state) => state.ReviewManagement);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			fetchReviewManagementStart({
				perPage: itemsPerPage,
				page: currentPage,
				...formValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	// resetting review management redux state
	useEffect(() => () => dispatch(resetReviewManagementData()), []);

	const formattedReviewManagement = useMemo(() => {
		const formattedValues = [];
		if (reviewManagement) {
			reviewManagement.rows.map((review) =>
				formattedValues.push({
					...review,
					status: review.status ? 'Active' : 'Inactive',
					userName: review?.user?.username,
				})
			);
		}
		return formattedValues;
	}, [reviewManagement]);

	useEffect(() => {
		if ((isCreateReviewSuccess, isUpdateReviewSuccess)) fetchData();
	}, [isCreateReviewSuccess, isUpdateReviewSuccess]);

	const columns = useMemo(
		() => [
			{
				Header: 'Review Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'User Id',
				accessor: 'userId',
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
				accessor: 'comment',
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
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Actions',
				accessor: 'action',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					const { isGranted } = usePermission();
					const reviewId = cell?.row?.original?.reviewId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Button
									type="button"
									hidden={!isGranted(modules.casinoManagement, 'U')}
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										handleEditClick(e, cell?.row?.original);
									}}
								>
									<i
										className="mdi mdi-pencil-outline"
										id={`edittooltip-${reviewId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`edittooltip-${reviewId}`}
									>
										Edit
									</UncontrolledTooltip>
								</Button>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

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
