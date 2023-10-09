/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';

const Id = (cell) => (cell.value ? cell.value : '');

const TransactionId = (cell) => (cell.value ? cell.value : 'NA');

const PaymentProvider = (cell) => (cell.value ? cell.value : 'NA');

const Amount = (cell) =>
	cell.value ? (
		<Badge className={cell.value.includes('-') ? 'bg-danger' : 'bg-success'}>
			{cell.value}
		</Badge>
	) : (
		''
	);

const Actionee = (cell) => (cell.value ? cell.value : '-');

const ActionType = (cell) => (cell.value ? cell.value : '');

const ActioneeType = (cell) => (cell.value ? cell.value : '-');

const Status = (cell) => (cell.value ? cell.value : '');

const CreatedAt = (cell) => (cell.value ? cell.value : '');

export {
	ActioneeType,
	Actionee,
	ActionType,
	Status,
	CreatedAt,
	Id,
	TransactionId,
	PaymentProvider,
	Amount,
};
