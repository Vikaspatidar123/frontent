/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ row, handleStatus, handleEditClick }) => {
	const { isGranted } = usePermission();
	const active = row?.original?.status;
	const countryId = row?.original?.id;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				{active ? (
					<Button
						hidden={!isGranted(modules.CasinoManagement, 'TS')}
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
						hidden={!isGranted(modules.CasinoManagement, 'TS')}
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

			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Link
					to={`restricted-games/${countryId}`}
					className="btn btn-sm btn-soft-warning"
				>
					<i className="mdi mdi-cancel" id={`viewtooltip-${countryId}`} />
					<UncontrolledTooltip
						placement="top"
						target={`viewtooltip-${countryId}`}
					>
						View Blocked Games
					</UncontrolledTooltip>
				</Link>
			</li>

			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Link
					to={`restricted-providers/${countryId}`}
					className="btn btn-sm btn-soft-primary"
				>
					<i
						className="mdi mdi-cancel"
						id={`viewBlockedProviders-${countryId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`viewBlockedProviders-${countryId}`}
					>
						View Blocked Providers
					</UncontrolledTooltip>
				</Link>
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
};

export default ActionButtons;
