/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ handleEdit, cell, handleStatus }) => {
	const active = cell?.row?.original?.isActive;
	const adminUserId = cell?.row?.original?.adminUserId;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Link
					to={`/staff/details/${adminUserId}`}
					className="btn btn-sm btn-soft-primary"
				>
					<i
						className="mdi mdi-eye-outline"
						id={`view-tooltip-${adminUserId}`}
					/>
				</Link>
			</li>
			<UncontrolledTooltip
				placement="top"
				target={`view-tooltip-${adminUserId}`}
			>
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
								adminUserId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`tooltip-${adminUserId}`} />
						<UncontrolledTooltip
							placement="top"
							target={`tooltip-${adminUserId}`}
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
								adminUserId,
							})
						}
					>
						<i
							className="mdi mdi-check-circle"
							id={`active-tooltip-${adminUserId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`active-tooltip-${adminUserId}`}
						>
							Set Active
						</UncontrolledTooltip>
					</Link>
				)}
			</li>

			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEdit(e, cell?.row?.original)}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edit-tooltip-${adminUserId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edit-tooltip-${adminUserId}`}
					>
						Edit
					</UncontrolledTooltip>
				</Link>
			</li>

			{/* <li>
				<Link to="/" className="btn btn-sm btn-soft-danger">
					<i className="mdi mdi-delete-outline" id="deletetooltip" />
					<UncontrolledTooltip placement="top" target="deletetooltip">
						Delete
					</UncontrolledTooltip>
				</Link>
			</li> */}
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	handleStatus: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
