/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	row,
	handleStatus,
	handleEditClick,
	handleViewClick,
}) => {
	const { isGranted } = usePermission();
	const status = row?.original?.isActive;
	const id = row?.original?.id;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.CMS, 'U')}
					type="button"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, id)}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Button
					hidden={!isGranted(modules.CMS, 'R')}
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, id)}
				>
					<i className="mdi mdi-eye-outline" id="viewtooltip" />
					<UncontrolledTooltip placement="top" target="viewtooltip">
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				{status ? (
					<Button
						hidden={!isGranted(modules.CMS, 'T')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								status,
								id,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`activetooltip-${id}`} />
						<UncontrolledTooltip placement="top" target={`activetooltip-${id}`}>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.CMS, 'T')}
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								status,
								id,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`activetooltip-${id}`} />
						<UncontrolledTooltip placement="top" target={`activetooltip-${id}`}>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEditClick: PropTypes.func.isRequired,
	handleViewClick: PropTypes.func.isRequired,
	handleStatus: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
