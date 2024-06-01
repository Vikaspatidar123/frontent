/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	deleteCms,
	getAllCmsDetails,
	resetAllCmsDetails,
	updateSaCmsStatus,
} from '../../../store/cms/actions';
import { CmsPageId, Title, Slug, Portal, Status } from '../CmsListCol';
import ActionButtons from '../ActionButtons';

const useCmsListing = (filterValues = {}) => {
	const navigate = useNavigate();
	const { cmsDetails, isLoading, error, isDeleteCmsLoading } = useSelector(
		(state) => state.AllCms
	);
	const [limit, setLimit] = useState(10);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [selectedClient, setSelectedClient] = useState('');
	const [deleteCmsId, setDeleteCmsId] = useState('');
	const [isDeleteConfirmationOpen, setDeleteConfirmation] = useState(false);

	const dispatch = useDispatch();

	const formattedCmsDetails = useMemo(() => {
		if (cmsDetails) {
			return cmsDetails?.pages.map((detail) => ({
				...detail,
				title: detail?.title?.EN,
				portal: detail?.tenant?.name
					? `${detail?.tenant?.name} ${detail.tenant?.domain}`
					: 'All',
			}));
		}
		return [];
	}, [cmsDetails]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getAllCmsDetails({
				perPage: itemsPerPage,
				page,
				adminId: selectedClient,
				...filterValues,
			})
		);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { id } = props;
		dispatch(
			updateSaCmsStatus({
				pageId: id,
			})
		);
	};

	const handleClose = () => {
		setDeleteConfirmation(false);
		setDeleteCmsId('');
		fetchData();
	};

	const cmsDeleteHandler = () => {
		dispatch(
			deleteCms({
				data: {
					pageId: deleteCmsId,
				},
				handleClose,
			})
		);
	};

	const handleEditClick = (e, cmsPageId) => {
		e.preventDefault();
		navigate(`edit/${cmsPageId}`);
	};

	const handleViewClick = (e, cmsPageId) => {
		e.preventDefault();
		navigate(`details/${cmsPageId}`);
	};

	const handleDelete = (id) => {
		setDeleteConfirmation(true);
		setDeleteCmsId(id);
	};

	useEffect(() => {
		fetchData();
	}, [limit, selectedClient, page, itemsPerPage]);

	// resetting cms list redux state
	useEffect(() => () => dispatch(resetAllCmsDetails()), []);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <CmsPageId value={cell.value} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'SLUG',
				accessor: 'slug',
				filterable: true,
				Cell: ({ cell }) => <Slug value={cell.value} />,
			},
			{
				Header: 'PORTAL',
				accessor: 'portal',
				filterable: true,
				Cell: ({ cell }) => <Portal value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						handleEditClick={handleEditClick}
						handleViewClick={handleViewClick}
						handleDelete={handleDelete}
					/>
				),
			},
		],
		[]
	);

	return {
		cmsDetails,
		formattedCmsDetails,
		isLoading,
		itemsPerPage,
		totalCmsCount: cmsDetails?.totalPages || 0,
		error,
		setLimit,
		setPage,
		setSelectedClient,
		handleStatus,
		onChangeRowsPerPage,
		columns,
		isDeleteConfirmationOpen,
		setDeleteConfirmation,
		cmsDeleteHandler,
		isDeleteCmsLoading,
	};
};

export default useCmsListing;
