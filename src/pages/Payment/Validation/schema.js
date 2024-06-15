/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const currencyValidate = () =>
	Yup.object({
		currencyId: Yup.string().nullable(),
		minDeposit: Yup.number()
			.nullable()
			.min(0, 'Amount should be greater than 0')
			.when(['maxDeposit'], (items, schema) => items?.[0] && items?.[0] !== null
					? schema.lessThan(
							Yup.ref('maxDeposit'),
							'Must be less than maximum deposit'
					  )
					: schema),
		maxDeposit: Yup.number().nullable(),
		minWithdraw: Yup.number()
			.nullable()
			.min(0, 'Amount should be greater than 0')
			.when(['maxWithdraw'], (items, schema) => items?.[0] && items?.[0] !== null
					? schema.lessThan(
							Yup.ref('maxWithdraw'),
							'Must be less than maximum withdraw'
					  )
					: schema),
		maxWithdraw: Yup.number().nullable(),
	});

const countriesValidate = () =>
	Yup.object({
		blockedCountries: Yup.string().required('Currency required'),
	});

const generalFormSchema = () =>
	Yup.object({
		name: Yup.string().required('Payment Name Required'),
		description: Yup.string().required('Description Required'),
		aggregator: Yup.string().required('Payment Aggregator Required'),
		category: Yup.string().required('Payment Category Required'),
		displayName: Yup.string().required('Title Required'),
		depositImage: Yup.mixed()
			.nullable()
			.when(
				['$isFilePresent'],
				(isFilePresent, schema) =>
					isFilePresent?.[0] &&
					schema.test(
						'FILE_SIZE',
						'Please select any file.',
						(value) =>
							value && (typeof value === 'string' ? true : value.size > 0)
					)
			)
			.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
		withdrawImage: Yup.mixed()
			.nullable()
			.when(
				['$isFilePresent'],
				(isFilePresent, schema) =>
					isFilePresent?.[0] &&
					schema.test(
						'FILE_SIZE',
						'Please select any file.',
						(value) =>
							value && (typeof value === 'string' ? true : value.size > 0)
					)
			)
			.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
	});

export { currencyValidate, generalFormSchema, countriesValidate };
