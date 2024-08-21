import * as Yup from 'yup';
import { IS_ACTIVE_TYPES } from '../CasinoTransactionsList/constants';

// CMS Filter
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
];

const filterValues = () => ({
	isActive: null,
	searchString: '',
});

const filterValidationSchema = () => Yup.object();

export { staticFiltersFields, filterValues, filterValidationSchema };
