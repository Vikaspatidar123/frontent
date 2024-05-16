/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import { BONUS_TYPES } from '../constants';

const currencyValidate = () =>
	Yup.object({
		joiningAmount: Yup.number()
			.typeError('Only Numbers Allowed')
			.required('Required.'),
		maxAmountClaimed: Yup.number()
			.typeError('Only Numbers Allowed')
			.required('Required.'),
		minBetAmount: Yup.number()
			.typeError('Only Numbers Allowed')
			.required('Required.'),
		zeroOutThreshold: Yup.number()
			.typeError('Only Numbers Allowed')
			.required('Required.'),
		minDepositAmount: Yup.number()
			.typeError('Only Numbers Allowed')
			.required('Required.'),
		currencyId: Yup.string().required('Required.'),
	});

const generalFormSchema = () =>
	Yup.object({
		promotionTitle: Yup.string()
			.required('Promotion Title Required')
			.nullable(),
		bonusType: Yup.string().required('Bonus Type Required').nullable(),
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
			.when(['visibleInPromotions', 'bonusType'], {
				is: (visibleInPromotions, bonusType) => {
					if (visibleInPromotions && bonusType !== BONUS_TYPES.promotion) {
						return true;
					}
					return false;
				},
				then: (schema) => schema.min(1, 'Select At Least One Day').nullable(),
			})
			.nullable(),

		percentage: Yup.number()
			.min(1, '% Must be greater than or equal to 1')
			.typeError('Bonus Percent must be a Number')
			.required('Bonus Percentage Required'),
		daysToClear: Yup.number()
			.min(1, 'Minimum Value Must be One')
			.typeError('Only Numbers Allowed')
			.integer('Only Integer Values Allowed')
			.required('Days To Clear Required'),
	});

export { currencyValidate, generalFormSchema };
