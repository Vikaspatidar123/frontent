import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BetSettingId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const SportsName = ({ value }) => value ?? '';

const MaxBetAmount = ({ value }) => value ?? '';

const MinBetAmount = ({ value }) => value ?? '';

const MaxBetCount = ({ value }) => value ?? '';

const MaxWinAmount = ({ value }) => value ?? '';

const CashoutPercentage = ({ value }) => value ?? '';

const MinOddLimit = ({ value }) => value ?? '';

const MaxOddLimit = ({ value }) => value ?? '';

const MaxEventCount = ({ value }) => value ?? '';

const MaxMarketOutcomeCount = ({ value }) => value ?? '';

const UpdatedAt = ({ value }) => value ?? '';

BetSettingId.propTypes = {
	value: PropTypes.string.isRequired,
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
