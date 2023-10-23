/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const ActionButtons = ({ cell, onClickEdit }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
			<Link to="/" className="btn btn-sm btn-soft-primary">
				<i className="mdi mdi-eye-outline" id="viewtooltip" />
			</Link>
		</li>
		<UncontrolledTooltip placement="top" target="viewtooltip">
			View
		</UncontrolledTooltip>

		<li>
			<Link
				to="#"
				onClick={(e) => {
					e.preventDefault();
					onClickEdit(cell?.row?.original);
				}}
				className="btn btn-sm btn-soft-info"
			>
				<i className="mdi mdi-pencil-outline" id="edittooltip" />
				<UncontrolledTooltip placement="top" target="edittooltip">
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>

		<li>
			<Link to="/" className="btn btn-sm btn-soft-danger">
				<i className="mdi mdi-delete-outline" id="deletetooltip" />
				<UncontrolledTooltip placement="top" target="deletetooltip">
					Delete
				</UncontrolledTooltip>
			</Link>
		</li>
	</ul>
);

export default ActionButtons;
