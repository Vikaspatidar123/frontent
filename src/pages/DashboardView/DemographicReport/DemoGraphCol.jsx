const Country = ({ cell }) => cell.value ?? '-';

const SignUps = ({ cell }) => cell.value ?? '-';

const Depositors = ({ cell }) => cell.value ?? '-';

const DepositAmount = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell?.value || 0}` ?? '-';

export { Country, SignUps, Depositors, DepositAmount };
