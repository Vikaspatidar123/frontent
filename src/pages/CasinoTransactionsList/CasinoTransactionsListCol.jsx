/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => <div className="text-ellipsis">{value ?? '-'}</div>;

const UserEmail = ({ value }) => value ?? '';

const GameName = ({ value }) => value ?? '-';

const ActionType = ({ value }) => value ?? '-';

const CurrencyCode = ({ value }) => value ?? '-';

const FromWallet = ({ value }) => value ?? '-';

const ToWallet = ({ value }) => value ?? '-';

const ConversionRate = ({ value }) => value ?? '';

const Purpose = ({ value }) => value ?? '';

const Amount = ({ value, type, defaultCurrency }) =>
	value ? (
		<div className={type === 'Debit' ? 'text-danger' : 'text-success'}>
			{`${defaultCurrency.symbol} ${value}`}
		</div>
	) : (
		'-'
	);

const BonusMoney = ({ value }) =>
	value ? (
		<div className={value?.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

const Tags = ({ value }) => value ?? '';

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
	CurrencyCode,
	ConversionRate,
	Purpose,
	Tags,
	FromWallet,
	ToWallet,
};
