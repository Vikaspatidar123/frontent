import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';

const KeyValueData = ({ value, defaultCurrency }) =>
	defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value;

const Username = ({ cell }) => {
	const { isGranted } = usePermission();
	return cell?.value && isGranted(modules.player, 'R') ? (
		<Link to={`/player-details/${cell?.row?.original?.userid}`}>
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
				userid: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export { KeyValueData, Username };
