import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const TransactionId = ({ value }) => value ?? 'NA';

const PaymentProvider = ({ value }) => value ?? 'NA';

const Amount = ({ value }) =>
	value ? (
		<div className={value < 0 ? 'text-danger' : 'text-success'}>{value}</div>
	) : (
		'-'
	);

const Actionee = ({ value }) => value ?? '-';

const Purpose = ({ value }) => value ?? '';

const TransactionType = ({ value }) => value ?? '-';

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

Amount.propTypes = {
	value: PropTypes.string.isRequired,
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
};
