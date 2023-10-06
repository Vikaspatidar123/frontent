import React from 'react';
import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';

const ID = (cell) => (cell.value ? cell.value : '');

const Name = (cell) => (cell.value ? cell.value : '');

const Status = (cell) => {
	const { value } = cell;
	switch (value) {
		case true:
			return <Badge className="bg-success">Active</Badge>;
		case false:
			return <Badge className="bg-danger">Close</Badge>;
		default:
			return '';
	}
};

export { ID, Name, Status };
