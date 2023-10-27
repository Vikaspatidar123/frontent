export const keyArray = [
	{ id: 1, label: 'Currency', accessor: 'currencyCode' },
	{ id: 2, accessor: 'totalAmount', label: 'Total Balance' },
	{ id: 3, accessor: 'cash', label: 'Cash Balance' },
	{ id: 4, accessor: 'bonus', label: 'Bonus Balance' },
	{ id: 5, accessor: 'pendingWithdrawals', label: 'Pending Withdrawals' },
	{ id: 6, accessor: 'pendingDeposits', label: 'Pending Deposits' },
	{ id: 7, accessor: 'netLoss', label: 'Net Loss' },
	{ id: 8, accessor: 'userDeposits', label: 'User Deposits' },
	{ id: 9, accessor: 'addMoney', label: 'Add Money' },
	{ id: 10, accessor: 'totalWithdrawals', label: 'Total Withdrawals' },
	{ id: 11, accessor: 'totalBonus', label: 'Total Bonuses' },
	{ id: 12, accessor: 'depositToBonus', label: 'Deposit to bonus ratio' },
	{ id: 13, accessor: 'averageDeposit', label: 'Average Deposit' },
	{ id: 14, accessor: 'averageWithdrawal', label: 'Average Withdrawal' },
	{ id: 14, accessor: 'averageBonus', label: 'Average Bonus' },
	{ id: 15, accessor: 'createdAt', label: 'Enrolled since' },
];

export const portalValues = [
	{
		optionLabel: 'Current',
		value: 'current',
	},
	{
		optionLabel: 'All',
		value: 'all',
	},
];

export const timePeriodValues = [
	{
		optionLabel: 'Permanent',
		value: 'permanent',
	},
	{
		optionLabel: 'Custom Value',
		value: 'custom',
	},
];

export const userDisableReasons = [
	'Bonus abuser',
	'Duplicate account',
	'Fraudulent',
	'Risk country',
	'Rude behaviour',
	'Bannec country - connect with VPN or Tor Browser',
	'KYC declined',
	'Suspicios - constant deposits and withdrawals (money laundering)',
	'Contacts support for bigger amount of deposit than allowed',
	'Resonsible Gambling',
	'pending',
	'frozen',
	'deactivated',
	'permbanned',
	'tempbannedblocked',
	'gambling_issues',
	'self_excluded',
	'dpo_erasure_requested',
	'kyc_blocked_suspended',
	'kyc_blocked_duplicate',
	'kyc_blocked_bonus_abuse',
	'kyc_blocked_chargeback',
	'kyc_fraud',
	'failed_kyc',
	'aml_failed_sow',
	'aml_management_ban',
	'aml_on_hold',
	'aml_under_review',
	'rg_underaged',
	'rg_under_review',
	'enforced_self_ex',
	'location_ban',
	'cs_management_ban',
	'validated',
	'Other',
];
