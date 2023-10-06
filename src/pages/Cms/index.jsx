/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import {
	CmsPageId,
	Title,
	Slug,
	Portal,
	Status,
	ActionButtons,
} from './CmsListCol';
import useCmsListing from './hooks/useCmsListing';

const Cms = () => {
	// meta title
	document.title = 'CMS | Skote - Vite React Admin & Dashboard Template';

	const {
		formattedCmsDetails,
		isLoading,
		page,
		setPage,
		itemsPerPage,
		totalCmsCount,
	} = useCmsListing();

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'cmsPageId',
				filterable: true,
				Cell: (cellProps) => <CmsPageId {...cellProps} />,
			},
			{
				Header: 'Title',
				accessor: 'title',
				filterable: true,
				Cell: (cellProps) => <Title {...cellProps} />,
			},
			{
				Header: 'Slug',
				accessor: 'slug',
				filterable: true,
				Cell: (cellProps) => <Slug {...cellProps} />,
			},
			{
				Header: 'Portal',
				accessor: 'portal',
				filterable: true,
				Cell: (cellProps) => <Portal {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableFilters: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: () => <ActionButtons />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
				<Container fluid>
					<Breadcrumbs title="Jobs" breadcrumbItem="Staff" />

					<TableContainer
						columns={columns}
						data={formattedCmsDetails}
						isAddOptions={false}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={totalCmsCount}
						isManualPagination
						onChangePagination={setPage}
						currentPage={page}
						isLoading={!isLoading}
					/>
				</Container>
			</div>
	);
};

Cms.propTypes = {
	t: PropTypes.func,
};

Cms.defaultProps = {
	t: (string) => string,
};

export default Cms;
