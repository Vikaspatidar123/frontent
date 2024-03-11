/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	deleteCasinoSubCategoryStart,
	getCasinoSubCategoryDetailStart,
	resetCasinoSubCategoryData,
	updateCasinoStatusStart,
} from '../../../store/actions';

import usePermission from '../../../components/Common/Hooks/usePermission';
import {
	GameSubCategoryId,
	Name,
	GameCategory,
	ImageUrl,
	Status,
} from '../CasinoSubCategory';
import { modules } from '../../../constants/permissions';

const useSubCategoryListing = (
	filterValidation,
	isFilterChanged,
	onClickEdit
) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { isGranted, permissions } = usePermission();

	const {
		casinoSubCategoryDetails,
		casinoCategoryDetails,
		iscasinoSubCategoryDetailsLoading,
		isCreateSubCategorySuccess,
		isEditSubCategorySuccess,
		isDeleteCasinoSubCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const fetchData = () => {
		dispatch(
			getCasinoSubCategoryDetailStart({
				perPage: itemsPerPage,
				page,
				...filterValidation.values,
			})
		);
	};

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const onClickDelete = (gameSubCategoryId) => {
		dispatch(
			deleteCasinoSubCategoryStart({
				gameSubCategoryId,
				perPage: itemsPerPage,
				page,
				search: '',
			})
		);
	};

	useEffect(() => {
		if (
			isCreateSubCategorySuccess ||
			isEditSubCategorySuccess ||
			isDeleteCasinoSubCategorySuccess
		)
			fetchData();
	}, [
		isCreateSubCategorySuccess,
		isEditSubCategorySuccess,
		isDeleteCasinoSubCategorySuccess,
	]);

	const formattedgetCasinoSubCategoryDetails = useMemo(() => {
		if (casinoSubCategoryDetails && casinoCategoryDetails?.categories) {
			return casinoSubCategoryDetails?.subCategories.map((category) => ({
				...category,
				nameEN: category?.name?.EN,
				gameCategory: casinoCategoryDetails?.categories.find(
					(item) => item.gameCategoryId === category?.gameCategoryId
				)?.name?.EN,
				subcategoryImage: category?.imageUrl,
			}));
		}
		return [];
	}, [casinoSubCategoryDetails, casinoCategoryDetails]);

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, isFilterChanged]);

	// resetting sub categories list redux state
	useEffect(() => () => dispatch(resetCasinoSubCategoryData()), []);

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

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <GameSubCategoryId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
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
				Header: 'ICON',
				accessor: 'iconUrl',
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
										hidden={!isGranted(modules.casinoManagement, 'TS')}
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
										hidden={!isGranted(modules.casinoManagement, 'TS')}
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
									hidden={!isGranted(modules.casinoManagement, 'U')}
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
									hidden={!isGranted(modules.casinoManagement, 'D')}
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
									hidden={!isGranted(modules.casinoManagement, 'TS')}
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
		columns,
		formattedgetCasinoSubCategoryDetails,
		itemsPerPage,
		casinoSubCategoryDetails,
		setPage,
		iscasinoSubCategoryDetailsLoading,
		page,
		onChangeRowsPerPage,
	};
};

export default useSubCategoryListing;
