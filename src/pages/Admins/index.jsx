/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '../../components/Common/Breadcrumb';
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

const Admins = ({ t }) => {
	// meta title
	document.title = 'Staff | Skote - Vite React Admin & Dashboard Template';

	const {
		formattedAdminDetails,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
	} = useAdminListing();

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
					<Breadcrumbs title={t('Staff')} breadcrumbItem={t('Staff')} />
					<TableContainer
						columns={columns}
						data={formattedAdminDetails}
						isGlobalFilter
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={totalAdminsCount}
						isManualPagination
						onChangePagination={setPage}
						currentPage={page}
						isLoading={!isLoading}
					/>
				</Container>
			</div>
			<ToastContainer />
		</>
	);
};

Admins.propTypes = {
	t: PropTypes.func,
};

Admins.defaultProps = {
	t: (string) => string,
};

export default Admins;
