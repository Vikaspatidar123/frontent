/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const AdminUserID = (cell) => (
	<Link to="#" className="text-body fw-bold">
		{cell.value ? cell.value : ''}
	</Link>
);
const Email = (cell) => (cell.value ? cell.value : '');

const FullName = (cell) => (cell.value ? cell.value : '');

const Role = (cell) => (cell.value ? cell.value : '');

const Group = (cell) => (cell.value ? cell.value : '');

const Status = (cell) =>
	cell.value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Close</Badge>
	);

const ActionButtons = () => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
			<Link to="#" className="btn btn-sm btn-soft-primary">
				<i className="mdi mdi-eye-outline" id="viewtooltip" />
			</Link>
		</li>
		<UncontrolledTooltip placement="top" target="viewtooltip">
			View
		</UncontrolledTooltip>

		<li>
			<Link to="#" className="btn btn-sm btn-soft-info">
				<i className="mdi mdi-pencil-outline" id="edittooltip" />
				<UncontrolledTooltip placement="top" target="edittooltip">
					Edit
				</UncontrolledTooltip>
			</Link>
		</li>

		<li>
			<Link to="#" className="btn btn-sm btn-soft-danger">
				<i className="mdi mdi-delete-outline" id="deletetooltip" />
				<UncontrolledTooltip placement="top" target="deletetooltip">
					Delete
				</UncontrolledTooltip>
			</Link>
		</li>
	</ul>
);

export { AdminUserID, Email, FullName, Role, Group, Status, ActionButtons };
