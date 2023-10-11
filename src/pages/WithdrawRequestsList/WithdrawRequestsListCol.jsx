/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Id = (cell) => (cell.value ? cell.value : '');

const Email = (cell) => (cell.value ? cell.value : '');

const Name = (cell) => (cell.value ? cell.value : '-');

const ActionableType = (cell) => (cell.value ? cell.value : 'NA');

const PaymentProvider = (cell) => (cell.value ? cell.value : 'NA');

const Amount = (cell) =>
	cell.value ? (
		<div className={cell.value.includes('-') ? 'text-danger' : 'text-success'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const Status = (cell) => (cell.value ? cell.value : '');

const TransactionId = (cell) => (cell.value ? cell.value : '');

const UpdatedAt = (cell) => (cell.value ? cell.value : '');

export {
	Id,
	Email,
	Name,
	ActionableType,
	Amount,
	Status,
	UpdatedAt,
	PaymentProvider,
	TransactionId,
};
