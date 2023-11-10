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

const useAdmin = (handleEdit, filterValues = {}) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { adminDetails, isLoading, error } = useSelector(
		(state) => state.AllAdmins
	);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState('adminUserId');
	const [sort, setSort] = useState('desc');
	const [name, setName] = useState();

	const formattedAdminDetails = useMemo(() => {
		if (adminDetails) {
			return adminDetails?.rows.map((admin) => ({
				...admin,
				fullName: `${admin.firstName} ${admin.lastName}`,
			}));
		}
		return [];
	}, [adminDetails]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: isActive, adminUserId } = props;
		dispatch(
			updateSuperAdminStatusStart({
				code: 'ADMIN',
				status: !isActive,
				adminId: adminUserId,
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
				adminRoleId: adminDetails?.adminRoleId,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		if (location.pathname === '/staff') fetchData();
	}, [page, orderBy, sort, location, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableFilters: true,
				filterable: true,
				accessor: (cellProps) => (
					// <div className="avatar-xs btn-soft-primary btn-rounded">
					// 	<span className="d-flex align-items-center justify-content-center h-100 w-100 rounded-circle">
					<div className="avatar-xs">
						<span className="avatar-title rounded-circle">
							{cellProps.fullName.charAt(0)}
						</span>
					</div>
				),
			},
			{
				Header: 'ID',
				accessor: 'adminUserId',
				filterable: true,
				Cell: ({ cell }) => <AdminUserID cell={cell} />,
			},
			{
				Header: 'Name',
				accessor: 'fullName',
				filterable: true,
				Cell: ({ cell }) => <FullName cell={cell} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Email cell={cell} />,
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
		sort,
		setSort,
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
