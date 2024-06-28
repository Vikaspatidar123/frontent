import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';

const KeyValueData = ({ value, defaultCurrency }) =>
	defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value;

const PlayerPNL = ({ value, defaultCurrency }) => {
	const colorValue = value < 0 ? 'red' : 'green';
	return (
		<span style={{ color: colorValue }}>
			{defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value}
		</span>
	);
};

const Username = ({ cell }) => {
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

Username.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				user_id: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

PlayerPNL.propTypes = {
	value: PropTypes.string.isRequired,
	defaultCurrency: PropTypes.isRequired,
};

export { KeyValueData, Username, PlayerPNL };
