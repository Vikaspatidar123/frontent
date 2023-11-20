import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const TransactionId = ({ value }) => value ?? 'NA';

const PaymentProvider = ({ value }) => value ?? 'NA';

const Amount = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const Actionee = ({ value }) => value ?? '-';

const ActionType = ({ value }) => value ?? '';

const ActioneeType = ({ value }) => value ?? '-';

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

Amount.propTypes = {
	value: PropTypes.string.isRequired,
};

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
