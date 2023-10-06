/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
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

export default () => {
	// meta title
	document.title = 'CMS | Skote - Vite React Admin & Dashboard Template';

	const { cmsDetails, formattedCmsDetails, isLoading, page, setPage } =
		useCmsListing();
	const [loading, setLoading] = useState(isLoading);

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
		<>
			<div className="page-content">
				<div className="container-fluid">
					<Breadcrumbs title="Jobs" breadcrumbItem="Staff" />

					{loading && <Spinners setLoading={setLoading} />}

					{!loading && formattedCmsDetails && (
						<Row>
							<Col lg="12">
								<Card>
									<CardBody>
										<TableContainer
											columns={columns}
											data={formattedCmsDetails}
											isGlobalFilter
											isAddOptions={false}
											isPagination
											iscustomPageSizeOptions
											customPageSize={10}
											tableClass="table-bordered align-middle nowrap mt-2"
											paginationDiv="justify-content-center"
											pagination="pagination justify-content-start pagination-rounded"
											totalPageCount={cmsDetails?.count}
											isManualPagination
											onChangePagination={setPage}
											currentPage={page}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
					)}
				</div>
			</div>
			<ToastContainer />
		</>
	);
};
