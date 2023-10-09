/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useAdminListing from './hooks/useAdminListing';

import {
	AdminUserID,
	Email,
	FullName,
	Status,
	Role,
	Group,
} from './AdminsListCol';
import ActionButtons from './ActionButtons';

const columns = [
	{
		Header: 'ID',
		accessor: 'adminUserId',
		filterable: true,
		Cell: ({ cell }) => <AdminUserID cell={cell} />,
	},
	{
		Header: 'Email',
		accessor: 'email',
		filterable: true,
		Cell: ({ cell }) => <Email cell={cell} />,
	},
	{
		Header: 'Name',
		accessor: 'fullName',
		filterable: true,
		Cell: ({ cell }) => <FullName cell={cell} />,
	},
	{
		Header: 'Role',
		accessor: 'adminRoleId',
		filterable: true,
		Cell: ({ cell }) => <Role cell={cell} />,
	},
	{
		Header: 'Group',
		accessor: 'group',
		filterable: true,
		Cell: ({ cell }) => <Group cell={cell} />,
	},
	{
		Header: 'Status',
		accessor: 'isActive',
		disableFilters: true,
		Cell: ({ cell }) => <Status cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

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

	return (
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
	);
};

Admins.propTypes = {
	t: PropTypes.func,
};

Admins.defaultProps = {
	t: (string) => string,
};

export default Admins;
