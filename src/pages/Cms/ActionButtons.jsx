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
	handleDelete,
}) => {
	const { isGranted } = usePermission();
	const status = row?.original?.isActive;
	const id = row?.original?.id;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li id={`editTooltip-${id}`}>
				<Button
					hidden={!isGranted(modules.page, 'U')}
					type="button"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, id)}
				>
					<i className="mdi mdi-pencil-outline" />
					<UncontrolledTooltip placement="top" target={`editTooltip-${id}`}>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li id={`view-${id}`}>
				<Button
					hidden={!isGranted(modules.page, 'R')}
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, id)}
				>
					<i className="mdi mdi-eye-outline" />
					<UncontrolledTooltip placement="top" target={`view-${id}`}>
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li id={`activetooltip-${id}`}>
				{status ? (
					<Button
						hidden={!isGranted(modules.page, 'TS')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								id,
							})
						}
					>
						<i className="mdi mdi-close-thick" />
						<UncontrolledTooltip placement="top" target={`activetooltip-${id}`}>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.page, 'TS')}
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								status,
								id,
							})
						}
					>
						<i className="mdi mdi-check-circle" />
						<UncontrolledTooltip placement="top" target={`activetooltip-${id}`}>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>
			<li id={`deleteToolTip-${id}`}>
				<Button
					hidden={!isGranted(modules.page, 'D')}
					id="deleteToolTip"
					className="btn btn-sm btn-soft-danger"
					onClick={() => handleDelete(id)}
				>
					<i className="mdi mdi-delete-outline" />
					<UncontrolledTooltip placement="top" target={`deleteToolTip-${id}`}>
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEditClick: PropTypes.func.isRequired,
	handleViewClick: PropTypes.func.isRequired,
	handleStatus: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
