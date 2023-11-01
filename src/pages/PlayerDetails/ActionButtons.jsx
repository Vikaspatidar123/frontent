/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ActionButtons = ({ cell, handleStatus }) => {
	const active = cell?.row?.original?.isRequired;
	const documentLabelId = cell?.row?.original?.documentLabelId;
	const name = cell?.row?.original?.name;

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
								isRequested: false,
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
								isRequested: true,
								labelName: name,
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
