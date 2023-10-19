/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getAdminDetails } from '../../../store/actions';
import {
	AdminUserID,
	Email,
	FullName,
	Status,
	Role,
	Group,
} from '../AdminsListCol';
import ActionButtons from '../ActionButtons';
import { updateSuperAdminStatusStart } from '../../../store/adminUser/actions';

const useAdmin = (handleEdit) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { adminDetails, isLoading, error } = useSelector(
		(state) => state.AllAdmins
	);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState('adminUserId');
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('desc');
	const [status, setStatus] = useState('');
	const [name, setName] = useState();
	const [active, setActive] = useState(false);

	const formattedAdminDetails = useMemo(() => {
		if (adminDetails) {
			return adminDetails?.rows.map((admin) => ({
				...admin,
				fullName: `${admin.firstName} ${admin.lastName}`,
				optionLabel: `${admin.firstName} ${admin.lastName}`,
				value: admin.adminUserId,
			}));
		}
		return [];
	}, [adminDetails]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: isActive, adminUserId } = props;
		setActive((prev) => !prev);
		dispatch(
			updateSuperAdminStatusStart({
				data: {
					code: 'ADMIN',
					status: !isActive,
					adminId: adminUserId,
				},
				limit: itemsPerPage,
				pageNo: page,
				orderBy,
				sort,
				search,
				superAdminId: '',
				superRoleId: '',
				status,
			})
		);
	};

	const fetchData = () => {
		dispatch(
			getAdminDetails({
				limit: itemsPerPage,
				pageNo: page,
				orderBy,
				sort,
				search,
				adminRoleId: adminDetails?.adminRoleId,
				status,
			})
		);
	};

	useEffect(() => {
		if (location.pathname === '/staff') fetchData();
	}, [page, orderBy, sort, status, location, active, itemsPerPage]);

	const columns = useMemo(
		() => [
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
				Cell: (cell) => (
					<ActionButtons
						handleEdit={handleEdit}
						cell={cell}
						handleStatus={handleStatus}
					/>
				),
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		adminDetails,
		formattedAdminDetails,
		isLoading,
		error,
		totalAdminsCount: adminDetails?.count,
		page,
		setPage,
		orderBy,
		setOrderBy,
		search,
		setSearch,
		sort,
		setSort,
		status,
		setStatus,
		name,
		setName,
		itemsPerPage,
		columns,
		handleStatus,
		onChangeRowsPerPage,
	};
};

useAdmin.propTypes = {};

useAdmin.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useAdmin;
