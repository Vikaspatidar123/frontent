import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const UserName = ({ value }) => (value ? <div>{value}</div> : '');

const Description = ({ value }) =>
	value ? <div className="english-text">{value}</div> : '';

const Rating = ({ value }) => value ?? '-';

const Actions = ({ value }) => value ?? '';

const Status = ({ value }) => {
	switch (value) {
		case 'Active':
			return <Badge className="bg-success">Active</Badge>;
		case 'In-Active':
			return <Badge className="bg-danger">In-Active</Badge>;
		default:
			return '';
	}
};

UserName.propTypes = {
	value: PropTypes.string.isRequired,
};

Description.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export { Status, UserName, Actions, Id, Description, Rating };
