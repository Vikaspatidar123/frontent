import React from 'react';
import PropTypes from 'prop-types';

const KeyValueCell = ({ value }) => value ?? '0';
const KeyValueCellNA = ({ value }) => value ?? '-';
const Id = ({ value }) => value ?? '';
const Email = ({ value }) => value ?? '';
const ActionTypes = ({ value }) => value ?? '';
const Purpose = ({ value }) => value ?? '';

const GameName = ({ value }) => value ?? '-';

const Amount = ({ value }) =>
	value ? <div className="text-success">{value}</div> : '-';

const BonusMoney = ({ value }) =>
	value ? <div className="text-danger">{value}</div> : '-';

const StatusData = ({ value }) => value ?? '';

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

const NonCashAmount = ({ value }) =>
	value ? (
		<div className={value >= 0 ? 'text-success' : 'text-danger'}>{value}</div>
	) : (
		'-'
	);

const CurrencyCode = ({ value }) =>
	value ? <div className="text-primary">{value}</div> : '';

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

CurrencyCode.propTypes = {
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
	StatusData,
	Purpose,
};
