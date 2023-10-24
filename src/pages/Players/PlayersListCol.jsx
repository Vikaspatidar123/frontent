/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';
import { Colors } from '../../helpers/common';

const PlayerId = (cell) => (cell.value ? cell.value : '');

const UserName = ({ cell, onClickPlayer }) =>
	cell.value ? (
		<div
			onClick={() => onClickPlayer(cell?.row?.original?.userId)}
			style={{ color: Colors.primaryBlue, cursor: 'pointer' }}
		>
			{cell.value}
		</div>
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
