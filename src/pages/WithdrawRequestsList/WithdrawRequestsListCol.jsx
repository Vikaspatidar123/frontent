/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const Email = ({ value }) => value ?? '';

const Name = ({ value }) => value ?? '-';

const ActionableType = ({ value }) => value ?? 'NA';

const PaymentProvider = ({ value }) => value ?? 'NA';

const Amount = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const Status = ({ value }) => value ?? '';

const TransactionId = ({ value }) => value ?? '';

const UpdatedAt = ({ value }) => value ?? '';

Amount.protoTypes = {
	value: PropTypes.string.isRequired,
};

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
