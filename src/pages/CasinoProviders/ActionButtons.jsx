/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ cell, handleStatus, onClickEdit }) => {
	const { isGranted } = usePermission();
	const status = cell?.row?.original?.isActive;
	const casinoProviderId = cell?.row?.original?.casinoProviderId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{isGranted(modules.CasinoManagement, 'U') && (
				<li data-bs-toggle="tooltip" data-bs-placement="top">
					<Link
						to={`/casino-providers/restrict-countries/${casinoProviderId}`}
						state={{ type: 'providers' }}
						className="btn btn-sm btn-soft-primary"
					>
						<i className="mdi mdi-block-helper" id="viewtooltip" />
						<UncontrolledTooltip placement="top" target="viewtooltip">
							View Restricted Countries
						</UncontrolledTooltip>
					</Link>
				</li>
			)}

			<li>
				{status ? (
					<Button
						hidden={!isGranted(modules.CasinoManagement, 'T')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								status,
								casinoProviderId,
							})
						}
					>
						<i
							className="mdi mdi-close-thick"
							id={`activetooltip-${casinoProviderId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`activetooltip-${casinoProviderId}`}
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
								status,
								casinoProviderId,
							})
						}
					>
						<i
							className="mdi mdi-check-circle"
							id={`activetooltip-${casinoProviderId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`activetooltip-${casinoProviderId}`}
						>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.CasinoManagement, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(cell?.row?.original);
					}}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleStatus: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
