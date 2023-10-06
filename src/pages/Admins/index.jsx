/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import TableContainer from '../../components/Common/TableContainer';
import useAdminListing from './hooks/useAdminListing';

import {
	Email,
	FullName,
	Status,
	Role,
	Group,
	AdminUserID,
	ActionButtons,
} from './AdminsListCol';

export default () => {
	// meta title
	document.title = 'Staff | Skote - Vite React Admin & Dashboard Template';

	const { adminDetails, formattedAdminDetails, loading, page, setPage } =
		useAdminListing();

	const [isLoading, setLoading] = useState(loading);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'adminUserId',
				filterable: true,
				Cell: (cellProps) => <AdminUserID {...cellProps} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => <Email {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'fullName',
				filterable: true,
				Cell: (cellProps) => <FullName {...cellProps} />,
			},
			{
				Header: 'Role',
				accessor: 'adminRoleId',
				filterable: true,
				Cell: (cellProps) => <Role {...cellProps} />,
			},
			{
				Header: 'Group',
				accessor: 'group',
				filterable: true,
				Cell: (cellProps) => <Group {...cellProps} />,
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
				<Container fluid>
					<Breadcrumbs title="Jobs" breadcrumbItem="Staff" />

					{isLoading && <Spinners setLoading={setLoading} />}

					{!isLoading && formattedAdminDetails && (
						<Row>
							<Col lg="12">
								<Card>
									<CardBody>
										<TableContainer
											columns={columns}
											data={formattedAdminDetails}
											isGlobalFilter
											isPagination
											iscustomPageSizeOptions
											customPageSize={10}
											tableClass="table-bordered align-middle nowrap mt-2"
											// paginationDiv="col-sm-12 col-md-7",
											paginationDiv="justify-content-center"
											pagination="pagination justify-content-start pagination-rounded"
											totalPageCount={adminDetails?.count}
											isManualPagination
											onChangePagination={setPage}
											currentPage={page}
										/>
									</CardBody>
								</Card>
							</Col>
						</Row>
					)}
				</Container>
			</div>
			<ToastContainer />
		</>
	);
};
