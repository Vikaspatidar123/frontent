/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
	Email,
	GameCategoryId,
	CreatedAt,
	UpdatedAt,
	Status,
} from './CasinoCategoryListCol';

const CasinoCategoryColumn = [
	{
		Header: 'ID',
		accessor: 'gameCategoryId',
		filterable: true,
		Cell: (cellProps) => <GameCategoryId {...cellProps} />,
	},
	{
		Header: 'NAME',
		accessor: 'name',
		filterable: true,
		Cell: (cellProps) => <Email {...cellProps} />,
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
		Cell: () => (
			<ul className="list-unstyled hstack gap-1 mb-0">
				<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
					<Link to="/" className="btn btn-sm btn-soft-primary">
						<i className="mdi mdi-eye-outline" id="viewtooltip" />
					</Link>
				</li>
				<UncontrolledTooltip placement="top" target="viewtooltip">
					View
				</UncontrolledTooltip>
				<li>
					<Link
						to="#"
						className="btn btn-sm btn-soft-info"
						onClick={() => {
							// const jobData = cellProps.row.original;
							// handleJobClick(jobData);
						}}
					>
						<i className="mdi mdi-pencil-outline" id="edittooltip" />
						<UncontrolledTooltip placement="top" target="edittooltip">
							Edit
						</UncontrolledTooltip>
					</Link>
				</li>

				<li>
					<Link
						to="#"
						className="btn btn-sm btn-soft-danger"
						onClick={() => {
							// const jobData = cellProps.row.original;
							// onClickDelete(jobData);
						}}
					>
						<i className="mdi mdi-delete-outline" id="deletetooltip" />
						<UncontrolledTooltip placement="top" target="deletetooltip">
							Delete
						</UncontrolledTooltip>
					</Link>
				</li>
			</ul>
		),
	},
];

export default CasinoCategoryColumn;
