import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const TransactionId = ({ value }) => value ?? 'NA';

const PaymentProvider = ({ value }) => value ?? 'NA';

const Amount = ({ value, type, defaultCurrency }) =>
	value ? (
		<div
			className={type ? 'text-danger' : 'text-success'}
		>{`${defaultCurrency.symbol} ${value}`}</div>
	) : (
		'-'
	);

const Actionee = ({ value }) => value ?? '-';

const FromWallet = ({ value }) => value ?? '-';

const ToWallet = ({ value }) => value ?? '-';

const Purpose = ({ value }) => value ?? '';

const TransactionType = ({ value }) => value ?? '-';

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

const Tags = ({ value }) => value ?? '';

Amount.propTypes = {
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	defaultCurrency: PropTypes.shape({
		symbol: PropTypes.string,
	}).isRequired,
};

export {
	Actionee,
	Purpose,
	Status,
	CreatedAt,
	Id,
	TransactionId,
	PaymentProvider,
	Amount,
	TransactionType,
	FromWallet,
	ToWallet,
	Tags,
};
