import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const SportId = ({ cell }) => (
	<Link to="/" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);

const SportName = ({ cell }) => cell.value ?? '';

const Status = ({ cell }) =>
	cell.value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

const Icon = ({ cell }) => cell.value ?? '';

SportId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string,
	}).isRequired,
};

Status.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.bool,
	}).isRequired,
};

export { SportId, SportName, Status, Icon };
