/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllCmsDetails,
	updateSaCmsStatus,
} from '../../../store/cms/actions';
import { CmsPageId, Title, Slug, Portal, Status } from '../CmsListCol';
import ActionButtons from '../ActionButtons';

const useCmsListing = () => {
	const { cmsDetails, isLoading, error } = useSelector((state) => state.AllCms);
	const [limit, setLimit] = useState(15);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');
	const [active, setActive] = useState('');
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const formattedCmsDetails = useMemo(() => {
		if (cmsDetails) {
			return cmsDetails?.rows.map((detail) => ({
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
				limit: itemsPerPage,
				pageNo: page,
				tenantId: selectedPortal,
				adminId: selectedClient,
				search,
				isActive: active,
			})
		);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, cmsPageId } = props;
		setShow((prev) => !prev);
		dispatch(
			updateSaCmsStatus({
				data: {
					code: 'CMS',
					cmsPageId,
					status: !status,
				},
				limit,
				pageNo: page,
				tenantId: selectedPortal,
				adminId: selectedClient,
				search,
				isActive: active,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, selectedPortal, selectedClient, active, page, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'cmsPageId',
				filterable: true,
				Cell: ({ cell }) => <CmsPageId cell={cell} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title cell={cell} />,
			},
			{
				Header: 'SLUG',
				accessor: 'slug',
				filterable: true,
				Cell: ({ cell }) => <Slug cell={cell} />,
			},
			{
				Header: 'PORTAL',
				accessor: 'portal',
				filterable: true,
				Cell: ({ cell }) => <Portal cell={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: ({ cell }) => <Status cell={cell} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons cell={cell} handleStatus={handleStatus} />
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
		totalCmsCount: cmsDetails?.count,
		error,
		setLimit,
		setPage,
		setSearch,
		setSelectedClient,
		setSelectedPortal,
		setActive,
		handleStatus,
		show,
		setShow,
		onChangeRowsPerPage,
		columns,
	};
};

export default useCmsListing;
