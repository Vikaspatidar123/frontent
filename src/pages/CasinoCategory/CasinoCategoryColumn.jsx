/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
	GameCategoryId,
	CreatedAt,
	UpdatedAt,
	Status,
	Name,
} from './CasinoCategoryListCol';

const useCasinoCategoryColumn = ({ handleStatus, onClickEdit }) => {
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'gameCategoryId',
				filterable: true,
				Cell: (cellProps) => <GameCategoryId {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'nameEN',
				filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'CREATED AT',
				accessor: 'createdAt',
				filterable: true,
				Cell: (cellProps) => <CreatedAt {...cellProps} />,
			},
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				filterable: true,
				Cell: (cellProps) => <UpdatedAt {...cellProps} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => {
					const active = cell?.row?.original?.isActive;
					const gameCategoryId = cell?.row?.original?.gameCategoryId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
								<Link to="#'" className="btn btn-sm btn-soft-primary">
									<i className="mdi mdi-eye-outline" id="viewtooltip" />
								</Link>
							</li>
							<UncontrolledTooltip placement="top" target="viewtooltip">
								View
							</UncontrolledTooltip>

							<li>
								{active ? (
									<Link
										to="#"
										className="btn btn-sm btn-soft-danger"
										onClick={(e) =>
											handleStatus(e, {
												active,
												gameCategoryId,
											})
										}
									>
										<i className="mdi mdi-close-thick" id="inactivetooltip" />
										<UncontrolledTooltip
											placement="top"
											target="inactivetooltip"
										>
											Set Inactive
										</UncontrolledTooltip>
									</Link>
								) : (
									<Link
										to="#"
										className="btn btn-sm btn-soft-success"
										onClick={(e) =>
											handleStatus(e, {
												active,
												gameCategoryId,
											})
										}
									>
										<i className="mdi mdi-check-circle" id="activetooltip" />
										<UncontrolledTooltip placement="top" target="activetooltip">
											Set Active
										</UncontrolledTooltip>
									</Link>
								)}
							</li>

							<li>
								<Link
									to="#"
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										e.preventDefault();
										onClickEdit(cell?.row?.original);
									}}
								>
									<i className="mdi mdi-pencil-outline" id="edittooltip" />
									<UncontrolledTooltip placement="top" target="edittooltip">
										Edit
									</UncontrolledTooltip>
								</Link>
							</li>

							<li>
								<Link to="/" className="btn btn-sm btn-soft-danger">
									<i className="mdi mdi-delete-outline" id="deletetooltip" />
									<UncontrolledTooltip placement="top" target="deletetooltip">
										Delete
									</UncontrolledTooltip>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);
	return columns;
};

export default useCasinoCategoryColumn;
