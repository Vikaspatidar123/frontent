/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { Button, UncontrolledTooltip } from 'reactstrap';
import {
	GameCategoryId,
	Status,
	Name,
	ThumbnailUrl,
} from '../CasinoCategoryListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
import { selectedLanguage } from '../../../constants/config';

const useCasinoCategoryColumn = ({
	handleStatus,
	onClickEdit,
	handleAddGameClick,
	onClickDelete,
}) => {
	const { isGranted, permissions } = usePermission();
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <GameCategoryId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'nameEN',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'ICON',
				accessor: 'iconUrl',
				disableSortBy: true,
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			// {
			// 	Header: 'UPDATED AT',
			// 	accessor: 'updatedAt',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
			// },
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
					const categoryId = cell?.row?.original?.id;
					const categoryName = cell?.row?.original?.name[selectedLanguage];
					const isDefault = cell?.row?.original?.isDefault;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{status ? (
									<Button
										hidden={!isGranted(modules.casinoManagement, 'TS')}
										className="btn btn-sm btn-soft-danger"
										disabled={isDefault}
										onClick={(e) =>
											handleStatus(e, {
												status,
												categoryId,
											})
										}
									>
										<i
											className="mdi mdi-close-thick"
											id={`active-${categoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${categoryId}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Button>
								) : (
									<Button
										hidden={!isGranted(modules.casinoManagement, 'TS')}
										className="btn btn-sm btn-soft-success"
										disabled={isDefault}
										onClick={(e) =>
											handleStatus(e, {
												status,
												categoryId,
											})
										}
									>
										<i
											className="mdi mdi-check-circle"
											id={`active-${categoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${categoryId}`}
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
										id={`edit-${categoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`edit-${categoryId}`}
									>
										Edit
									</UncontrolledTooltip>
								</Button>
							</li>

							<li>
								<Button
									type="button"
									hidden={!isGranted(modules.casinoManagement, 'D')}
									disabled={isDefault}
									className="btn btn-sm btn-soft-danger"
									onClick={(e) => {
										e.preventDefault();
										onClickDelete(categoryId);
									}}
								>
									<i
										className="mdi mdi-delete-outline"
										id={`delete-${categoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`delete-${categoryId}`}
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
											categoryId,
											categoryName,
										})
									}
								>
									<i
										className="mdi mdi-plus-one"
										id={`plus-one-${categoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`plus-one-${categoryId}`}
									>
										Add Games to category
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
	return columns;
};

export default useCasinoCategoryColumn;
