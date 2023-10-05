/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';
import { Colors } from '../../helpers/common';

const PlayerId = (cell) => (cell.value ? cell.value : '');

const UserName = (cell) =>
	cell.value ? (
		<div style={{ color: Colors.primaryBlue }}>{cell.value}</div>
	) : (
		''
	);

const Email = (cell) => (cell.value ? cell.value : '');

const PhoneNumber = (cell) => (cell.value ? cell.value : '-');

const KycStatus = (cell) => (cell.value ? cell.value : '');

const IsInternal = (cell) => (cell.value ? cell.value : '');

const Action = (cell) => (cell.value ? cell.value : '');

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

export {
	IsInternal,
	KycStatus,
	PhoneNumber,
	UserName,
	PlayerId,
	Email,
	Action,
	Status,
};
