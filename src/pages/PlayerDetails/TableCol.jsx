import React from 'react';
import PropTypes from 'prop-types';

const KeyValueCell = ({ value }) => value ?? '-';
const KeyValueCellNA = ({ value }) => value ?? '-';
const Id = ({ value }) => value ?? '';
const Email = ({ value }) => value ?? '';
const ActionTypes = ({ value }) => value ?? '';

const GameName = ({ value }) => value ?? '-';

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
		return <td>Pending</td>;
	}
	if (value === 1) {
		return <td>Approved</td>;
	}
	if (value === 4) {
		return <td>Re-Requested</td>;
	}
	return <td>Rejected</td>;
};

const CreatedAt = ({ value }) => value ?? '';

const NonCashAmount = ({ value }) =>
	value ? (
		<div className={value >= 0 ? 'text-success' : 'text-danger'}>{value}</div>
	) : (
		'-'
	);

const CurrencyCode = ({ value }) => value ?? '';

const PromotionTitle = ({ value }) => value ?? '';

const Action = (cell) => (cell.value ? cell.value : '');

const Comment = ({ value }) =>
	value ? <div className="comment-term-text">{value}</div> : '';

Amount.propTypes = {
	value: PropTypes.number.isRequired,
};

BonusMoney.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.number.isRequired,
};

NonCashAmount.propTypes = {
	value: PropTypes.number.isRequired,
};

Comment.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	KeyValueCell,
	Id,
	Email,
	GameName,
	ActionTypes,
	Amount,
	BonusMoney,
	Status,
	CreatedAt,
	NonCashAmount,
	CurrencyCode,
	PromotionTitle,
	Action,
	Comment,
	KeyValueCellNA,
};
