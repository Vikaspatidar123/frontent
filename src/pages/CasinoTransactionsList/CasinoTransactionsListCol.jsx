/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Id = (cell) => (cell.value ? cell.value : '');

const UserEmail = (cell) => (cell.value ? cell.value : '');

const GameName = (cell) => (cell.value ? cell.value : '-');

const ActionType = (cell) => (cell.value ? cell.value : '');

const Amount = (cell) =>
	cell.value ? (
		<div className={cell.value.includes('-') ? 'text-danger' : 'text-success'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const BonusMoney = (cell) =>
	cell.value ? (
		<div className={cell.value.includes('-') ? 'text-danger' : 'text-success'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const Status = (cell) => (cell.value ? cell.value : '');

const CreatedAt = (cell) => (cell.value ? cell.value : '');

export {
	Id,
	UserEmail,
	GameName,
	ActionType,
	Amount,
	BonusMoney,
	Status,
	CreatedAt,
};
