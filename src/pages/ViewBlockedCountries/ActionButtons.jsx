/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ActionButtons = ({ cell, handleStatus, type }) => {
	const countryId = cell?.row?.original?.countryId;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Link
					to="#"
					className={
						type === 'remove'
							? 'btn btn-sm btn-soft-danger'
							: 'btn btn-sm btn-soft-success'
					}
					onClick={(e) => {
						e.preventDefault();
						handleStatus(cell?.row?.original);
					}}
				>
					<i
						className={
							type === 'remove' ? 'mdi mdi-minus-thick' : 'mdi mdi-plus-thick'
						}
						id={`inactivetooltip-${countryId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`inactivetooltip-${countryId}`}
					>
						Add This Country
					</UncontrolledTooltip>
				</Link>
			</li>
		</ul>
	);
};

ActionButtons.defaultProps = {
	type: '',
};

ActionButtons.propTypes = {
	handleStatus: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
	type: PropTypes.string,
};

export default ActionButtons;
