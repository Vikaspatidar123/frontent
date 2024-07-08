/* eslint-disable react/prop-types */
import React from 'react';

const Country = ({ cell }) => cell.value ?? '-';

const Flag = ({ cell }) =>
	cell.value ? (
		<img
			alt={cell.value}
			src={`https://flagsapi.com/${cell.value}/shiny/32.png`}
		/>
	) : (
		'-'
	);

const SignUps = ({ cell }) => cell.value ?? '-';

const Depositors = ({ cell }) => cell.value ?? '-';

const DepositAmount = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell?.value || 0}` ?? '-';

export { Country, SignUps, Depositors, DepositAmount, Flag };
