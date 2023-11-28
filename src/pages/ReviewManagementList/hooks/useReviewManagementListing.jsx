/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { fetchReviewManagementStart } from '../../../store/actions';
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
		if ((isCreateReviewSuccess, isUpdateReviewSuccess)) fetchData();
	}, [isCreateReviewSuccess, isUpdateReviewSuccess]);

	const columns = useMemo(
		() => [
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
									hidden={!isGranted(modules.CasinoManagement, 'U')}
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
