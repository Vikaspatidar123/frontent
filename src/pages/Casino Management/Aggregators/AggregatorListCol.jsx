import React from 'react';
import { Badge } from 'reactstrap';
import Proptypes from 'prop-types';
// import { Link } from 'react-router-dom';

const ID = (cell) => (cell.value ? cell.value : '');

const Name = (cell) => (cell.value ? cell.value : '');

const Status = (cell) => {
	const { value } = cell;
	return value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);
};

Status.prototype = {
	cell: Proptypes.objectOf.isRequired,
};

export { ID, Name, Status };
