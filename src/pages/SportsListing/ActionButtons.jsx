import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ row: { original }, handleStatus }) => {
	const { isGranted } = usePermission();
	const active = original?.isActive;
	const sportId = original?.sportId;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				{active ? (
					<Button
						hidden={!isGranted(modules.SportbookManagement, 'U')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								active,
								sportId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`active-${sportId}`} />
						<UncontrolledTooltip placement="top" target={`active-${sportId}`}>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.SportbookManagement, 'U')}
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								active,
								sportId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`active-${sportId}`} />
						<UncontrolledTooltip placement="top" target={`active-${sportId}`}>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleStatus: PropTypes.func.isRequired,
	row: PropTypes.shape({
		original: PropTypes.shape({
			isActive: PropTypes.bool,
			sportId: PropTypes.number,
		}),
	}).isRequired,
};

export default ActionButtons;
