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
	{ label: 'Monday', value: 'monday', id: 0 },
	{ label: 'Tuesday', value: 'tuesday', id: 1 },
	{ label: 'Wednesday', value: 'wednesday', id: 2 },
	{ label: 'Thursday', value: 'thursday', id: 3 },
	{ label: 'Friday', value: 'friday', id: 4 },
	{ label: 'Saturday', value: 'saturday', id: 5 },
	{ label: 'Sunday', value: 'sunday', id: 6 },
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

const checkLabels = (bonusType) => {
	if (
		['freespins', 'cashfreespins', 'balance', 'deposit', 'promotion'].includes(
			bonusType
		)
	) {
		return [
			{
				label: 'Active',
				value: 'isActive',
				message: 'If True Status is Active else In-Active',
			},
			{
				label: 'Visible In Promotions',
				value: 'visibleInPromotions',
				message: 'If true visible in promotion else not',
			},
		];
	}
	return [
		{
			label: 'Active',
			value: 'isActive',
			message: 'If True Status is Active else In-Active',
		},
	];
};

const daysLabels = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];
const wageringRequirementType = [
	{ label: 'BONUS', value: 'bonus', id: 1 },
	{ label: 'BONUS+DEPOSIT', value: 'bonusdeposit', id: 2 },
];

export {
	types,
	bonusTypes,
	daysOfWeek,
	convertAmountOptions,
	checkLabels,
	daysLabels,
	wageringRequirementType,
};
