/* eslint-disable react/prop-types */
import React from 'react';

const KeyValueData = ({ value, defaultCurrency }) =>
	defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value;

const Username = ({ value }) => value || '-';

const PlayerPNL = ({ value, defaultCurrency }) => {
	const colorValue = value < 0 ? 'red' : 'green';
	return (
		<span style={{ color: colorValue }}>
			{defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value}
		</span>
	);
};
export { KeyValueData, Username, PlayerPNL };
