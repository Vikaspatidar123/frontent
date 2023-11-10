/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ cell, handleStatus, onClickEdit }) => {
	const status = cell?.row?.original?.isActive;
	const casinoProviderId = cell?.row?.original?.casinoProviderId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
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

			<li>
				{status ? (
					<Link
						to="#"
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
					</Link>
				) : (
					<Link
						to="#"
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
					</Link>
				)}
			</li>

			<li>
				<Link
					to="#"
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
				</Link>
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
