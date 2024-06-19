const Country = ({ cell }) => cell.value ?? '-';

const SignUps = ({ cell }) => cell.value ?? '-';

const Depositors = ({ cell }) =>
	cell?.row?.original?.deposits?.[0]?.depositorCount ?? '-';

const DepositAmount = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${
		cell?.row?.original?.deposits?.[0]?.depositAmount || 0
	}` ?? '-';

export { Country, SignUps, Depositors, DepositAmount };
