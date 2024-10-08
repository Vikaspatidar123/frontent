import * as Yup from 'yup';
import { selectedLanguage } from '../../constants/config';
import { IS_ACTIVE_TYPES } from '../CasinoTransactionsList/constants';

const getInitialValues = (defaultValue) => ({
	gameId: defaultValue?.id || '',
	name: defaultValue?.name?.[selectedLanguage] || '',
	gameCategoryId: defaultValue?.casinoCategoryId || null,
	casinoProviderId: defaultValue?.casinoProviderId || null,
	isActive: defaultValue?.isActive || false,
	file: defaultValue?.iconUrl || null,
});

const validationSchema = Yup.object().shape({
	// name: Yup.string().required('Game Name Required'),
	// casinoProviderId: Yup.string()
	// 	.required('Casino Provider Id Required')
	// 	.nullable(),
	file: Yup.mixed().when(
		'$isFilePresent',
		(isFilePresent, schema) =>
			isFilePresent &&
			schema.test(
				'FILE_SIZE',
				'Please select any file.',
				(value) => value && (typeof value === 'string' ? true : value.size > 0)
			)
	),
});

const staticFormFields = [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Game Name',
		isDisabled: true,
	},
	{
		name: 'file',
		fieldType: 'file',
		label: 'Thumbnail',
		showThumbnail: true,
	},
];

// Filters

const staticFiltersFields = () => [
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

const filterValues = () => ({
	isActive: null,
	searchString: '',
	casinoCategoryId: null,
	casinoProviderId: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchString: Yup.string().nullable(),
		casinoCategoryId: Yup.string().nullable(),
		casinoProviderId: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
