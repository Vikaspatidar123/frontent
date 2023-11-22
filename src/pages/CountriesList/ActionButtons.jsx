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
	handleBlockedCountriesClick,
}) => {
	const { isGranted } = usePermission();
	const active = row?.original?.status;
	const countryId = row?.original?.countryId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Button
					className="btn btn-sm btn-soft-primary"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						handleBlockedCountriesClick(countryId);
					}}
				>
					<i className="mdi mdi-cancel" id={`viewtooltip-${countryId}`} />
					<UncontrolledTooltip
						placement="top"
						target={`viewtooltip-${countryId}`}
					>
						View Blocked Games
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				{active ? (
					<Button
						hidden={!isGranted(modules.CasinoManagement, 'T')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								status: active,
								countryId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`tooltip-${countryId}`} />
						<UncontrolledTooltip
							placement="top"
							target={`tooltip-${countryId}`}
						>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.CasinoManagement, 'T')}
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								status: active,
								countryId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`tooltip-${countryId}`} />
						<UncontrolledTooltip
							placement="top"
							target={`tooltip-${countryId}`}
						>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>

			<li>
				<Button
					className="btn btn-sm btn-soft-info"
					onClick={(e) => {
						e.preventDefault();
						handleEditClick(row?.original);
					}}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edit-tooltip-${countryId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edit-tooltip-${countryId}`}
					>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			{/* <li>
				<Link to="/" className="btn btn-sm btn-soft-danger">
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
	handleStatus: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
	handleEditClick: PropTypes.func.isRequired,
	handleBlockedCountriesClick: PropTypes.func.isRequired,
};

export default ActionButtons;
