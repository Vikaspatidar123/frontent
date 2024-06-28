/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const Id = ({ value }) => value ?? '-';

const KeyValueCell = ({ value, defaultCurrency }) =>
	defaultCurrency ? `${defaultCurrency.symbol} ${value ?? 0}` : value ?? '-';

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

const UserName = ({ cell }) => {
	const { isGranted } = usePermission();
	return cell?.value &&
		isGranted(modules.player, 'R') &&
		cell?.row?.original?.user_id ? (
		<Link to={`/player-details/${cell?.row?.original?.user_id}`}>
			{cell?.value}
		</Link>
	) : (
		cell?.value || ''
	);
};

const CurrencyCode = ({ value }) =>
	value ? <div className="text-primary">{value}</div> : '';

const ActionTypes = ({ value }) => value ?? '';

const Status = ({ value }) => value || 'Pending';

const CreatedAt = ({ value }) => value ?? '';

Amount.protoTypes = {
	value: PropTypes.string.isRequired,
};

NonCashAmount.protoTypes = {
	value: PropTypes.string.isRequired,
};

UserName.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				userId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export {
	Status,
	CreatedAt,
	Id,
	KeyValueCell,
	Amount,
	NonCashAmount,
	CurrencyCode,
	ActionTypes,
	UserName,
};
