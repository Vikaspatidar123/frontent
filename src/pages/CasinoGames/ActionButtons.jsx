/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const ActionButtons = ({ cell, handleStatus }) => {
	const active = cell?.row?.original?.isActive;
	const casinoGameId = cell?.row?.original?.casinoGameId;
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
								casinoGameId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id="inactivetooltip" />
						<UncontrolledTooltip placement="top" target="inactivetooltip">
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
								casinoGameId,
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
					// onClick={(e) => handleEdit(e, cell?.row?.original)}
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
};

export default ActionButtons;
