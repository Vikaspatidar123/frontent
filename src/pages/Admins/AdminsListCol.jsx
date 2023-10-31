/* eslint-disable react/prop-types */
import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Email = ({ cell }) => (
	<Link
		to={`/staff/details/${cell?.row?.original?.adminUserId}`}
		className="text-body fw-bold"
	>
		{cell.value ?? ''}
	</Link>
);

const AdminUserID = ({ cell }) => cell.value ?? '';

const FullName = ({ cell }) => cell.value ?? '';

const Role = ({ cell }) => cell.value ?? '';

const Group = ({ cell }) => cell.value ?? '';

const Status = ({ cell }) =>
	cell.value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

AdminUserID.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.number.isRequired,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool.isRequired,
	}).isRequired,
};

export { AdminUserID, Email, FullName, Role, Group, Status };
