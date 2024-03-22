/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const currencyValidate = ({ curr, bonusType, isSticky }) => {
	const validationObject = {};
	if (bonusType === 'deposit') {
		for (const file in curr) {
			validationObject[file] = Yup.object().shape({
				maxBonusThreshold: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
				minDeposit: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
				maxWinAmount: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
				zeroOutThreshold: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
			});
		}
	} else if (bonusType === 'wagering') {
		for (const file in curr) {
			validationObject[file] = Yup.object().shape({
				zeroOutThreshold: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
				minBalance: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
			});
		}
	} else if (bonusType === 'freespins' && (isSticky === 'true' || isSticky)) {
		for (const file in curr) {
			validationObject[file] = Yup.object().shape({
				maxWinAmount: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
				zeroOutThreshold: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
			});
		}
	} else if (bonusType === 'joining') {
		for (const file in curr) {
			validationObject[file] = Yup.object().shape({
				joiningAmount: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
			});
		}
	} else {
		for (const file in curr) {
			validationObject[file] = Yup.object().shape({
				maxWinAmount: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Required.'),
			});
		}
	}
	return Yup.object(validationObject);
};

const generalFormSchema = () =>
	Yup.object({
		promotionTitle: Yup.string()
			.required('Promotion Title Required')
			.nullable(),
		bonusType: Yup.string().required('Bonus Type Required').nullable(),
		betLevel: Yup.number()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType === 'freespins') {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.min(1, 'Minimum value must be 1')
						.required('Bet Level Required')
						.integer('Only Integer Values Allowed'),
			})
			.nullable(),
		termCondition: Yup.string()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType !== 'joining') {
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
					if (bonusType !== 'joining') {
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
		// Yup.mixed().when(['bonusType'], {
		//   is: (bonusType) => {
		//     if (bonusType !== 'joining') {
		//       return true;
		//     }
		//     return false;
		//   },
		//   then: (schema) => {
		//     if (!bonusDetail) {
		//       return schema
		//         .required('A file is required')
		//         .test(
		//           'File Size',
		//           'File Size Should be Less Than 1MB',
		//           (value) => !value || (value && value.size <= 1024 * 1024)
		//         )
		//         .test(
		//           'FILE_FORMAT',
		//           'Uploaded file has unsupported format.',
		//           (value) =>
		//             !value ||
		//             (value &&
		//               ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
		//         )
		//         .nullable();
		//     }
		//     return schema
		//       .test(
		//         'File Size',
		//         'File Size Should be Less Than 1MB',
		//         (value) => !value || (value && value.size <= 1024 * 1024)
		//       )
		//       .test(
		//         'FILE_FORMAT',
		//         'Uploaded file has unsupported format.',
		//         (value) =>
		//           !value ||
		//           (value &&
		//             ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
		//       )
		//       .nullable();
		//   },
		// }),
		validOnDays: Yup.array()
			.when(['visibleInPromotions', 'bonusType'], {
				is: (visibleInPromotions, bonusType) => {
					if (visibleInPromotions && bonusType !== 'promotion') {
						return true;
					}
					return false;
				},
				then: (schema) => schema.min(1, 'Select At Least One Day').nullable(),
			})
			.nullable(),
		quantity: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType === 'freespins') {
					return true;
				}
				return false;
			},
			then: (schema) =>
				schema
					.min(1, 'Minimum Value Must be One')
					.typeError('Only Numbers Allowed')
					.required('Quantity Required')
					.integer('Only Integer Values Allowed'),
		}),

		wageringRequirementType: Yup.string().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'balance') {
					return true;
				}
				return false;
			},
			then: (schema) => schema.required('Wagering Type Required').nullable(),
		}),
		depositBonusPercent: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType === 'deposit') {
					return true;
				}
				return false;
			},
			then: (schema) =>
				schema
					.min(1, '% Must be greater than or equal to 1')
					.typeError('Bonus Percent must be a Number')
					.required('Bonus Percentage Required')
					.nullable(),
		}),

		wageringMultiplier: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'balance') {
					return true;
				}
				return false;
			},
			then: (schema) =>
				schema
					.min(1, 'Minimum Value Must be One')
					.typeError('Only Numbers Allowed')
					.required('Wagering Multiplier Required'),
		}),

		daysToClear: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'promotion') {
					return true;
				}
				return false;
			},
			then: (schema) =>
				schema
					.min(1, 'Minimum Value Must be One')
					.typeError('Only Numbers Allowed')
					.integer('Only Integer Values Allowed')
					.required('Days To Clear Required'),
		}),

		joiningAmount: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType === 'joining') {
					return true;
				}
				return false;
			},
			then: (schema) =>
				schema
					.min(1, 'Minimum Value Must be One')
					.typeError('Only Numbers Allowed')
					.integer('Only Integer Values Allowed')
					.required('Joining Amount Required'),
		}),
	});

const bonusSchema = (curr, { bonusDetail }) => [
	Yup.object({
		promotionTitle: Yup.string()
			.required('Promotion Title Required')
			.nullable(),
		bonusType: Yup.string().required('Bonus Type Required').nullable(),
		appliedBonusVal: Yup.string()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType === 'balance') {
						return true;
					}
					return false;
				},
				then: Yup.string().required('Applied Bonus Required'),
			})
			.nullable(),
		betLevel: Yup.number()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType === 'freespins' || bonusType === 'cashfreespins') {
						return true;
					}
					return false;
				},
				then: Yup.number()
					.min(1, 'Minimum value must be 1')
					.required('Bet Level Required')
					.integer('Only Integer Values Allowed'),
			})
			.nullable(),
		termCondition: Yup.string()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType !== 'joining') {
						return true;
					}
					return false;
				},
				then: Yup.string().required('Terms and Conditions Required'),
			})
			.nullable(),
		description: Yup.string()
			.when(['bonusType'], {
				is: (bonusType) => {
					if (bonusType !== 'joining') {
						return true;
					}
					return false;
				},
				then: Yup.string().required('Description Required'),
			})
			.nullable(),
		bonusImage: Yup.mixed().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'joining') {
					return true;
				}
				return false;
			},
			then: !bonusDetail
				? Yup.mixed()
						.required('A file is required')
						.test(
							'File Size',
							'File Size Should be Less Than 1MB',
							(value) => !value || (value && value.size <= 1024 * 1024)
						)
						.test(
							'FILE_FORMAT',
							'Uploaded file has unsupported format.',
							(value) =>
								!value ||
								(value &&
									['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
						)
						.nullable()
				: Yup.mixed()
						.test(
							'File Size',
							'File Size Should be Less Than 1MB',
							(value) => !value || (value && value.size <= 1024 * 1024)
						)
						.test(
							'FILE_FORMAT',
							'Uploaded file has unsupported format.',
							(value) =>
								!value ||
								(value &&
									['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
						)
						.nullable(),
		}),
		validOnDays: Yup.array()
			.when(['visibleInPromotions', 'bonusType'], {
				is: (visibleInPromotions, bonusType) => {
					if (visibleInPromotions && bonusType !== 'promotion') {
						return true;
					}
					return false;
				},
				then: Yup.array().min(1, 'Select At Least One Day').nullable(),
			})
			.nullable(),
		quantity: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType === 'freespins') {
					return true;
				}
				return false;
			},
			then: Yup.number()
				.min(1, 'Minimum Value Must be One')
				.typeError('Only Numbers Allowed')
				.required('Quantity Required')
				.integer('Only Integer Values Allowed'),
		}),

		wageringRequirementType: Yup.string().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'balance') {
					return true;
				}
				return false;
			},
			then: Yup.string().required('Wagering Type Required').nullable(),
		}),
		depositBonusPercent: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType === 'deposit' || bonusType === 'balance') {
					return true;
				}
				return false;
			},
			then: Yup.number()
				.min(1, '% Must be greater than or equal to 1')
				.typeError('Bonus Percent must be a Number')
				.required('Bonus Percentage Required')
				.nullable(),
		}),

		wageringMultiplier: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'balance') {
					return true;
				}
				return false;
			},
			then: Yup.number()
				.min(1, 'Minimum Value Must be One')
				.typeError('Only Numbers Allowed')
				.required('Wagering Multiplier Required'),
		}),

		daysToClear: Yup.number().when(['bonusType'], {
			is: (bonusType) => {
				if (bonusType !== 'promotion') {
					return true;
				}
				return false;
			},
			then: Yup.number()
				.min(1, 'Minimum Value Must be One')
				.typeError('Only Numbers Allowed')
				.integer('Only Integer Values Allowed')
				.required('Days To Clear Required'),
		}),
	}),
	Yup.object().shape({
		currency: Yup.object().when(
			['bonusType', 'isSticky'],
			(bonusType, isSticky) => {
				if (bonusType !== 'balance') {
					return currencyValidate({ curr, bonusType, isSticky });
				}
				return false;
			}
		),
	}),
	Yup.object().shape({}),
	Yup.object().shape({
		wageringTemplateId: Yup.string()
			.required('Please Select Wagering Template')
			.nullable(),
	}),
	Yup.object().shape({}),
	Yup.object().shape({
		loyaltyLevel: Yup.array().of(
			Yup.object().shape({
				bonusPercentage: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Value Required.')
					.min(0, 'Must be Greater Than 0')
					.max(9999, 'Must be Less Than 9999'),
				cashback_multiplier: Yup.number()
					.typeError('Only Numbers Allowed')
					.required('Value Required.')
					.min(0, 'Must be Greater Than 0')
					.max(9999, 'Must be Less Than 9999'),
				maxBonusThreshold: Yup.number()
					.typeError('Only Numbers Allowed')
					.positive('Value Must be Positive')
					.required('Value Required.'),
				maxWinAmount: Yup.number()
					.typeError('Only Numbers Allowed')
					.positive('Value Must be Positive')
					.required('Required.'),
			})
		),
	}),
];

export { bonusSchema, currencyValidate, generalFormSchema };
