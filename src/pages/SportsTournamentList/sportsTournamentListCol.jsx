import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TournamentId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const TournamentName = ({ value }) => value ?? '';

const CountryName = ({ value }) => value ?? '';

const SportName = ({ value }) => value ?? '';

TournamentId.propTypes = {
	value: PropTypes.string.isRequired,
};

export { TournamentId, TournamentName, CountryName, SportName };
