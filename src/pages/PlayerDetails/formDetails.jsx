import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	title: defaultValue?.title || '',
	comment: defaultValue?.comment || '',
});

const validationSchema = () =>
	Yup.object().shape({
		title: Yup.string().required('Title Required'),
		comment: Yup.string().required('Comment Required'),
	});

const staticFormFields = [
	{
		name: 'title',
		fieldType: 'textField',
		label: 'Title',
		required: true,
		placeholder: 'Enter the Title',
	},
	{
		name: 'comment',
		fieldType: 'textField',
		label: 'Comment',
		required: true,
		placeholder: 'Enter Comment',
	},
];

const limitsSchema = ({ minimum, currLabel, label }) =>
	Yup.object().shape({
		limit: Yup.number()
			.positive('Limit must be positive number')
			.integer('Limit must be an integer')
			.min(
				minimum + 1,
				`${currLabel} Must Be Greater Than ${label} (${minimum})`
			)
			.required('Limit Required'),
	});

const setDisableUserlimitsSchema = () =>
	Yup.object().shape({
		limit: Yup.number()
			.positive('Time Period must be positive number')
			.integer('Time Period must be an integer')
			.required('Time Period Required'),
	});

const selfExclusionSchema = () =>
	Yup.object().shape({
		days: Yup.number()
			.positive('Month must be positive number')
			.integer('Month must be an integer')
			.required('Month Required'),
	});

const getLimitInitialValues = (defaultValue) => ({
	limit: defaultValue?.limit || '',
});

const depositSchema = () =>
	Yup.object().shape({
		addAmount: Yup.number()
			.typeError('Only numbers are allowed')
			.min(0, 'Amount should be greater than 0')
			.required('Amount Required'),
		transactionType: Yup.string().required('Transaction type required'),
		walletType: Yup.string().required('Wallet type required'),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	limitsSchema,
	selfExclusionSchema,
	getLimitInitialValues,
	setDisableUserlimitsSchema,
	depositSchema,
};
