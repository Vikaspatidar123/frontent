/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
// import PropTypes from 'prop-types';

import { isEqual } from 'lodash';
import { getInitialValues, validationSchema } from '../formDetails';
import {
	createNotificationStart,
	editNotificationStart,
	getLanguagesStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { Id, KeyValueCell, Status } from '../NotificationListCol';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';

const useCreateNotification = (page, perPage) => {
	const dispatch = useDispatch();
	const { isGranted, permissions } = usePermission();
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		isCreateNotificationLoading,
		isEditNotificationLoading,
		isCreateNotificationSuccess,
		isEditNotificationSuccess,
	} = useSelector((state) => state.Notification);
	const { languageData } = useSelector((state) => state.CasinoManagementData);

	const handleCreateNotification = (values) => {
		dispatch(
			createNotificationStart({
				data: {
					...values,
					language: '',
				},
				page,
				perPage,
			})
		);
	};

	const handleEditNotification = (values) => {
		dispatch(
			editNotificationStart({
				data: {
					...values,
					notificationId: isEdit.selectedRow.id,
				},
				page,
				perPage,
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, setHeader } = useForm({
		header: 'Add Notification',
		initialValues: getInitialValues(),
		validationSchema,
		onSubmitEntry: isEdit.open
			? handleEditNotification
			: handleCreateNotification,
	});

	useEffect(() => {
		if (isEditNotificationSuccess) setIsOpen(false);
	}, [isEditNotificationSuccess]);

	useEffect(() => {
		if (isCreateNotificationSuccess) setIsOpen(false);
	}, [isCreateNotificationSuccess]);

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Create Notification');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.Notification,
			operation: 'C',
		},
	]);

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Notification');
		validation.setValues(
			getInitialValues({
				...selectedRow,
			})
		);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!languageData?.languages) dispatch(getLanguagesStart());
	}, []);

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.notification) &&
			!isEdit.open &&
			isOpen
		) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.notification))
			);
			validation.setValues(values);
		}
	}, [isOpen]);

	const toggleFormModal = () => {
		if (!isEdit.open) {
			const isDataEqual = isEqual(validation.values, getInitialValues());
			if (!isDataEqual) {
				setShowModal(!showModal);
			}
		}
		setIsOpen((prev) => !prev);
	};

	const customComponent = (
		<div className="p-3">
			<CustomSelectField
				name="language"
				type="select"
				value={validation.values?.language}
				label="Select language"
				placeholder="Select notification language"
				key="my_unique_select_key__language"
				onChange={validation.handleChange}
				options={languageData?.languages?.map((language) => (
					<option value={language.code} key={language.id}>
						{language.name}
					</option>
				))}
			/>
			<CustomInputField
				label="Title"
				name={`title[${validation.values?.language}]`}
				onChange={(e) => {
					e.preventDefault();
					validation.setFieldValue('title', {
						...validation?.values?.title,
						[validation.values?.language]: e.target.value,
					});
				}}
				value={validation?.values?.title?.[validation.values?.language] || ''}
				onBlur={validation.handleBlur}
				placeholder="Title"
				invalid={!!validation?.errors?.title?.[validation.values?.language]}
				isError
				errorMsg={validation?.errors?.title?.[validation.values?.language]}
				// disabled={isView}
			/>

			<CustomInputField
				label="Description"
				name={`description[${validation.values?.language}]`}
				type="textarea"
				onChange={(e) => {
					e.preventDefault();
					validation.setFieldValue('description', {
						...validation?.values?.description,
						[validation.values?.language]: e.target.value,
					});
				}}
				value={
					validation?.values?.description?.[validation.values?.language] || ''
				}
				onBlur={validation.handleBlur}
				placeholder="Description"
				invalid={
					!!validation?.errors?.description?.[validation.values?.language]
				}
				isError
				errorMsg={
					validation?.errors?.description?.[validation.values?.language]
				}
			/>
		</div>
	);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				// filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Title',
				accessor: 'titleEN',
				// filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Description',
				accessor: 'descriptionEN',
				// filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ul className="list-unstyled hstack gap-1 mb-0">
						<li>
							<Button
								hidden={!isGranted(modules.applicationSetting, 'U')}
								type="button"
								className="btn btn-sm btn-soft-info"
								onClick={(e) => {
									e.preventDefault();
									onClickEdit(cell?.row?.original);
								}}
							>
								<i
									className="mdi mdi-pencil-outline"
									id={`edittooltip-${cell?.row?.original?.id}`}
								/>
								<UncontrolledTooltip
									placement="top"
									target={`edittooltip-${cell?.row?.original?.id}`}
								>
									Edit
								</UncontrolledTooltip>
							</Button>
						</li>
					</ul>
				),
			},
		],
		[permissions]
	);

	return {
		isOpen,
		header,
		validation,
		isCreateNotificationLoading,
		columns,
		isEditNotificationLoading,
		showModal,
		setShowModal,
		toggleFormModal,
		buttonList,
		customComponent,
		isEdit,
	};
};

export default useCreateNotification;
