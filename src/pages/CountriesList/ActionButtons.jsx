/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ row, handleStatus, handleEditClick }) => {
	const active = row?.original?.status;
	const countryId = row?.original?.countryId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{/* <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Link to="#'" className="btn btn-sm btn-soft-primary">
					<i className="mdi mdi-eye-outline" id={`viewtooltip-${countryId}`} />
				</Link>
			</li>
			<UncontrolledTooltip placement="top" target={`viewtooltip-${countryId}`}>
				View
			</UncontrolledTooltip> */}

			<li>
				{active ? (
					<Link
						to="#"
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								status: active,
								countryId,
							})
						}
					>
						<i
							className="mdi mdi-close-thick"
							id={`inactive-tooltip-${countryId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`inactive-tooltip-${countryId}`}
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
								status: active,
								countryId,
							})
						}
					>
						<i
							className="mdi mdi-check-circle"
							id={`active-tooltip-${countryId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`active-tooltip-${countryId}`}
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
					onClick={(e) => {
						e.preventDefault();
						handleEditClick(row?.original);
					}}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edit-tooltip-${countryId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edit-tooltip-${countryId}`}
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
	handleStatus: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
	handleEditClick: PropTypes.func.isRequired,
};

export default ActionButtons;
