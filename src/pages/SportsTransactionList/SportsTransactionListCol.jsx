/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Id = (cell) => (cell.value ? cell.value : '');

const Email = (cell) => (cell.value ? cell.value : '');

const Amount = (cell) =>
	cell.value ? (
		<div className={cell.value >= 0 ? 'text-success' : 'text-danger'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const NonCashAmount = (cell) =>
	cell.value ? (
		<div className={cell.value >= 0 ? 'text-success' : 'text-danger'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const CurrencyCode = (cell) => (cell.value ? cell.value : '');

const ActionTypes = () => 'Bet';

const Status = (cell) => cell.value || 'Pending';

const CreatedAt = (cell) => (cell.value ? cell.value : '');

export {
	Status,
	CreatedAt,
	Id,
	Email,
	Amount,
	NonCashAmount,
	CurrencyCode,
	ActionTypes,
};
