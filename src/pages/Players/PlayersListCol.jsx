/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
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

const Action = (cell) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li data-bs-toggle="tooltip" data-bs-placement="top">
			<Link
				to={`/player-details/${cell?.row?.original?.userId}`}
				className="btn btn-sm btn-soft-primary"
			>
				<i
					className="mdi mdi-eye-outline"
					id={`view-tooltip-${cell?.row?.original?.userId}`}
				/>
			</Link>
		</li>
		<UncontrolledTooltip
			placement="top"
			target={`view-tooltip-${cell?.row?.original?.userId}`}
		>
			View
		</UncontrolledTooltip>
	</ul>
);

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
