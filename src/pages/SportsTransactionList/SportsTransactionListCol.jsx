/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const Email = ({ value }) => value ?? '';

const Amount = ({ value }) =>
	value ? (
		<div className={value >= 0 ? 'text-success' : 'text-danger'}>{value}</div>
	) : (
		'-'
	);

const NonCashAmount = ({ value }) =>
	value ? (
		<div className={value >= 0 ? 'text-success' : 'text-danger'}>{value}</div>
	) : (
		'-'
	);

const CurrencyCode = ({ value }) => value ?? '';

const ActionTypes = () => 'Bet';

const Status = ({ value }) => value || 'Pending';

const CreatedAt = ({ value }) => value ?? '';

Amount.protoTypes = {
	value: PropTypes.string.isRequired,
};

NonCashAmount.protoTypes = {
	value: PropTypes.string.isRequired,
};

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
