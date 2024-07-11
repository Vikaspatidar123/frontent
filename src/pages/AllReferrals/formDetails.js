import * as Yup from 'yup';

const referralSchema = Yup.object().shape({
	amount: Yup.number()
		.min(0.01, 'Amount must be greater than 0.')
		.required('Amount is required!')
		.max(1000, 'Amount must be less than or equal to 1000.'),
	limit: Yup.number()
		.integer('Limit must be an integer')
		.min(0.01, 'Limit must be greater than 0.')
		.required('Limit is required!')
		.max(200, 'Limit must be less than or equal to 200.'),
});

const getReferralInitialValues = (details) => ({
	amount: details?.amount ?? 0,
	status: details?.isActive ?? false,
	limit: details?.limit ?? 0,
});

const staticFormFields = () => [
	{
		name: 'status',
		fieldType: 'toggle',
		topDescription: 'Player can refer website to other non register players.',
		label: 'Allow Referral',
		switchSizeClass: 'd-flex justify-content-between form-switch-md px-0 pt-3',
		containerClass: 'false',
		divClass: 'mb-5',
	},
	{
		name: 'amount',
		fieldType: 'textField',
		label: 'Referral Amount',
		type: 'number',
		placeholder: 'Enter Referral Amount',
	},
	{
		name: 'limit',
		fieldType: 'textField',
		label: 'Referral Limit (Maximum number of referrals each player can make)',
		type: 'number',
		placeholder: 'Enter referral limit',
	},
];

export { referralSchema, getReferralInitialValues, staticFormFields };
