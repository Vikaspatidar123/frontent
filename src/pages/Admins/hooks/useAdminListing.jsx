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
import { getRandomColor } from '../../../helpers/common';

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
			return adminDetails?.rows.map((admin) => {
				const randomColor = getRandomColor();
				return {
					...admin,
					fullName: `${admin.firstName} ${admin.lastName}`,
					randomColor,
				};
			});
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
				disableSortBy: true,
				accessor: (prop) => {
					const { fullName, randomColor } = prop;
					return (
						<div className="avatar-xs">
							<span
								className={`avatar-title rounded-circle bg-${randomColor}-subtle text-${randomColor}`}
							>
								{fullName?.charAt(0)?.toUpperCase()}
							</span>
						</div>
					);
				},
			},
			{
				Header: 'ID',
				accessor: 'adminUserId',
				filterable: true,
				Cell: ({ cell }) => <AdminUserID value={cell.value} />,
			},
			{
				Header: 'Name',
				accessor: 'fullName',
				filterable: true,
				Cell: ({ cell }) => <FullName value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => (
					<Email
						value={cell.value}
						adminUserId={cell?.row?.original?.adminUserId}
					/>
				),
			},
			{
				Header: 'Role',
				accessor: 'adminRoleId',
				filterable: true,
				Cell: ({ cell }) => <Role value={cell.value} />,
			},
			{
				Header: 'Group',
				accessor: 'group',
				filterable: true,
				Cell: ({ cell }) => <Group value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						handleEdit={handleEdit}
						row={cell.row}
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
