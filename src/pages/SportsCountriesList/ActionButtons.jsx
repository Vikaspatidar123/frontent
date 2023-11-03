/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ cell, handleStatus }) => {
	const active = cell?.row?.original?.isActive;
	const countryId = cell?.row?.original?.countryId;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				{active ? (
					<Link
						to="#"
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								active,
								countryId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`inactive-${countryId}`} />
						<UncontrolledTooltip
							placement="top"
							target={`inactive-${countryId}`}
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
								active,
								countryId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`active-${countryId}`} />
						<UncontrolledTooltip placement="top" target={`active-${countryId}`}>
							Set Active
						</UncontrolledTooltip>
					</Link>
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
