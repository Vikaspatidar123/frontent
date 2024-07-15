/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';
import { channelCriteria } from './constants';

const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title and description',
	},
];

const filterValues = () => ({
	isActive: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

const channelsList = channelCriteria.map((item) => ({
		name: item.name,
		fieldType: 'toggle',
		label: item.label,
		isNewRow: true,
	}));

const generalStaticFormFields = (isDisabled) => [
	{
		name: 'name',
		fieldType: 'textField',
		type: '',
		label: 'Channel Title',
		placeholder: 'Channel Title',
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Status',
		isNewRow: true,
		isDisabled,
		tooltipContent: 'If True Channel Status is Active else In-Active',
	},
	{
		name: 'isGlobal',
		fieldType: 'toggle',
		label: 'Global',
		isNewRow: true,
		isDisabled,
		tooltipContent: 'If True Channel is Global',
	},
	{
		name: 'description',
		fieldType: 'textField',
		type: '',
		label: 'Description',
		placeholder: 'Enter Description',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
	},
	...channelsList,
];

const generalStepInitialValues = ({ channelDetails }) => ({
	name: channelDetails?.name || '',
	isActive: channelDetails?.status || false,
	isGlobal: channelDetails?.isGlobal || false,
	description: channelDetails?.description || '',
	kycToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'KYC_CRITERIA'
		  ) !== -1
		: false,
	timeToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'TIME_CRITERIA'
		  ) !== -1
		: false,
	wageringToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'WAGERING_CRITERIA'
		  ) !== -1
		: false,
	tierToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
		  ) !== -1
		: false,

	timeValue: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'TIME_CRITERIA'
		  ) !== -1
			? channelDetails?.criteria?.find((item) => item?.key === 'TIME_CRITERIA')
					.value
			: ''
		: '',

	tierValue: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
		  ) !== -1
			? channelDetails?.criteria?.find(
					(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
			  ).value
			: ''
		: '',

	wageringValue: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'WAGERING_CRITERIA'
		  ) !== -1
			? channelDetails?.criteria?.find(
					(item) => item?.key === 'WAGERING_CRITERIA'
			  ).value
			: ''
		: '',
});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generalStaticFormFields,
	generalStepInitialValues,
};
