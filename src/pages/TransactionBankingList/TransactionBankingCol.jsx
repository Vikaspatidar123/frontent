/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Id = (cell) => (cell.value ? cell.value : '');

const TransactionId = (cell) => (cell.value ? cell.value : 'NA');

const PaymentProvider = (cell) => (cell.value ? cell.value : 'NA');

const Amount = (cell) =>
	cell.value ? (
		<div className={cell.value.includes('-') ? 'text-danger' : 'text-success'}>
			{cell.value}
		</div>
	) : (
		'-'
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
