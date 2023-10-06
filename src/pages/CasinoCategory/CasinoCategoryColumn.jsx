/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from 'react';

import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
	Email,
	GameCategoryId,
	CreatedAt,
	UpdatedAt,
	IsActive,
} from './CasinoCategoryListCol';

const CasinoCategoryColumn = useMemo(
	() => [
		{
			Header: 'ID',
			accessor: 'gameCategoryId',
			filterable: true,
			Cell: (cellProps) => <GameCategoryId {...cellProps} />,
		},
		{
			Header: 'NAME',
			accessor: 'email',
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
			Cell: (cellProps) => <IsActive {...cellProps} />,
		},
		{
			Header: 'Action',
			accessor: 'action',
			disableFilters: true,
			Cell: () => (
				<ul className="list-unstyled hstack gap-1 mb-0">
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
	],
	[]
);

export default CasinoCategoryColumn;
