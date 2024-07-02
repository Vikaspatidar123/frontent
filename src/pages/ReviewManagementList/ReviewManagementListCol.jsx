import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const UserName = ({ value }) => (value ? <div>{value}</div> : '');

const Description = ({ value }) =>
	value ? <div className="english-text">{value}</div> : '';

const Rating = ({ value }) => value ?? '-';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">Inactive</Badge>
	);

UserName.propTypes = {
	value: PropTypes.string.isRequired,
};

Description.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export { Status, UserName, Id, Description, Rating };
