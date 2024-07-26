import * as Yup from 'yup';
import { PAYMENT_PROVIDER_CATEGORY } from './constants';

// Filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name',
	},
];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

const generaFromFields = [
	{
		name: 'name',
		fieldType: 'textField',
		type: 'text',
		label: 'Provider Name',
		isRequired: true,
		placeholder: 'Provider Name',
	},
	{
		name: 'aggregator',
		fieldType: 'textField',
		type: 'text',
		label: 'Aggregator',
		isRequired: true,
		placeholder: 'Aggregator',
	},
	{
		name: 'category',
		fieldType: 'select',
		label: 'Category',
		isRequired: true,
		placeholder: 'Category',
		optionList: PAYMENT_PROVIDER_CATEGORY.map(({ id, label, value }) => ({
			id,
			optionLabel: label,
			value,
		})),
	},
	// {
	// 	name: 'displayName',
	// 	fieldType: 'textField',
	// 	type: 'text',
	// 	label: 'Title',
	// 	isRequired: true,
	// 	placeholder: 'Title',
	// },
	{
		name: 'description',
		fieldType: 'textField',
		type: 'text',
		label: 'Description',
		isRequired: true,
		placeholder: 'Description',
	},
	{
		name: 'depositAllowed',
		fieldType: 'toggle',
		label: 'Deposit Allowed',
		isNewRow: true,
		tooltipContent: 'If True Status is Deposit will be Active else Inactive',
	},
	{
		name: 'withdrawAllowed',
		fieldType: 'toggle',
		label: 'Withdraw Allowed',
		isNewRow: false,
		tooltipContent: 'If True Status is Withdraw will be Active else Inactive',
	},
	{
		name: 'image',
		fieldType: 'file',
		type: '',
		label: 'Payment Provider Image',
		placeholder: 'Select payment provider image',
		isNewRow: true,
		showThumbnail: true,
	},
	// {
	// 	name: 'depositImage',
	// 	fieldType: 'file',
	// 	type: '',
	// 	label: 'Deposit Image',
	// 	placeholder: 'Select deposit image',
	// 	isNewRow: true,
	// 	showThumbnail: true,
	// },
	// {
	// 	name: 'withdrawImage',
	// 	fieldType: 'file',
	// 	type: '',
	// 	label: 'Withdraw Image',
	// 	placeholder: 'Select withdraw image',
	// 	isNewRow: false,
	// 	showThumbnail: true,
	// },
];

const leftStaticFormFields = [
	{
		name: 'name',
		fieldType: 'textField',
		type: 'text',
		label: 'Provider Name',
		isRequired: true,
		placeholder: 'Provider Name',
	},
];

const rightStaticFormFields = [
	{
		name: 'icon',
		fieldType: 'file',
		type: '',
		label: 'Payment Provider icon',
		placeholder: 'Upload payment provider icon',
		isNewRow: true,
		showThumbnail: true,
	},
];

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name?.EN || '',
	icon: defaultValue?.icon || '',
});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generaFromFields,
	getInitialValues,
	leftStaticFormFields,
	rightStaticFormFields,
};
