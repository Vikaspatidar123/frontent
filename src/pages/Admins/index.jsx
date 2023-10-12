/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
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
import { projectName } from '../../constants/config';
import FormModal from '../../components/Common/FormModal';
import useForm from './hooks/useFormModal';
import {
	staticFormFields,
	getInitialValues,
	validationSchema,
	permissionLabel,
} from './formDetails';
import { getRolesStart } from '../../store/auth/roles/actions';
import PermissionForm from './permissionForm';
import { getAllGroupsStart } from '../../store/adminUser/actions';
import { showSnackbar } from '../../store/snackbar/actions';
import { addSuperAdminUserStart } from '../../store/actions';

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
	document.title = projectName;

	const dispatch = useDispatch();
	const roles = useSelector((state) => state.AdminRoles.roles);
	const groups = useSelector((state) => state.AdminUser.groups);
	const { adminDetails, superAdminUser } = useSelector(
		(state) => state.PermissionDetails
	);
	const { isAddSuperUserLoading, adminDetails: AllAdminList } = useSelector(
		(state) => state.AllAdmins
	);
	const [customComponent, setCustomComponent] = useState();

	const {
		formattedAdminDetails,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
	} = useAdminListing();

	const handleStaffSubmit = (values) => {
		if (
			[undefined, null].includes(values.permission) ||
			Object.keys(values.permission).length < 1
		) {
			dispatch(
				showSnackbar({
					message: 'Please select at least one permission',
					type: 'error',
				})
			);
		} else {
			dispatch(
				addSuperAdminUserStart({
					data: {
						...values,
						password: Buffer.from(values.password).toString('base64'),
						adminId: values.adminId
							? Number(values.adminId)
							: adminDetails.adminUserId,
					},
				})
			);
		}
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Staff',
			initialValues: getInitialValues(),
			validationSchema,
			isEdit: false,
			onSubmitEntry: handleStaffSubmit,
			staticFormFields,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		if (!roles?.length) {
			dispatch(getRolesStart());
		}
		if (!groups?.length) {
			dispatch(getAllGroupsStart());
		}
	};

	useEffect(() => {
		if (roles?.length && groups?.length) {
			let customField = {};

			const roleOptions = roles
				.filter((r) => r.name !== 'Super Admin')
				.map((r) => ({
					id: r.adminRoleId,
					optionLabel: r.name,
					value: r.name,
				}));

			const groupOptions = groups
				.filter((r) => r)
				.map((g) => ({
					id: g,
					optionLabel: g,
					value: g,
				}));

			if (validation?.values?.role === 'Manager') {
				customField = {
					name: 'adminId',
					fieldType: 'select',
					label: 'Admin',
					placeholder: 'Select Admin',
					optionList: formattedAdminDetails,
				};
			}

			setFormFields([
				...staticFormFields,
				{
					name: 'group',
					fieldType: 'select',
					label: 'Group',
					placeholder: 'Select group',
					optionList: groupOptions,
				},
				{
					name: 'role',
					fieldType: 'select',
					label: 'Role',
					placeholder: 'Select Role',
					optionList: roleOptions,
				},
				customField,
			]);
		}
	}, [roles, groups, validation?.values?.role]);

	useEffect(() => {
		// if(validation?.values?.role === 'Admin' || (validation?.values?.role === 'Manager' && validation?.values?.adminId))
		setCustomComponent(
			<PermissionForm
				values={validation.values}
				adminDetails={adminDetails}
				superAdminUser={superAdminUser}
				permissionLabel={permissionLabel}
				validation={validation}
			/>
		);
	}, [
		validation?.values,
		adminDetails,
		superAdminUser,
		validation?.values?.role,
	]);

	useEffect(() => {
		setIsOpen(false);
	}, [AllAdminList?.count]);

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
					isAddOptions
					addOptionLabel="Create"
					handleAddClick={handleAddClick}
				/>
			</Container>
			<FormModal
				isOpen={isOpen}
				toggle={() => setIsOpen((prev) => !prev)}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Save"
				customColClasses="col-md-12"
				customComponent={customComponent}
				isSubmitLoading={isAddSuperUserLoading}
			/>
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
