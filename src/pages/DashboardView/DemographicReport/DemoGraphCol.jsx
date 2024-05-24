const Country = ({ cell }) => cell.value ?? '-';

const SignUps = ({ cell }) => cell.value ?? '-';

const Depositors = ({ cell }) =>
	cell?.row?.original?.deposits?.[0]?.depositorCount ?? '-';

const DepositAmount = ({ cell }) =>
	cell?.row?.original?.deposits?.[0]?.depositAmount ?? '-';

export { Country, SignUps, Depositors, DepositAmount };
