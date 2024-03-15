/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ cell, handleStatus }) => {
	const active = cell?.row?.original?.required;
	const documentLabelId = cell?.row?.original?.id;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				{active ? (
					<Link
						to="#"
						className="btn btn-sm btn-soft-danger"
						onClick={(e) => {
							e.preventDefault();
							handleStatus({
								documentLabelId,
								reRequested: false,
							});
						}}
					>
						<i className="mdi mdi-close-thick" id="inactivetooltip" />
						<UncontrolledTooltip placement="top" target="inactivetooltip">
							Mark As Not Required
						</UncontrolledTooltip>
					</Link>
				) : (
					<Link
						to="#"
						className="btn btn-sm btn-soft-success"
						onClick={(e) => {
							e.preventDefault();
							handleStatus({
								documentLabelId,
								reRequested: true,
							});
						}}
					>
						<i className="mdi mdi-check-circle" id="activetooltip" />
						<UncontrolledTooltip placement="top" target="activetooltip">
							Mark As Required
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
