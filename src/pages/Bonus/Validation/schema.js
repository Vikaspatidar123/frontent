/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import { BONUS_TYPES } from '../constants';

const currencyValidate = (allFields) =>
	Yup.object({
		currencyId: Yup.string().required('Currency required'),
		// maxBonusClaimed: Yup.number().required('Max Amount claimed required'),
		// zeroOutThreshold: Yup.number()
		// 	.min(1, 'Amount should be greater than 1')
		// 	.required('Zero out threshold required'),
		maxBonusClaimed: Yup.number()
			.when(['dummy'], {
				is: () => {
					if (allFields.bonusType !== BONUS_TYPES.JOINING) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Max Amount claimed required')
						.min(0.01, 'Amount should be greater than 0')
						.max(10000, 'Amount should not exceed 10,000'),
			})
			.nullable(),
		zeroOutThreshold: Yup.number()
			.when(['dummy'], {
				is: () => {
					if (allFields.bonusType !== BONUS_TYPES.JOINING) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Zero out threshold required')
						.min(0.01, 'Amount should be greater than 0')
						.max(10000, 'Amount should not exceed 10,000'),
			})
			.nullable(),
		joiningAmount: Yup.number()
			.when(['dummy'], {
				is: () => {
					if (allFields.bonusType === BONUS_TYPES.JOINING) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Joining amount required')
						.min(0.01, 'Amount should be greater than 0')
						.max(10000, 'Amount should not exceed 10,000'),
			})
			.nullable(),
		minBetAmount: Yup.number()
			.when(['dummy'], {
				is: () => {
					if (allFields.bonusType === BONUS_TYPES.BET) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Min bet amount required')
						.min(0.01, 'Amount should be greater than 0'),
			})
			.nullable(),
		minDepositAmount: Yup.number()
			.when(['dummy'], {
				is: () => {
					if (allFields.bonusType === BONUS_TYPES.DEPOSIT) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Min deposit amount required')
						.min(0.01, 'Amount should be greater than 0')
						.test(
							'is-less-than-maxBonusClaimed',
							'Min deposit amount must be less than max bonus claimed',
							function (value) {
								const { maxBonusClaimed } = this.parent;
								return !value || !maxBonusClaimed || value < maxBonusClaimed;
							}
						),
			})
			.nullable(),
	});

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 200;
const generalFormSchema = () =>
	Yup.object({
		promotionTitle: Yup.string()
			.min(
				MIN_TITLE_LENGTH,
				`Title must be at least ${MIN_TITLE_LENGTH} characters`
			)
			.max(
				MAX_TITLE_LENGTH,
				`Title must be at most ${MAX_TITLE_LENGTH} characters`
			)
			.required('Bonus Title is required'),
		bonusType: Yup.string().required('Bonus Type Required'),
		termAndCondition: Yup.string()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType !== BONUS_TYPES.JOINING) {
						return true;
					}
					return false;
				},
				then: (schema) => schema.required('Terms and Conditions Required'),
			})
			.nullable(),

		description: Yup.string()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType !== BONUS_TYPES.JOINING) {
						return true;
					}
					return false;
				},
				then: (schema) => schema.required('Description Required'),
			})
			.nullable(),

		quantity: Yup.number()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType === BONUS_TYPES.FREESPINS) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Quantity Required')
						.integer('Must be an integer')
						.min(0.01, 'Must be greater than 0')
						.max(100, 'Must be less than or equal to 100'),
			})
			.nullable(),

		bonusImage: Yup.mixed()
			.when(
				'$isFilePresent',
				(isFilePresent, schema) =>
					isFilePresent &&
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
		validOnDays: Yup.array()
			.when('visibleInPromotions', {
				is: (visibleInPromotions) => {
					if (visibleInPromotions) {
						return true;
					}
					return false;
				},
				then: (schema) => schema.min(1, 'Select At Least One Day').nullable(),
			})
			.nullable(),

		percentage: Yup.number()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (
						bonusType !== BONUS_TYPES.JOINING &&
						bonusType !== BONUS_TYPES.FREESPINS
					) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Bonus percentage required')
						.min(1, 'Bonus percentage Must be greater than or equal to 1')
						.max(100, 'Bonus percentage must be less than or equal to 100'),
			})
			.nullable(),

		daysToClear: Yup.number()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType !== BONUS_TYPES.JOINING) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Days to clear required')
						.integer('Must be an integer')
						.min(0.01, 'Must be greater than 0')
						.max(365, 'Must be less than or equal to 365'),
			})
			.nullable(),
	});

export { currencyValidate, generalFormSchema };
