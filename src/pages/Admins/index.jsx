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

import { projectName } from '../../constants/config';
import FormModal from '../../components/Common/FormModal';
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
import {
	addSuperAdminUserStart,
	updateSuperAdminUserStart,
} from '../../store/actions';
import { getPermissionsStart } from '../../store/auth/permissionDetails/actions';
import useForm from '../../components/Common/Hooks/useFormModal';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../store/progressLoading/actions';

// const columns =

const Admins = ({ t }) => {
	// meta title
	document.title = projectName;

	const dispatch = useDispatch();
	const roles = useSelector((state) => state.AdminRoles.roles);
	const groups = useSelector((state) => state.AdminUser.groups);
	const { adminDetails, superAdminUser, isAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);
	const { isAddSuperUserLoading, adminDetails: AllAdminList } = useSelector(
		(state) => state.AllAdmins
	);
	const [customComponent, setCustomComponent] = useState();
	const [isEdit, setIsEdit] = useState(false);

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
		} else if (isEdit) {
			dispatch(
				updateSuperAdminUserStart({
					data: {
						...values,
					},
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

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		setHeader,
	} = useForm({
		header: isEdit ? 'Add Staff' : 'Edit Staff',
		initialValues: getInitialValues(isEdit ? adminDetails : null, isEdit),
		validationSchema: validationSchema(isEdit),
		onSubmitEntry: handleStaffSubmit,
		staticFormFields: staticFormFields(isEdit),
	});

	const toggleModal = () => {
		setIsOpen((prev) => !prev);
		if (!roles?.length) {
			dispatch(getRolesStart());
		}
		if (!groups?.length) {
			dispatch(getAllGroupsStart());
		}
	};
	const handleEdit = (e, row) => {
		e.preventDefault();
		setHeader('Edit Staff');
		dispatch(showLinearProgress());
		setIsEdit(true);
		dispatch(getPermissionsStart(Number(row.adminUserId)));
		toggleModal();
	};

	const {
		formattedAdminDetails,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
	} = useAdminListing(handleEdit);

	const handleAddClick = (e) => {
		e.preventDefault();
		setHeader('Add Staff');
		setIsEdit(false);
		toggleModal();
	};

	const handleAdminSelect = (e) => {
		dispatch(getPermissionsStart(Number(e.target.value)));
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
					callBack: handleAdminSelect,
					isDisabled: isEdit,
				};
			}

			setFormFields([
				...staticFormFields(isEdit),
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
					isDisabled: isEdit,
				},
				customField,
			]);
		}
	}, [roles, groups, validation?.values?.role, isEdit]);

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
		if (isEdit && adminDetails && !isAdminLoading) {
			setIsOpen(true);
			dispatch(resetLinearProgress());
		}
	}, [adminDetails, isAdminLoading]);

	useEffect(() => {
		setIsOpen(false);
		setIsEdit(false);
	}, [AllAdminList?.count]);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboard')} breadcrumbItem={t('Staff')} />
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
