/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
import { IsActive, Segment } from '../SegmentColList';
import {
	staticFormFields,
	getSegmentInitialValues,
	SegmentSchema,
} from '../formDetails';
import {
	createTag,
	deleteTag,
	getAllTags,
	updateTag,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import usePermission from '../../../components/Common/Hooks/usePermission';
import Actions from '../../../components/Common/Actions';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import { useConfirmModal } from '../../../components/Common/ConfirmModal';

const useSegmentation = () => {
	const dispatch = useDispatch();
	const { openConfirmModal } = useConfirmModal();
	const { isGranted, permissions } = usePermission();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const { userTags, userTagsLoading } = useSelector(
		(state) => state.UserDetails
	);

	const handleSegments = (values, reset) => {
		if (isEdit?.open) {
			reset();
			dispatch(
				updateTag(
					{
						name: values?.tag,
						isActive: values?.isActive,
						tagId: isEdit?.selectedRow?.id,
					},
					// eslint-disable-next-line no-use-before-define
					onSuccess
				)
			);
		} else {
			dispatch(
				createTag(
					{
						tag: values?.tag,
						isActive: values?.isActive,
					},
					// eslint-disable-next-line no-use-before-define
					onSuccess
				)
			);
		}
	};

	const handleDelete = (id) => {
		dispatch(
			deleteTag({
				tagId: parseInt(id, 10),
			})
		);
	};

	const handleDeleteClick = (row) => {
		openConfirmModal('Do you really want to delete the Segment?', () =>
			handleDelete(row?.id)
		);
	};

	const { isOpen, setIsOpen, validation, setHeader, header, formFields } =
		useForm({
			header: '',
			initialValues: getSegmentInitialValues(),
			validationSchema: SegmentSchema,
			onSubmitEntry: handleSegments,
			staticFormFields: staticFormFields(),
		});

	const onSuccess = () => {
		setIsOpen((prev) => !prev);
		validation.resetForm();
	};

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		setHeader('Create Segment');
		setIsEdit({ open: false, selectedRow: '' });
		validation.setValues(getSegmentInitialValues());
	};

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

	const buttonList = useMemo(() => [
		{
			label: 'Create Segment',
			handleClick: handleAddClick,
			link: '#/',
			module: modules.tag,
			operation: 'C',
		},
	]);

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(
			getAllTags({
				perPage: itemsPerPage,
				page: currentPage,
			})
		);
	}, []);

	const formattedSegments = useMemo(
		() =>
			userTags?.tags?.map((data) => ({
				id: data?.id,
				tag: data?.tag,
				isActive: data?.isActive,
			})) || [],
		[userTags]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const toggleFormModal = () => {
		setIsOpen((prev) => !prev);
	};

	const onClickEdit = (selectedRow) => {
		validation.setValues(getSegmentInitialValues(selectedRow));
		setIsEdit({ open: true, selectedRow });
		setHeader(`Update ${selectedRow.tag} Segment`);
		setIsOpen((prev) => !prev);
	};

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: onClickEdit,
			isHidden: !isGranted(modules.banner, 'U'),
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
		},
		{
			actionName: 'Delete',
			actionHandler: handleDeleteClick,
			isHidden: !isGranted(modules.tag, 'D'),
			icon: ICON_CLASS.delete,
			iconColor: TEXT_COLORS.danger,
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'Id',
			// 	accessor: 'id',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			// },

			{
				Header: 'Segment Name',
				accessor: 'tag',
				filterable: true,
				Cell: ({ cell }) => <Segment cell={cell} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				filterable: true,
				Cell: ({ cell }) => <IsActive value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[userTags, permissions]
	);

	return {
		columns,
		buttonList,
		formattedSegments,
		itemsPerPage,
		setCurrentPage,
		currentPage,
		onChangeRowsPerPage,
		isOpen,
		toggleFormModal,
		header,
		validation,
		formFields,
		userTagsLoading,
		handleDelete,
	};
};

export default useSegmentation;
