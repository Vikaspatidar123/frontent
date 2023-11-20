import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminUserID = ({ value }) => (
	<span className="fw-bold">{value ?? ''}</span>
);

const FullName = ({ value }) => value ?? '';

const Email = ({ cell }) => (
	<Link to={`/staff/details/${cell?.row?.original?.adminUserId}`}>
		{cell.value ?? ''}
	</Link>
);

const Role = ({ value }) => value ?? '';

const Group = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

AdminUserID.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

Email.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				adminUserId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export { AdminUserID, Email, FullName, Role, Group, Status };
