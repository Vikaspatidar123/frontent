import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	maxBetAmount: defaultValue?.maxBetAmount || '',
	minBetAmount: defaultValue?.minBetAmount || '',
	maxBetCount: defaultValue?.maxBetCount || '',
	cashoutPercentage: defaultValue?.cashoutPercentage || '',
	minOddLimit: defaultValue?.minOddLimit || '',
	maxOddLimit: defaultValue?.maxOddLimit || '',
	maxEventCount: defaultValue?.maxEventCount || '',
	maxMarketOutcomeCount: defaultValue?.maxMarketOutcomeCount || '',
	maxWinAmount: defaultValue?.maxWinAmount || '',
	sportId: defaultValue?.sportId || '',
});

const validationSchema = () =>
	Yup.object().shape({
		maxBetAmount: Yup.number()
			.typeError('Amount must be a number')
			.required('Max Bet Amount Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than minBetAmount!',
				(value) => value > 0
			)
			.moreThan(
				Yup.ref('minBetAmount'),
				'Maximum bet amount must be greater than minimum bet amount'
			),
		minBetAmount: Yup.number()
			.typeError('Amount must be a number')
			.required('Min Bet Amount Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			)
			.lessThan(
				Yup.ref('maxBetAmount'),
				'Minimum bet amount must be less than maximum bet amount'
			),
		maxBetCount: Yup.number()
			.typeError('Amount must be a number')
			.required('Max Bet Count Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			),
		cashoutPercentage: Yup.number()
			.typeError('Amount must be a number')
			.required('Cashout Percentage Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			),
		minOddLimit: Yup.number()
			.typeError('Amount must be a number')
			.required('Min Odd Limit Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			)
			.lessThan(
				Yup.ref('maxOddLimit'),
				'Minimum odd limit must be less than maximum odd limit'
			),
		maxOddLimit: Yup.number()
			.typeError('Amount must be a number')
			.required('Max odd limit Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			)
			.moreThan(
				Yup.ref('minOddLimit'),
				'Maximum odd limit must be greater than minimum odd limit'
			),
		maxEventCount: Yup.number()
			.typeError('Amount must be a number')
			.required('Max Event Count Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			),
		maxMarketOutcomeCount: Yup.number()
			.typeError('Amount must be a number')
			.required('Max Market Outcome Count Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			),
		maxWinAmount: Yup.number()
			.typeError('Amount must be a number')
			.required('Max Win Amount Count Required')
			.test(
				'Is positive?',
				'ERROR: The number must be greater than 0!',
				(value) => value > 0
			),
		sportId: Yup.string().required('Please select a valid sports'),
	});

const staticFormFields = [
	{
		name: 'maxBetAmount',
		fieldType: 'textField',
		label: 'Max Bet Amount',
	},
	{
		name: 'minBetAmount',
		fieldType: 'textField',
		label: 'Min Bet Amount',
	},
	{
		name: 'maxBetCount',
		fieldType: 'textField',
		label: 'Max Bet Count',
	},
	{
		name: 'cashoutPercentage',
		fieldType: 'textField',
		label: 'Cashout Percentage',
	},
	{
		name: 'minOddLimit',
		fieldType: 'textField',
		label: 'Min Odd Limit',
	},
	{
		name: 'maxOddLimit',
		fieldType: 'textField',
		label: 'Max Odd Limit',
	},
	{
		name: 'maxEventCount',
		fieldType: 'textField',
		label: 'Max Event Count',
	},
	{
		name: 'maxMarketOutcomeCount',
		fieldType: 'textField',
		label: 'Max Market Outcome Count',
	},
	{
		name: 'maxWinAmount',
		fieldType: 'textField',
		label: 'Max Win Amount',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
