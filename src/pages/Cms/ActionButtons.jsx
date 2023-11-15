/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	cell,
	handleStatus,
	handleEditClick,
	handleViewClick,
}) => {
	const { isGranted } = usePermission();
	const status = cell?.row?.original?.isActive;
	const cmsPageId = cell?.row?.original?.cmsPageId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.CMS, 'U')}
					type="button"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, cmsPageId)}
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
					onClick={(e) => handleViewClick(e, cmsPageId)}
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
								cmsPageId,
							})
						}
					>
						<i
							className="mdi mdi-close-thick"
							id={`activetooltip-${cmsPageId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`activetooltip-${cmsPageId}`}
						>
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
								cmsPageId,
							})
						}
					>
						<i
							className="mdi mdi-check-circle"
							id={`activetooltip-${cmsPageId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`activetooltip-${cmsPageId}`}
						>
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
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
