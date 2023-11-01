/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({
	cell,
	handleStatus,
	handleEditClick,
	handleViewClick,
}) => {
	const status = cell?.row?.original?.isActive;
	const cmsPageId = cell?.row?.original?.cmsPageId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Link
					to="#"
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, cmsPageId)}
				>
					<i className="mdi mdi-eye-outline" id="viewtooltip" />
					<UncontrolledTooltip placement="top" target="viewtooltip">
						View
					</UncontrolledTooltip>
				</Link>
			</li>

			<li>
				{status ? (
					<Link
						to="#"
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								status,
								cmsPageId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id="inactivetooltip" />
						<UncontrolledTooltip placement="top" target="inactivetooltip">
							Set Inactive
						</UncontrolledTooltip>
					</Link>
				) : (
					<Link
						to="#"
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								status,
								cmsPageId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id="activetooltip" />
						<UncontrolledTooltip placement="top" target="activetooltip">
							Set Active
						</UncontrolledTooltip>
					</Link>
				)}
			</li>

			<li>
				<Link
					to="#"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, cmsPageId)}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Link>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEditClick: PropTypes.func.isRequired,
	handleViewClick: PropTypes.func.isRequired,
	handleStatus: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
