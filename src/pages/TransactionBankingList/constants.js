export const transactionType = [
	{ label: 'Deposit', value: 'deposit' },
	{ label: 'Withdraw', value: 'withdraw' },
	{ label: 'Add Money', value: 'addMoney' },
	{ label: 'Remove Money', value: 'removeMoney' },
	{ label: 'Bonus', value: 'bonus' },
	{ label: 'Bonus To Cash', value: 'bonusToCash' },
	{ label: 'Bonus Forfiet', value: 'bonusForfeit' },
	{ label: 'Bonus Expired', value: 'bonusExpired' },
	{ label: 'Bonus Zeroed Out', value: 'bonusZeroedOut' },
	{ label: 'Internal Deposit', value: 'depositInternal' },
	{ label: 'Internal Add Money', value: 'addMoneyInternal' },
	{ label: 'Internal Withdraw', value: 'withdrawInternal' },
	{ label: 'Internal Remove Money', value: 'removeMoneyInternal' },
];

export const walletType = ['Cash', 'Bonus'];

export const statusType = [
	{ label: 'All', value: '' },
	{ label: 'Pending', value: 0 },
	{ label: 'Complete', value: 1 },
	{ label: 'Failed', value: 2 },
	{ label: 'Requested', value: 7 },
];
