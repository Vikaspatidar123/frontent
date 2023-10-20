/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const ActionButtons = ({ handleClick, cell }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li>
			<Link
				to="#"
				className="btn btn-sm btn-soft-info"
				onClick={(e) => {
					e.preventDefault();
					handleClick(cell?.row?.original);
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

export default ActionButtons;
