/* eslint-disable react/prop-types */
import React from 'react';
import { Badge } from 'reactstrap';

const Id = ({ value }) => value ?? '';

const KeyValueCell = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

export { Id, KeyValueCell, Status };
