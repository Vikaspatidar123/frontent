/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, UncontrolledTooltip } from 'reactstrap';

import { isEmpty } from 'lodash';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';

import {
	createCasinoSubCategoryStart,
	editCasinoSubCategoryStart,
	getCasinoCategoryDetailStart,
	getLanguagesStart,
	updateCasinoStatusStart,
	deleteCasinoSubCategoryStart,
} from '../../../store/actions';

import {
	GameSubCategoryId,
	Name,
	GameCategory,
	ImageUrl,
	Status,
} from '../CasinoSubCategory';

import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';

const useCreateSubCategory = () => {
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isGranted, permissions } = usePermission();
	const [langState, setLangState] = useState({ EN: '' });
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });

	const {
		casinoSubCategoryDetails,
		isCreateSubCategoryLoading,
		isEditSubCategorySuccess,
		isEditSubCategoryLoading,
	} = useSelector((state) => state.CasinoManagementData);
	const { casinoCategoryDetails, languageData } = useSelector(
		(state) => state.CasinoManagementData
	);

	const handleCreateSubCategory = (values) => {
		dispatch(
			createCasinoSubCategoryStart({
				data: values,
			})
		);
	};

	const handleEditSubCategory = (values) => {
		dispatch(
			editCasinoSubCategoryStart({
				data: {
					...values,
					subcategoryImage:
						typeof values.subcategoryImage === 'string'
							? ''
							: values.subcategoryImage,
					casinoSubCategoryId: isEdit.selectedRow.gameSubCategoryId,
				},
			})
		);
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
		header: 'Add Sub Category',
		initialValues: getInitialValues({ name: { EN: '' } }),
		validationSchema: validationSchema(langState),
		staticFormFields,
		onSubmitEntry: isEdit.open
			? handleEditSubCategory
			: handleCreateSubCategory,
	});

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, gameSubCategoryId } = props;
		dispatch(
			updateCasinoStatusStart({
				code: 'CASINO_SUB_CATEGORY',
				gameSubCategoryId,
				status: !status,
			})
		);
	};

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Sub Category');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Sub Category');
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	const onChangeLanguage = (e) => {
		validation.setValues((prev) => ({
			...prev,
			name: { ...prev.name, [e.target.value]: '' },
		}));
		setLangState((prev) => ({ ...prev, [e.target.value]: '' }));
	};

	const onRemoveLanguage = (e) => {
		validation.setValues((prev) => {
			const { name } = prev;
			const { [e]: key, ...rest } = name;
			return { ...prev, name: rest };
		});

		setLangState((prev) => {
			const { [e]: key, ...rest } = prev;
			return rest;
		});
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoSubCategoryDetails?.count]);

	useEffect(() => {
		if (isEditSubCategorySuccess) setIsOpen(false);
	}, [isEditSubCategorySuccess]);

	useEffect(() => {
		if (languageData?.rows?.length && casinoCategoryDetails?.rows?.length) {
			const langOptions = languageData.rows.map((r) => ({
				id: r.id,
				optionLabel: r.name,
				value: r.code,
			}));
			const categoryOptions = casinoCategoryDetails.rows.map((r) => ({
				id: r.gameCategoryId,
				optionLabel: r.name.EN,
				value: r.gameCategoryId,
			}));
			setFormFields([
				{
					name: 'language',
					fieldType: 'select',
					label: 'Language',
					placeholder: 'Select Language',
					optionList: langOptions,
					callBack: onChangeLanguage,
				},
				{
					name: 'name',
					label: 'SubCategory Name',
					fieldType: 'inputGroup',
					onDelete: onRemoveLanguage,
				},
				{
					name: 'gameCategoryId',
					label: 'Game Category',
					fieldType: 'select',
					optionList: categoryOptions,
					isDisabled: isEdit.open,
				},
				...staticFormFields,
			]);
		}
	}, [languageData, casinoCategoryDetails, isEdit]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCasinoCategoryDetailStart({ limit: '', pageNo: '', name: '' }));
	}, []);

	const handleAddGameClick = ({
		e,
		gameSubCategoryId,
		gameCategoryName,
		isGlobal,
	}) => {
		e.preventDefault();

		navigate(`addGames/${gameSubCategoryId}`, {
			state: { gameCategoryName, isGlobal },
		});
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.CasinoManagement,
			operation: 'C',
		},
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.CasinoManagement,
			operation: 'U',
		},
	]);

	const onClickDelete = (gameSubCategoryId) => {
		dispatch(
			deleteCasinoSubCategoryStart({
				gameSubCategoryId,
				limit: itemsPerPage,
				pageNo: page,
				search: '',
			})
		);
	};

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.subCategories) &&
			!isEdit.open &&
			isOpen
		) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.subCategories))
			);

			if (storedValues?.subcategoryImage?.thumbnail) {
				const base64Content = storedValues.subcategoryImage?.thumbnail;
				const blob = dataURLtoBlob(base64Content);

				storedValues.subcategoryImage = new File(
					[blob],
					storedValues.subcategoryImage.name,
					{
						type: blob.type,
					}
				);
			}

			validation.setValues(storedValues);
		}
	}, [isOpen]);

	const toggleFormModal = () => {
		if (!isEdit.open) {
			const hasFilledValues = Object.values(validation.values).some((value) =>
				value instanceof File
					? value.size > 0
					: !isEmpty(value) && !isEmpty(value?.EN)
			);
			hasFilledValues && setShowModal(!showModal);
		}
		setIsOpen((prev) => !prev);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'gameSubCategoryId',
				filterable: true,
				Cell: ({ cell }) => <GameSubCategoryId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'nameEN',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'GAME CATEGORY',
				accessor: 'gameCategory',
				filterable: true,
				Cell: ({ cell }) => <GameCategory value={cell.value} />,
			},
			{
				Header: 'IMAGE',
				accessor: 'imageUrl',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <ImageUrl value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					const status = cell?.row?.original?.isActive;
					const gameSubCategoryId = cell?.row?.original?.gameSubCategoryId;
					const gameCategoryName = cell?.row?.original?.nameEN;
					// const isGlobal = cell?.row?.original?.isGlobal;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{status ? (
									<Button
										hidden={!isGranted(modules.CasinoManagement, 'T')}
										className="btn btn-sm btn-soft-danger"
										onClick={(e) =>
											handleStatus(e, {
												status,
												gameSubCategoryId,
											})
										}
									>
										<i
											className="mdi mdi-close-thick"
											id={`active-${gameSubCategoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${gameSubCategoryId}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Button>
								) : (
									<Button
										hidden={!isGranted(modules.CasinoManagement, 'T')}
										className="btn btn-sm btn-soft-success"
										onClick={(e) =>
											handleStatus(e, {
												status,
												gameSubCategoryId,
											})
										}
									>
										<i
											className="mdi mdi-check-circle"
											id={`active-${gameSubCategoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${gameSubCategoryId}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Button>
								)}
							</li>

							<li>
								<Button
									type="button"
									hidden={!isGranted(modules.CasinoManagement, 'U')}
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										e.preventDefault();
										onClickEdit(cell?.row?.original);
									}}
								>
									<i
										className="mdi mdi-pencil-outline"
										id={`edit-${gameSubCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`edit-${gameSubCategoryId}`}
									>
										Edit
									</UncontrolledTooltip>
								</Button>
							</li>

							<li>
								<Button
									type="button"
									hidden={!isGranted(modules.CasinoManagement, 'D')}
									// disabled={isGlobal}
									className="btn btn-sm btn-soft-danger"
									onClick={(e) => {
										e.preventDefault();
										onClickDelete(gameSubCategoryId);
									}}
								>
									<i
										className="mdi mdi-delete-outline"
										id={`delete-${gameSubCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`delete-${gameSubCategoryId}`}
									>
										Delete
									</UncontrolledTooltip>
								</Button>
							</li>

							<li>
								<Button
									type="button"
									hidden={!isGranted(modules.CasinoManagement, 'T')}
									// disabled={isGlobal}
									className="btn btn-sm btn-soft-primary"
									onClick={(e) =>
										handleAddGameClick({
											e,
											gameSubCategoryId,
											gameCategoryName,
											// isGlobal,
										})
									}
								>
									<i
										className="mdi mdi-plus-one"
										id={`plus-one-${gameSubCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`plus-one-${gameSubCategoryId}`}
									>
										Add Games to this sub category
									</UncontrolledTooltip>
								</Button>
							</li>
						</ul>
					);
				},
			},
		],
		[permissions]
	);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		isCreateSubCategoryLoading,
		handleStatus,
		onClickEdit,
		isEditSubCategoryLoading,
		handleAddGameClick,
		columns,
		page,
		setPage,
		itemsPerPage,
		setItemsPerPage,
		toggleFormModal,
		showModal,
		setShowModal,
	};
};

export default useCreateSubCategory;
