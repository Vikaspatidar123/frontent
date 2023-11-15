import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	cell,
	handleEditClick,
	handleViewClick,
	handleDeleteClick,
}) => {
	const { isGranted } = usePermission();
	const emailTemplateId = cell?.row?.original?.emailTemplateId;
	const type = cell?.row?.original?.type;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Button
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, emailTemplateId)}
				>
					<i className="mdi mdi-eye-outline" id="viewtooltip" />
					<UncontrolledTooltip placement="top" target="viewtooltip">
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.EmailTemplate, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, emailTemplateId)}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.EmailTemplate, 'D')}
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => handleDeleteClick(e, emailTemplateId, type)}
				>
					<i className="mdi mdi-delete-outline" id="deletetooltip" />
					<UncontrolledTooltip placement="top" target="deletetooltip">
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	cell: PropTypes.objectOf.isRequired,
	handleEditClick: PropTypes.func.isRequired,
	handleViewClick: PropTypes.func.isRequired,
	handleDeleteClick: PropTypes.func.isRequired,
};

export default ActionButtons;
