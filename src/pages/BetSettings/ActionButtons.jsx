/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const ActionButtons = ({ cell, onClickEdit }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li>
			<Link
				to="#"
				onClick={(e) => {
					e.preventDefault();
					onClickEdit(cell?.row?.original);
				}}
				className="btn btn-sm btn-soft-info"
			>
				<i className="mdi mdi-pencil-outline" id={`edit-${cell?.row?.id}`} />
				<UncontrolledTooltip placement="top" target={`edit-${cell?.row?.id}`}>
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>
	</ul>
);

export default ActionButtons;
