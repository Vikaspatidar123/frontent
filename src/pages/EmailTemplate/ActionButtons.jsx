import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ActionButtons = ({
	cell,
	handleEditClick,
	handleViewClick,
	handleDeleteClick,
}) => {
	const emailTemplateId = cell?.row?.original?.emailTemplateId;
	const type = cell?.row?.original?.type;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Link
					to="#"
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, emailTemplateId)}
				>
					<i className="mdi mdi-eye-outline" id="viewtooltip" />
					<UncontrolledTooltip placement="top" target="viewtooltip">
						View
					</UncontrolledTooltip>
				</Link>
			</li>

			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, emailTemplateId)}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Link>
			</li>

			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => handleDeleteClick(e, emailTemplateId, type)}
				>
					<i className="mdi mdi-delete-outline" id="deletetooltip" />
					<UncontrolledTooltip placement="top" target="deletetooltip">
						Delete
					</UncontrolledTooltip>
				</Link>
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
