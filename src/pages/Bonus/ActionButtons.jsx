import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ row: { original }, handleStatus }) => {
	const { isGranted } = usePermission();
	const active = original?.isActive;
	const bonusId = original?.bonusId;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{/* <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Link to="#" className="btn btn-sm btn-soft-primary">
					<i className="mdi mdi-eye-outline" id={`view-${bonusId}`} />
				</Link>
			</li>
			<UncontrolledTooltip placement="top" target={`view-${bonusId}`}>
				View
			</UncontrolledTooltip> */}

			<li>
				{active ? (
					<Button
						hidden={!isGranted(modules.Bonus, 'T')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								active,
								bonusId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`active-${bonusId}`} />
						<UncontrolledTooltip placement="top" target={`active-${bonusId}`}>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.Bonus, 'T')}
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								active,
								bonusId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`active-${bonusId}`} />
						<UncontrolledTooltip placement="top" target={`active-${bonusId}`}>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>
			{/*
			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-info"
					// onClick={(e) => handleEdit(e, original)}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Link>
			</li>

			<li>
				<Link to="#" className="btn btn-sm btn-soft-danger">
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
	row: PropTypes.shape({
		original: PropTypes.shape({
			bonusId: PropTypes.number.isRequired,
			isActive: PropTypes.bool.isRequired,
		}).isRequired,
	}).isRequired,
	handleStatus: PropTypes.func.isRequired,
};

export default ActionButtons;
