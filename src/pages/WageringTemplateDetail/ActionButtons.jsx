/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const ActionButtons = ({ cell, handleEdit, handleView }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
			<Link
				to="#"
				className="btn btn-sm btn-soft-primary"
				onClick={(e) => {
					e.preventDefault();
					handleView(cell?.row?.original);
				}}
			>
				<i className="mdi mdi-eye-outline" id="viewtooltip" />
			</Link>
		</li>
		<UncontrolledTooltip placement="top" target="viewtooltip">
			View
		</UncontrolledTooltip>

		<li>
			<Link
				to="#"
				className="btn btn-sm btn-soft-info"
				onClick={(e) => {
					e.preventDefault();
					handleEdit(cell?.row?.original);
				}}
			>
				<i className="mdi mdi-pencil-outline" id="edittooltip" />
				<UncontrolledTooltip placement="top" target="edittooltip">
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>

		<li>
			<Link to="#" className="btn btn-sm btn-soft-dark">
				<i className="mdi mdi-content-copy" id="deletetooltip" />
				<UncontrolledTooltip placement="top" target="deletetooltip">
					Clone
				</UncontrolledTooltip>
			</Link>
		</li>
	</ul>
);

export default ActionButtons;
