/* eslint-disable no-unused-vars */

import React from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import imageDimensionCheck from '../../utils/imageDimensionCheck';

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

// const tournamentPeriodOptionsList = [
// 	{
// 		id: 1,
// 		optionLabel: 'One time',
// 		value: 'oneTime',
// 	},
// 	{
// 		id: 2,
// 		optionLabel: 'Weekly',
// 		value: 'weekly',
// 	},
// 	{
// 		id: 3,
// 		optionLabel: 'Monthly',
// 		value: 'monthly',
// 	},
// 	{
// 		id: 4,
// 		optionLabel: 'Daily',
// 		value: 'daily',
// 	},
// ];

// const playerLimitOptions = [
// 	{
// 		id: 1,
// 		optionLabel: 'All',
// 		value: 'null',
// 	},
// 	{
// 		id: 2,
// 		optionLabel: 'Custom',
// 		value: 'custom',
// 	},
// ];

const generalStepInitialValues = (tournamentDetail) => ({
	tournamentType: 'tournament',
	name: tournamentDetail?.name?.EN || '',
	description: tournamentDetail?.description?.EN || '',
	image: tournamentDetail?.image || '',
	startDate: tournamentDetail?.startDate
		? new Date(tournamentDetail?.startDate)
		: null,
	endDate: tournamentDetail?.endDate
		? new Date(tournamentDetail?.endDate)
		: null,
	entryFees: tournamentDetail?.entryFees || '',
	rebuyFees: tournamentDetail?.rebuyFees || 0,
	rebuyLimit: tournamentDetail?.rebuyLimit || 0,
	minimumPlayerLimit: tournamentDetail?.minimumPlayerLimit || '',
	playerLimit: tournamentDetail?.playerLimit || '',
	isActive: tournamentDetail?.isActive || true,
	rebuyOption: tournamentDetail?.rebuyLimit > 0,
	registrationEndDate: tournamentDetail?.registrationEndDate
		? new Date(tournamentDetail?.registrationEndDate)
		: null,
});

const generalFormSchema = () =>
	Yup.object({
		name: Yup.string().required('Name Required'),
		description: Yup.string().required('Description Required'),
		rebuyOption: Yup.boolean(),
		poolPrize: Yup.number().required('Pool Prize Required'),
		creditPoints: Yup.number().required('Credit Points Required'),
		rebuyFees: Yup.number()
			.test('isRebuyTrue', 'Rebuy Fees is required', function (value) {
				const { rebuyOption } = this.parent || {};
				if (!rebuyOption) return true;
				return value > 0;
			})
			.test('valid-number', 'Number must be between 0 and 99999', (value) => {
				if (!value) return true; // Allow empty value
				const numberValue = parseInt(value, 10);
				return numberValue >= 0 && numberValue <= 99999;
			}),
		rebuyLimit: Yup.number()
			.test(
				'isRebuyTrue',
				'Rebuy limit is required and cannot be smaller than 0',
				function (value) {
					const { rebuyOption } = this.parent || {};
					if (!rebuyOption) return true;
					return value > 0;
				}
			)
			.test('maxDigits', 'Number must be less than or equal to 10', (value) => {
				if (value > 0) {
					const numberValue = parseInt(value, 10);
					return numberValue <= 10;
				}
				return true; // Allow empty value
			}),
		entryFees: Yup.number()
			.required('Entry Fees Required')
			.test('valid-number', 'Number must be between 1 and 99999', (value) => {
				const numberValue = Number(value);
				return numberValue >= 0.01 && numberValue <= 99999;
			}),
		minPlayerLimit: Yup.number()
			.required('Minimum Participants Limit Required.')
			.test(
				'greaterThanMaximumParticipants',
				'Minimum participants limit should be smaller than Maximum Participants Limit',
				(value) => value > 0
			),
		maxPlayerLimit: Yup.number().test(
			'greaterThanMaximumParticipants',
			'Maximum participants limit should be greater than Minimum Participants Limit',
			function (value) {
				const { minimumPlayerLimit } = this.parent || {};

				if (value <= minimumPlayerLimit) return false;
				return value > 0;
			}
		),
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

const staticFormFields = () => [
	{
		name: 'entryFees',
		fieldType: 'password',
		label: 'Entry Fees Amount',
		placeholder: 'Enter Fees Amount',
		type: 'number',
		maximumCharacters: 5,
		minimum: 1,
		maximum: 99999,
		icon: <i className="bx bx-dollar font-size-18" />,
		required: true,
	},
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
		name: 'poolPrize',
		fieldType: 'textField',
		label: 'Pool Prize',
		placeholder: 'Example: 100',
		type: 'number',
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
		name: 'minPlayerLimit',
		fieldType: 'textField',
		type: 'number',
		label: 'Minimum Participants Limit',
		placeholder: 'Example: 5',
	},
	{
		name: 'maxPlayerLimit',
		fieldType: 'textField',
		type: 'number',
		label: 'Maximum Participants Limit',
		placeholder: 'Example: 50',
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Visibility',
		isNewRow: true,
		switchSizeClass: 'form-switch-md',
		tooltipContent: 'Show in Tournaments',
		tooltipPlacement: 'left',
	},
	{
		name: 'rebuyOption',
		fieldType: 'toggle',
		label: 'Rebuy Option',
		switchSizeClass: 'form-switch-md',
		fieldColOptions: { lg: 2 },
	},
	{
		name: 'rebuyFees',
		fieldType: 'password',
		label: 'Rebuy Fees Amount',
		placeholder: 'Enter Fees Amount',
		type: 'number',
		isNewRow: true,
		icon: <i className="bx bx-dollar font-size-18" />,
		isHidable: (values) => !values.rebuyOption,
	},
	{
		name: 'rebuyLimit',
		fieldType: 'textField',
		type: 'number',
		minimum: 1,
		maximum: 10,
		label: 'Rebuy Limit',
		placeholder: 'Enter Rebuy Limit',
		isHidable: (values) => !values.rebuyOption,
	},
];

const prizeDistributionInitialValues = (tournamentDetail) => ({
	numberOfWinners:
		Object.keys(tournamentDetail?.CasinoTournamentPrizes || {})?.length || '',
	tournamentPrizeType: tournamentDetail?.tournamentPrizeType || null,
	totalPrizeCount: 0,
	prizes: (tournamentDetail?.CasinoTournamentPrizes || []).reduce(
		(prizes, winner) => ({
			...prizes,
			[winner?.rank]: winner?.type === 'cash' ? winner?.amount : winner?.item,
		}),
		{}
	),
});

const prizeDistributionFormSchema = (prize) =>
	Yup.object({
		numberOfWinners: Yup.number()
			.min(1, 'Value must not be smaller than 1')
			.required('Numbers of Winners Required'),
		tournamentPrizeType: Yup.string().required('Prize type Required'),
		prizes: Yup.object().when(
			['numberOfWinners', 'tournamentPrizeType', 'totalPrizeCount'],
			([numberOfWinners, tournamentPrizeType, totalPrizeCount], schema) => {
				const winnerSchema = {};
				for (let i = 1; i <= numberOfWinners; i += 1) {
					winnerSchema[i] = Yup.mixed()
						.required('Prize Required')
						.test({
							name: 'priceRequired',
							test(value) {
								if (!(value > 0)) {
									return false;
								}
								return true;
							},
						})
						.test({
							name: 'exceedsPrevious',
							exclusive: true,
							message:
								'Prize must be smaller than or equals to the previous winner.',
							test(value, context) {
								if (
									typeof value === 'string' ||
									tournamentPrizeType === 'non_cash'
								)
									return true;

								const previousWinnerValue = context.parent[i - 1];
								if (i > 1 && value > previousWinnerValue) {
									return false;
								}
								return true;
							},
						})
						.test({
							name: 'totalPrizeAmount',
							exclusive: true,
							message: 'Total prize amount exceeds the limit',
							test(value) {
								if (
									typeof value === 'string' ||
									tournamentPrizeType === 'non_cash'
								)
									return true;

								if (totalPrizeCount > prize) {
									return false;
								}
								return true;
							},
						});
				}
				return schema.shape(winnerSchema);
			}
		),
	});

const staticPrizeDistributionFormFields = () => [
	{
		name: 'tournamentPrizeType',
		fieldType: 'select',
		label: 'Tournament Prize Type',
		placeholder: 'Select prize type',
		optionList: tournamentPrizeTypeOptionsList,
		toggleGroupClass: 'mt-4 ps-2',
		fieldColOptions: { lg: 4 },
		required: true,
	},
	{
		name: 'numberOfWinners',
		fieldType: 'textField',
		type: 'number',
		minimum: 1,
		label: 'Number of Winners',
		placeholder: 'Enter Number of winners',
		fieldColOptions: { lg: 3 },
		required: true,
	},
];

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		label: '',
		placeholder: 'Search by tournament name',
	},
	// {
	// 	name: 'isRegistrationClosed',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Select Registration Status',
	// 	optionList: [
	// 		{
	// 			id: 1,
	// 			optionLabel: 'Yes',
	// 			value: true,
	// 		},
	// 		{
	// 			id: 2,
	// 			optionLabel: 'No',
	// 			value: false,
	// 		},
	// 	],
	// },
	{
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Select Tournament Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: 'active',
			},
			{
				id: 2,
				optionLabel: 'Inactive',
				value: 'inactive',
			},
			{
				id: 3,
				optionLabel: 'Cancelled',
				value: 'cancelled',
			},
			{
				id: 4,
				optionLabel: 'settled',
				value: 'settled',
			},
		],
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
		maxDate: moment().add(100, 'months').utc().toDate(),
	},
];

const filterValues = () => ({
	search: '',
	isRegistrationClosed: null,
	startDate: null,
	endDate: null,
});

const filterValidationSchema = () =>
	Yup.object({
		srarch: Yup.string().nullable(),
		isRegistrationClosed: Yup.bool().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
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

const staticGameFiltersFields = (tournamentProvider) => [
	{
		name: 'search',
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
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'In Active',
				value: false,
			},
		],
	},
	{
		name: 'providerId',
		fieldType: 'select',
		label: '',
		placeholder: 'Provider',
		optionList: [
			{
				optionLabel: 'AirDice',
				value: tournamentProvider?.airdice,
			},
			{
				optionLabel: 'GreenTube',
				value: tournamentProvider?.greentube,
			},
		],
	},
];

const gameFilterValues = () => ({
	isActive: null,
	search: '',
	casinoCategoryId: null,
	providerId: '1',
	gameCategoryId: null,
});

const gameFilterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
		casinoCategoryId: Yup.string().nullable(),
		providerId: Yup.string().nullable(),
		gameCategoryId: Yup.string().nullable(),
	});

export {
	generalStepInitialValues,
	staticFormFields,
	generalFormSchema,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	prizeDistributionFormSchema,
	prizeDistributionInitialValues,
	staticPrizeDistributionFormFields,
	// playerLimitOptions,
	detailList,
	gameFilterValidationSchema,
	staticGameFiltersFields,
	gameFilterValues,
};
