import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TournamentId = ({ cell }) => (
	<Link to="/" className="text-body fw-bold">
		{cell.value ?? ''}
	</Link>
);

const TournamentName = ({ cell }) => cell.value ?? '';

const CountryName = ({ cell }) => cell.value ?? '';

const SportName = ({ cell }) => cell.value ?? '';

TournamentId.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string,
	}).isRequired,
};

export { TournamentId, TournamentName, CountryName, SportName };
