import * as Yup from 'yup';

const referralSchema = Yup.object().shape({
	amount: Yup.number()
		.min(0.01, 'Amount must be greater than 0.')
		.required('Amount is required!')
		.max(1000, 'Amount must be less than or equal to 1000.'),
});

const getReferralInitialValues = (details) => ({
	amount: details?.amount ?? 0,
	status: details?.isActive ?? false,
});

export { referralSchema, getReferralInitialValues };
