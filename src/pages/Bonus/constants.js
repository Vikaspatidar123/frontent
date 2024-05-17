export const BONUS_TYPES = {
	FREESPINS: 'freespins',
	DEPOSIT: 'deposit',
	JOINING: 'joining',
	BET: 'bet',
};

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
	{ label: 'DEPOSIT', value: BONUS_TYPES.DEPOSIT, id: 1 },
	{ label: 'FREESPINS', value: BONUS_TYPES.FREESPINS, id: 2 },
	{ label: 'JOINING', value: BONUS_TYPES.JOINING, id: 3 },
	// { label: 'BET', value: BONUS_TYPES.BET, id: 4 },
];

const commonCurrencyFields = [
	{ label: 'Zero Out Threshold', key: 'zeroOutThreshold' },
	{ label: 'Max Amount Claimed', key: 'maxAmountClaimed' },
];

const checkLabels = (bonusType) => {
	if (
		[
			BONUS_TYPES.FREESPINS,
			BONUS_TYPES.DEPOSIT,
			BONUS_TYPES.BET,
			BONUS_TYPES.JOINING,
		].includes(bonusType)
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

const LANGUAGES = {
	DE: 'German',
	EN: 'English',
	ES: 'Spanish',
	HI: 'Hindi',
	MS: 'Malay',
	NO: 'Norwegian',
	PS: 'Pasto',
	RO: 'Romanian',
	RU: 'Russian',
};

const wageringRequirementType = [
	{ label: 'BONUS', value: 'bonus', id: 1 },
	{ label: 'BONUS+DEPOSIT', value: 'bonusdeposit', id: 2 },
];

export {
	bonusTypes,
	daysOfWeek,
	commonCurrencyFields,
	checkLabels,
	daysLabels,
	wageringRequirementType,
	LANGUAGES,
};
