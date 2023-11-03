/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ cell, handleStatus }) => {
	const active = cell?.row?.original?.isActive;
	const sportId = cell?.row?.original?.sportId;

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
								sportId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`inactive-${sportId}`} />
						<UncontrolledTooltip placement="top" target={`inactive-${sportId}`}>
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
								sportId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`active-${sportId}`} />
						<UncontrolledTooltip placement="top" target={`active-${sportId}`}>
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
