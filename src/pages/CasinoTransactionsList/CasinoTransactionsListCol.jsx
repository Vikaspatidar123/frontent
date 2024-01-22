/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const UserEmail = ({ value }) => value ?? '';

const GameName = ({ value }) => value ?? '-';

const ActionType = ({ value }) => value ?? '';

const Amount = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const BonusMoney = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const Status = ({ value }) => {
	if (value === 0) {
		return 'Pending';
	} if (value === 1) {
		return 'Completed';
	} if (value === 2) {
		return 'Failed';
	} if (value === 3) {
		return 'Rollback';
	} 
		return '-';
	
};

const CreatedAt = ({ value }) => value ?? '';

Amount.protoTypes = {
	value: PropTypes.string.isRequired,
};

BonusMoney.protoTypes = {
	value: PropTypes.string.isRequired,
};

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
