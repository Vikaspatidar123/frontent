import React from 'react';
import { UncontrolledTooltip, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ handleEdit, row, handleStatus, handleView }) => {
	const active = row?.original?.isActive;
	const adminUserId = row?.original?.id;
	const isSuperAdmin = row?.original?.adminRole?.level === 1;
	const { isGranted } = usePermission();

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{isGranted(modules.admin, 'R') && (
				<li data-bs-toggle="tooltip" data-bs-placement="top">
					<Button
						// disabled={isSuperAdmin}
						className="btn btn-sm btn-soft-primary"
						onClick={(e) => handleView(e, row?.original)}
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
					</Button>
				</li>
			)}
			{isGranted(modules.admin, 'TS') && (
				<li>
					{active ? (
						<Button
							disabled={isSuperAdmin}
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
						</Button>
					) : (
						<Button
							disabled={isSuperAdmin}
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
						</Button>
					)}
				</li>
			)}

			{isGranted(modules.admin, 'U') && (
				<li>
					<Button
						disabled={isSuperAdmin}
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
					</Button>
				</li>
			)}
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	handleStatus: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
	handleView: PropTypes.func.isRequired,
};

export default ActionButtons;
