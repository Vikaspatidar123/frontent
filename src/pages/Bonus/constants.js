const types = [
	{ label: 'DEPOSIT', value: 'deposit', id: 0 },
	{ label: 'BALANCE', value: 'balance', id: 1 },
	{ label: 'FREESPINS', value: 'freespins', id: 2 },
	{ label: 'CASH FREESPINS', value: 'cashfreespins', id: 3 },
	{ label: 'DEPOSIT', value: 'deposit', id: 4 },
	{ label: 'WAGERING(CASHBACK)', value: 'wagering', id: 5 },
	{ label: 'PROMOTION', value: 'promotion', id: 6 },
	{ label: 'JOINING', value: 'joining', id: 7 },
];

const daysOfWeek = [
	{ label: 'Monday', value: 'Monday', id: 0 },
	{ label: 'Tuesday', value: 'Tuesday', id: 1 },
	{ label: 'Wednesday', value: 'Wednesday', id: 2 },
	{ label: 'Thursday', value: 'Thursday', id: 3 },
	{ label: 'Friday', value: 'Friday', id: 4 },
	{ label: 'Saturday', value: 'Saturday', id: 5 },
	{ label: 'Sunday', value: 'Sunday', id: 6 },
];

const bonusTypes = [
	{ label: 'DEPOSIT', value: 'deposit', id: 1 },
	{ label: 'FREESPINS', value: 'freespins', id: 2 },
	{ label: 'PROMOTION', value: 'promotion', id: 3 },
];

const convertAmountOptions = [
	{ label: 'Max Bonus Claimed', value: 'maxBonusThreshold' },
	{ label: 'Min Deposit', value: 'minDeposit' },
	{ label: 'Max Win Amount', value: 'maxWinAmount' },
	{ label: 'Zero Out Threshold', value: 'zeroOutThreshold' },
	{ label: 'Min Wallet Balance', value: 'minBalance' },
	{ label: 'Max Allowed Balance', value: 'minBalanceCash' },
	{ label: 'Joining Bonus', value: 'joiningAmount' },
];

export { types, bonusTypes, daysOfWeek, convertAmountOptions };
