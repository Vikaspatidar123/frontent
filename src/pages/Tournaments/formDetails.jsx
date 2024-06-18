/* eslint-disable no-unused-vars */

import React from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import imageDimensionCheck from '../../utils/imageDimensionCheck';
import { IS_ACTIVE_TYPES } from '../CasinoTransactionsList/constants';
import { TOURNAMENT_STATUS } from './constants';

const tournamentPrizeTypeOptionsList = [
	{
		optionLabel: 'Cash',
		value: 'cash',
	},
	{
		optionLabel: 'Non Cash',
		value: 'non_cash',
	},
];

const generalStepInitialValues = (tournamentDetail, allCurrencies) => {
	let currencyDetails = {};
	if (tournamentDetail?.tournamentCurrencies?.length) {
		currencyDetails = allCurrencies?.reduce((acc, { code, id }) => {
			const details = tournamentDetail?.tournamentCurrencies?.find(
				({ currencyId }) => currencyId === id
			);
			return {
				...acc,
				[code]: {
					entryFees: details?.entryFees || null,
					currencyId: details?.currencyId || id,
					rebuyLimit: details?.rebuyLimit || null,
					rebuyFees: details?.rebuyFees || null,
					poolPrize: details?.poolPrize || null,
					maxPlayerLimit: details?.maxPlayerLimit || null,
					minPlayerLimit: details?.minPlayerLimit || null,
					numberOfWinners: details?.tournamentPrizes?.length || null,
					tournamentPrizeType: details?.tournamentPrizes?.[0]?.type || 'cash',
					prizeSettlementMethod: 'amount',
					remainingAmount:
						details?.tournamentPrizes?.reduce(
							(accu, { amount = 0 }) => accu - Number(amount),
							details?.poolPrize
						) || 0,
					prizes:
						details?.tournamentPrizes?.reduce(
							(accu, { rank, type, id: prizeId, amount, item }) => ({
								...accu,
								[rank]: {
									id: prizeId,
									rank,
									type,
									value: type === 'cash' ? amount : item,
								},
							}),
							{}
						) || {},
				},
			};
		}, {});
	} else {
		currencyDetails = allCurrencies?.reduce(
			(acc, { code, id }) => ({
				...acc,
				[code]: {
					entryFees: null,
					currencyId: id,
					rebuyLimit: null,
					rebuyFees: null,
					poolPrize: null,
					maxPlayerLimit: null,
					minPlayerLimit: null,
					numberOfWinners: null,
					tournamentPrizeType: 'cash',
					prizeSettlementMethod: 'amount',
					remainingAmount: 0,
					prizes: {},
				},
			}),
			{}
		);
	}

	return {
		tournamentType: 'tournament',
		creditPoints: tournamentDetail?.creditPoints || '',
		rebuyLimit: tournamentDetail?.rebuyLimit || '',
		name: tournamentDetail?.name || {},
		description: tournamentDetail?.description || {},
		image: tournamentDetail?.image || '',
		startDate: tournamentDetail?.startDate
			? new Date(tournamentDetail?.startDate)
			: null,
		endDate: tournamentDetail?.endDate
			? new Date(tournamentDetail?.endDate)
			: null,
		isActive: tournamentDetail?.isActive || true,
		registrationEndDate: tournamentDetail?.registrationEndDate
			? new Date(tournamentDetail?.registrationEndDate)
			: null,

		currencyDetails,
	};
};

const generalFormSchema = () =>
	Yup.object({
		name: Yup.object().shape({
			EN: Yup.string().required('Name is required!'),
		}),
		description: Yup.object().shape({
			EN: Yup.string().required('Description is required!'),
		}),
		creditPoints: Yup.number().required('Credit Points Required'),
		startDate: Yup.date().required('Start Date Required'),
		endDate: Yup.date()
			.required('End Date Required')
			.min(
				Yup.ref('startDate'),
				'End date/time cannot be earlier than start date'
			),
		registrationEndDate: Yup.date()
			.required('Registration End Date required')
			.min(
				Yup.ref('startDate'),
				'Registration End date/time cannot be earlier than start date'
			)
			.max(
				Yup.ref('endDate'),
				'Registration End date/time cannot be after tournament end date'
			),
		image: Yup.mixed()
			.required('Image Required')
			// .imageDimensionCheck('Image Required', {
			// 	exactWidth: 442,
			// 	exactHeight: 240,
			// })
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

// const prizesValidation = Yup.object().when(
// 	['numberOfWinners', 'poolPrize'],
// 	([numberOfWinners, poolPrize], schema) => {
// 		const winnerSchema = {};

// 		for (let i = 1; i <= numberOfWinners; i += 1) {
// 			winnerSchema[i] = {
// 				value: Yup.number()
// 					.required('Prize Required')
// 					.test({
// 						name: 'exceedsPrevious',
// 						exclusive: true,
// 						message:
// 							'Prize must be smaller than or equals to the previous winner.',
// 						test(value, context) {
// 							// if (
// 							// 	tournamentPrizeType === 'non_cash'
// 							// )
// 							// 	return true;

// 							const previousWinnerValue = context.parent[i - 1];
// 							if (i > 1 && value > previousWinnerValue) {
// 								return false;
// 							}
// 							return true;
// 						},
// 					})
// 					.test({
// 						name: 'totalPrizeAmount',
// 						exclusive: true,
// 						message: 'Total prize amount exceeds the limit',
// 						test() {
// 							// const totalPrizeAmount = prizes.reduce((acc, curr) => acc+Number(curr || 0), 0);
// 							// if (
// 							// 	tournamentPrizeType === 'non_cash'
// 							// )
// 							// 	return true;

// 							// if (totalPrizeAmount > poolPrize) {
// 							// 	return false;
// 							// }
// 							return true;
// 						},
// 					}),
// 			};
// 		}
// 		return schema.shape(winnerSchema);
// 	}
// );

const currencyValidate = (allCurrencies) => {
	const currencySchema = {};
	// eslint-disable-next-line no-restricted-syntax, guard-for-in
	for (const { code } of allCurrencies) {
		currencySchema[code] = Yup.object().shape({
			entryFees: Yup.number()
				.min(1, 'Amount should be greater than 1')
				.required('Entry fees required'),

			rebuyLimit: Yup.number()
				.min(1, 'Amount should be greater than 1')
				.required('Rebuy limit required'),
			rebuyFees: Yup.number()
				.min(1, 'Amount should be greater than 1')
				.required('Rebuy fees required'),

			minPlayerLimit: Yup.number()
				.required('Minimum Participants Limit Required.')
				.test(
					'greaterThanMaximumParticipants',
					'Minimum participants limit should be smaller than Maximum Participants Limit',
					(value) => value > 0
				),
			maxPlayerLimit: Yup.number()
				.required('Maximum Participants Limit Required.')
				.test(
					'greaterThanMaximumParticipants',
					'Maximum participants limit should be greater than Minimum Participants Limit',
					function (value) {
						const { minPlayerLimit } = this.parent || {};

						if (value <= minPlayerLimit) return false;
						return value > 0;
					}
				),
			poolPrize: Yup.number()
				.required('Pool prize required')
				.min(1, 'Amount should be greater than 1'),

			numberOfWinners: Yup.number()
				.required('Winners required')
				.min(1, 'Winners should be greater than 1'),

			// prizes: prizesValidation,
		});
	}
	return Yup.object(currencySchema);
};

const staticFormFields = () => [
	{
		name: 'startDate',
		fieldType: 'datePicker',
		label: 'Start Date',
		placeholder: 'Select Start Date',
		mandatory: true,
		minDate: new Date(),
		maxDate: '',
		required: true,
	},
	{
		name: 'endDate',
		fieldType: 'datePicker',
		label: 'End Date',
		placeholder: 'Select End Date',
		timeIntervals: 5,
		mandatory: true,
		isComparison: 'startDate',
		minTimeField: 'startDate',
		maxDate: '',
	},
	{
		name: 'registrationEndDate',
		fieldType: 'datePicker',
		label: 'Registration End Date',
		placeholder: 'Select End Date',
		mandatory: true,
		timeIntervals: 5,
		isComparison: 'startDate',
		minTimeField: 'startDate',
		maxDate: '',
	},

	{
		name: 'creditPoints',
		fieldType: 'textField',
		label: 'Credit points',
		placeholder: 'Example: 200',
		type: 'number',
	},
	{
		name: 'image',
		fieldType: 'file',
		label: 'Image',
		placeholder: 'Enter Image',
		showThumbnail: true,
		customThumbnailBackground: '#1A1D29',
		customPadding: '8px',
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Is Active',
		isNewRow: true,
		switchSizeClass: 'form-switch-md',
		tooltipContent: 'Show in Tournaments',
		tooltipPlacement: 'left',
	},
];

const currencyFields = () => [
	{
		name: 'entryFees',
		label: 'Entry Fees Amount',
		fieldType: 'textField',
		placeholder: 'Example: 100',
		type: 'number',
	},
	{
		name: 'poolPrize',
		fieldType: 'textField',
		label: 'Pool Prize',
		placeholder: 'Example: 200',
		type: 'number',
	},
	{
		name: 'rebuyLimit',
		fieldType: 'textField',
		type: 'number',
		minimum: 1,
		maximum: 10,
		label: 'Rebuy Limit',
		placeholder: 'Example: 5',
	},
	{
		name: 'rebuyFees',
		fieldType: 'textField',
		label: 'Rebuy Fees',
		placeholder: 'Example: 200',
		type: 'number',
	},
	{
		name: 'minPlayerLimit',
		fieldType: 'textField',
		type: 'number',
		label: 'Min Participants Limit',
		placeholder: 'Example: 5',
	},
	{
		name: 'maxPlayerLimit',
		fieldType: 'textField',
		type: 'number',
		label: 'Max Participants Limit',
		placeholder: 'Example: 50',
	},
	{
		name: 'numberOfWinners',
		fieldType: 'textField',
		type: 'number',
		label: 'Number of Winners',
		placeholder: 'Example: 3',
	},
];

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		label: '',
		placeholder: 'Search by tournament name',
	},
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Select Tournament Status',
		optionList: Object.keys(TOURNAMENT_STATUS)?.map((key) => ({
			id: key,
			optionLabel: TOURNAMENT_STATUS?.[key]?.title,
			value: key,
		})),
	},
	// {
	// 	name: 'ranges',
	// 	fieldType: 'dateRangeSelector',
	// 	label: '',
	// 	placeholder: 'Date Range',
	// 	maxDate: moment().add(100, 'months').utc().toDate(),
	// },
];

const filterValues = () => ({
	search: '',
	isRegistrationClosed: null,
	startDate: null,
	endDate: null,
	status: null,
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		isRegistrationClosed: Yup.bool().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		status: Yup.string().nullable(),
	});

const detailList = [
	{
		label: 'Tournament Name',
		value: 'name',
	},
	{
		label: 'Tournament Id',
		value: 'id',
	},
	{
		label: 'Entry Fees',
		value: 'entryFees',
	},
	{
		label: 'Registration End',
		value: 'registrationEndDate',
	},
	{
		label: 'Re-Buy Fees',
		value: 'rebuyFees',
	},
	{
		label: 'Re-Buy Limit',
		value: 'rebuyLimit',
	},
	{
		label: 'Minimum Player Limit',
		value: 'minPlayerLimit',
	},
	{
		label: 'Maximum Player Limit',
		value: 'maxPlayerLimit',
	},
	{
		label: 'Tournament Prize Type',
		value: 'tournamentPrizeType',
	},
];

const staticGameFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name',
	},
	{
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: IS_ACTIVE_TYPES?.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
	},
	{
		name: 'isFeatured',
		fieldType: 'select',
		label: '',
		placeholder: 'Is Featured',
		optionList: [
			{
				id: 1,
				optionLabel: 'Yes',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'No',
				value: false,
			},
		],
	},
];

const gameFilterValues = () => ({
	isActive: null,
	searchString: '',
	casinoCategoryId: null,
	casinoProviderId: null,
});

const gameFilterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
		casinoCategoryId: Yup.string().nullable(),
		casinoProviderId: Yup.string().nullable(),
	});

export {
	generalStepInitialValues,
	staticFormFields,
	generalFormSchema,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	detailList,
	gameFilterValidationSchema,
	staticGameFiltersFields,
	gameFilterValues,
	currencyValidate,
	currencyFields,
};
