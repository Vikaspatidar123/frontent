/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ cell, handleStatus }) => {
	const { isGranted } = usePermission();
	const active = cell?.row?.original?.isActive;
	const countryId = cell?.row?.original?.countryId;

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
								countryId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`active-${countryId}`} />
						<UncontrolledTooltip placement="top" target={`active-${countryId}`}>
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
								countryId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`active-${countryId}`} />
						<UncontrolledTooltip placement="top" target={`active-${countryId}`}>
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
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
