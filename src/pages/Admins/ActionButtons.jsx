import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ handleEdit, row, handleStatus }) => {
	const active = row?.original?.isActive;
	const adminUserId = row?.original?.id;
	const { isGranted } = usePermission();

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{isGranted(modules.admin, 'R') && (
				<li data-bs-toggle="tooltip" data-bs-placement="top">
					<Link
						to={`/staff/details/${adminUserId}`}
						className="btn btn-sm btn-soft-primary"
					>
						<i
							className="mdi mdi-eye-outline"
							id={`view-tooltip-${adminUserId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`view-tooltip-${adminUserId}`}
						>
							View Details
						</UncontrolledTooltip>
					</Link>
				</li>
			)}
			{isGranted(modules.admin, 'TS') && (
				<li>
					{active ? (
						<Link
							to="#!"
							className="btn btn-sm btn-soft-danger"
							onClick={(e) =>
								handleStatus(e, {
									active,
									adminUserId,
								})
							}
						>
							<i
								className="mdi mdi-close-thick"
								id={`active-tooltip-${adminUserId}`}
							/>
							<UncontrolledTooltip
								placement="top"
								target={`active-tooltip-${adminUserId}`}
							>
								Set Inactive
							</UncontrolledTooltip>
						</Link>
					) : (
						<Link
							to="#!"
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
			)}

			{isGranted(modules.admin, 'U') && (
				<li>
					<Link
						to="#!"
						className="btn btn-sm btn-soft-info"
						onClick={(e) => handleEdit(e, row?.original)}
					>
						<i
							className="mdi mdi-pencil-outline"
							id={`edit-tooltip-${adminUserId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`edit-tooltip-${adminUserId}`}
						>
							Edit Details
						</UncontrolledTooltip>
					</Link>
				</li>
			)}

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
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
