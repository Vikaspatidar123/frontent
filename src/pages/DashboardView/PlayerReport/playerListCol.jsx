/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';

const KeyValueData = ({ value, defaultCurrency }) =>
	defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value;

const Username = ({ cell }) => {
	const { isGranted } = usePermission();
	return cell?.value &&
		isGranted(modules.player, 'R') &&
		cell?.row?.original?.user_id ? (
		<Link to={`/player-details/${cell?.row?.original?.user_id}`}>
			{cell?.value}
		</Link>
	) : (
		cell?.value || '-'
	);
};
const PlayerPNL = ({ value, defaultCurrency }) => {
	const colorValue = value < 0 ? 'red' : 'green';
	return (
		<span style={{ color: colorValue }}>
			{defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value}
		</span>
	);
};
export { KeyValueData, Username, PlayerPNL };
