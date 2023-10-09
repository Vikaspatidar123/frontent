import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BetSettingId = ({ cell }) => (
	<Link to="/" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);

const SportsName = ({ cell }) => cell.value ?? '';

const MaxBetAmount = ({ cell }) => cell.value ?? '';

const MinBetAmount = ({ cell }) => cell.value ?? '';

const MaxBetCount = ({ cell }) => cell.value ?? '';

const MaxWinAmount = ({ cell }) => cell.value ?? '';

const CashoutPercentage = ({ cell }) => cell.value ?? '';

const MinOddLimit = ({ cell }) => cell.value ?? '';

const MaxOddLimit = ({ cell }) => cell.value ?? '';

const MaxEventCount = ({ cell }) => cell.value ?? '';

const MaxMarketOutcomeCount = ({ cell }) => cell.value ?? '';

const UpdatedAt = ({ cell }) => cell.value ?? '';

BetSettingId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
	}).isRequired,
};

export {
	BetSettingId,
	SportsName,
	MaxBetAmount,
	MinBetAmount,
	MaxBetCount,
	MaxWinAmount,
	CashoutPercentage,
	MinOddLimit,
	MaxOddLimit,
	MaxEventCount,
	MaxMarketOutcomeCount,
	UpdatedAt,
};
