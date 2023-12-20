import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { isEmpty } from 'lodash';
import {
	leftStaticFormFields,
	rightStaticFormFields,
	getInitialValues,
	validationSchema,
} from '../formDetails';
import PermissionForm from '../permissionForm';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../../store/progressLoading/actions';
import { getPermissionsStart } from '../../../store/auth/permissionDetails/actions';
import {
	addSuperAdminUserStart,
	getAdminDetails,
	updateSuperAdminUserStart,
} from '../../../store/actions';
import useAdminListing from './useAdminListing';
import { showToastr } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { getRolesStart } from '../../../store/auth/roles/actions';

const useActions = (isEditPage, filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roles = useSelector((state) => state.AdminRoles.roles);
	const groups = useSelector((state) => state.AdminUser.groups);
	const { adminDetails, superAdminUser, isAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);
	const {
		isAddSuperUserLoading,
		isUpdateSuperUserLoading,
		adminDetails: allAdminList,
	} = useSelector((state) => state.AllAdmins);
	const [customComponent, setCustomComponent] = useState();
	const [isEdit, setIsEdit] = useState(isEditPage || false);
	const [showModal, setShowModal] = useState(false);

	const handleStaffSubmit = (values) => {
		if (
			[undefined, null].includes(values.permission) ||
			Object.keys(values.permission).length < 1
		) {
			dispatch(
				showToastr({
					message: 'Please select at least one permission',
					type: 'error',
				})
			);
		} else if (isEdit) {
			dispatch(
				updateSuperAdminUserStart({
					data: {
						...values,
						adminUserId: Number(adminDetails?.id),
					},
					navigate,
				})
			);
		} else {
			dispatch(
				addSuperAdminUserStart({
					data: {
						...values,
						password: Buffer.from(values.password).toString('base64'),
						adminId: values.adminId ? Number(values.adminId) : adminDetails.id,
						superAdminId: Number(adminDetails?.id),
					},
					navigate,
				})
			);
		}
	};

	const handleAdminSelect = (e) => {
		dispatch(getPermissionsStart(Number(e.target.value)));
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		leftFormFields,
		setLeftFormFields,
		rightFormFields,
		setRightFormFields,
		setHeader,
	} = useForm({
		header: isEdit ? 'Add Staff' : 'Edit Staff',
		initialValues: getInitialValues(isEdit ? adminDetails : null, isEdit),
		validationSchema: validationSchema(isEdit),
		onSubmitEntry: handleStaffSubmit,
		leftStaticFormFields: leftStaticFormFields(isEdit),
		rightStaticFormFields: rightStaticFormFields(isEdit),
	});

	const handleEdit = (e, row) => {
		e.preventDefault();
		setIsEdit(true);
		navigate(`edit/${row.id}`);
		// setHeader('Edit Staff');
		dispatch(showLinearProgress());
	};

	const {
		formattedAdminDetails,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		onChangeRowsPerPage,
	} = useAdminListing(handleEdit, filterValues);

	const handleAddClick = (e) => {
		e.preventDefault();
		setHeader('Add Staff');
		navigate('add');
		setIsEdit(false);
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.Admins,
			operation: 'C',
		},
	]);

	const setCustomFields = () => {
		if (
			roles?.length &&
			// groups?.length &&
			allAdminList.rows?.length
		) {
			let customField = {};

			const roleOptions = roles
				.filter((r) => r.name !== 'Super Admin')
				.map((r) => ({
					id: r.adminRoleId,
					optionLabel: r.name,
					value: r.name,
				}));

			// const groupOptions = groups
			//   .filter((r) => r)
			//   .map((g) => ({
			//     id: g,
			//     label: g,
			//     value: g,
			//   }));

			const adminOptions = allAdminList?.rows?.map((ad) => ({
				optionLabel: `${ad.firstName} ${ad.lastName}`,
				value: ad.id,
			}));

			if (validation?.values?.role === 'Manager') {
				customField = {
					name: 'adminId',
					fieldType: 'select',
					label: 'Admin',
					placeholder: 'Select Admin',
					optionList: adminOptions,
					callBack: handleAdminSelect,
					isDisabled: isEdit,
				};
			}

			setRightFormFields([
				...rightStaticFormFields(isEdit),
				// {
				//   name: 'group',
				//   fieldType: 'creatableSingleSelect',
				//   label: 'Group',
				//   optionList: groupOptions,
				//   callBack: (option) => {
				//     validation.setFieldValue('group', option.value);
				//   },
				// },
				isEdit ? {} : customField,
			]);

			setLeftFormFields([
				...leftStaticFormFields(isEdit),
				{
					name: 'role',
					fieldType: 'select',
					label: 'Role',
					placeholder: 'Select Role',
					optionList: roleOptions,
					isDisabled: isEdit,
				},
				isEdit ? customField : {},
			]);
		}
	};

	useEffect(() => {
		if (isEmpty(roles)) {
			dispatch(getRolesStart());
		}
		if (isEmpty(groups)) {
			// dispatch(getAllGroupsStart());
		}
		if (isEmpty(allAdminList)) {
			dispatch(
				getAdminDetails({
					limit: itemsPerPage,
					pageNo: page,
					orderBy: 'id',
					sort: 'desc',
				})
			);
		}
		if (
			!isEmpty(roles) &&
			// !isEmpty(groups) &&
			!isEmpty(allAdminList)
		)
			setCustomFields();
	}, [
		roles,
		// groups,
		validation?.values?.role,
		isEdit,
		allAdminList,
		// validation?.values?.group,
	]);

	useEffect(() => {
		// if(validation?.values?.role === 'Admin' || (validation?.values?.role === 'Manager' && validation?.values?.adminId))
		setCustomComponent(
			<PermissionForm
				values={validation.values}
				adminDetails={adminDetails}
				superAdminUser={superAdminUser}
				validation={validation}
				isEdit={isEdit}
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
			dispatch(resetLinearProgress());
		}
	}, [adminDetails, isAdminLoading]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.staff)) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.staff))
			);
			validation.setValues(values);
		}
	}, []);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		customComponent,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		formattedAdminDetails,
		buttonList,
		leftFormFields,
		rightFormFields,
		isAddSuperUserLoading,
		isUpdateSuperUserLoading,
		isAdminLoading,
		adminDetails,
		onChangeRowsPerPage,
		showModal,
		setShowModal,
		navigate,
	};
};

export default useActions;
