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

const useCasinoCategoryColumn = ({ handleStatus, onClickEdit }) => {
	const { isGranted, permissions } = usePermission();
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
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
					const active = cell?.row?.original?.isActive;
					const gameCategoryId = cell?.row?.original?.gameCategoryId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{active ? (
									<Button
										hidden={!isGranted(modules.casinoManagement, 'TS')}
										className="btn btn-sm btn-soft-danger"
										onClick={(e) =>
											handleStatus(e, {
												active,
												gameCategoryId,
											})
										}
									>
										<i
											className="mdi mdi-close-thick"
											id={`active-${gameCategoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${gameCategoryId}`}
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
												active,
												gameCategoryId,
											})
										}
									>
										<i
											className="mdi mdi-check-circle"
											id={`active-${gameCategoryId}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`active-${gameCategoryId}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Button>
								)}
							</li>

							<li>
								<Button
									hidden={!isGranted(modules.casinoManagement, 'U')}
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										e.preventDefault();
										onClickEdit(cell?.row?.original);
									}}
								>
									<i
										className="mdi mdi-pencil-outline"
										id={`edit-${gameCategoryId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`edit-${gameCategoryId}`}
									>
										Edit
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
