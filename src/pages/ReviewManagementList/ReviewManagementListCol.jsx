/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';
// import { Tooltip } from 'recharts';

const Id = (cell) => (cell.value ? cell.value : '');

const UserName = (cell) => (cell.value ? <div>{cell.value}</div> : '');

const Description = (cell) =>
	cell.value ? (
		// <Tooltip title={cell.value}>
		<div className="english-text">{cell.value}</div>
	) : (
		// </Tooltip>
		''
	);

const Rating = (cell) => (cell.value ? cell.value : '-');

const Actions = (cell) => (cell.value ? cell.value : '');

const Status = (cell) => {
	switch (cell.value) {
		case 'Active':
			return <Badge className="bg-success">Active</Badge>;
		case 'In-Active':
			return <Badge className="bg-danger">In-Active</Badge>;
		default:
			return '';
	}
};

export { Status, UserName, Actions, Id, Description, Rating };
