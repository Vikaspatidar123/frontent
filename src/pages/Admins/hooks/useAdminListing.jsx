/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllAdmins, resetAdminsData } from '../../../store/actions';
import {
	AdminUserID,
	Email,
	FullName,
	Status,
	Role,
	// Group,
} from '../AdminsListCol';
import ActionButtons from '../ActionButtons';
import { updateSuperAdminStatusStart } from '../../../store/adminUser/actions';
import { getRandomColor } from '../../../helpers/common';
import { STORAGE_KEY } from '../../../components/Common/constants';
import { encryptCredentials } from '../../../network/storageUtils';
import { modules } from '../../../constants/permissions';

const useAdminListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { adminDetails, isLoading } = useSelector((state) => state.AllAdmins);

	const { roles } = useSelector((state) => state?.AdminRoles);
	const [page, setPage] = useState(1);

	const formattedAdminDetails = useMemo(() => {
		if (adminDetails?.staff?.length && roles?.length > 0) {
			return adminDetails?.staff?.map((admin) => {
				const randomColor = getRandomColor();
				return {
					...admin,
					fullName: `${admin.firstName || ''} ${admin.lastName || ''} ${
						!admin?.firstName && !admin?.lastName ? '-' : ''
					}`,
					randomColor,
					roleName: admin?.adminRole?.name || '-',
				};
			});
		}
		return [];
	}, [adminDetails, roles]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { adminUserId } = props;
		dispatch(
			updateSuperAdminStatusStart({
				childAdminId: Number(adminUserId),
			})
		);
	};

	const handleView = (e, adminData) => {
		e.preventDefault();
		localStorage.setItem(
			`${STORAGE_KEY.ADMIN_VIEW}_${adminData.id}`,
			encryptCredentials(JSON.stringify(adminData))
		);
		navigate(`/staff/details/${adminData.id}`);
	};

	const fetchData = () => {
		dispatch(
			getAllAdmins({
				perPage: itemsPerPage,
				page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		if (location.pathname === '/staff') fetchData();
		return () => dispatch(resetAdminsData());
	}, [page, location, itemsPerPage]);

	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('add');
	};
	const handleEdit = (e, row) => {
		e.preventDefault();
		localStorage.setItem(
			`${STORAGE_KEY.ADMIN_EDIT}_${row.id}`,
			encryptCredentials(JSON.stringify(row))
		);
		setTimeout(() => {
			navigate(`edit/${row.id}`);
		}, 200);
	};

	const buttonList = [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.admin,
			operation: 'C',
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableFilters: true,
				filterable: true,
				notHidable: true,
				disableSortBy: true,
				accessor: (prop) => {
					const { fullName, randomColor } = prop;
					return (
						<div className="avatar-xs">
							<span
								className={`avatar-title rounded-circle ${randomColor} text-${randomColor}`}
							>
								{fullName?.charAt(0)?.toUpperCase()}
							</span>
						</div>
					);
				},
			},
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
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
						adminData={cell?.row?.original}
						handleView={handleView}
					/>
				),
			},
			{
				Header: 'Role',
				accessor: 'roleName',
				filterable: true,
				Cell: ({ cell }) => <Role value={cell.value} />,
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
						handleView={handleView}
					/>
				),
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	return {
		isLoading,
		totalPages: adminDetails?.totalPages,
		page,
		setPage,
		itemsPerPage,
		columns,
		formattedAdminDetails,
		buttonList,
		onChangeRowsPerPage,
	};
};

useAdminListing.propTypes = {};

useAdminListing.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useAdminListing;
