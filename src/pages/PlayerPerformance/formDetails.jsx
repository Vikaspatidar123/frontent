import * as Yup from 'yup';
import { TOP_PLAYER_ORDER } from '../DashboardView/constant';
import { defaultCurrencyId } from '../../constants/config';

const staticFiltersFields = () => [
	// {
	// 	name: 'searchString',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by username',
	// },
	{
		name: 'orderBy',
		fieldType: 'select',
		label: '',
		placeholder: 'Order By',
		optionList: TOP_PLAYER_ORDER.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];
// const fromDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
// const toDate = new Date(); // Do not define it inside filterValue function

const filterValues = () => ({
	searchString: '',
	currencyId: defaultCurrencyId,
	orderBy: null,
	range: '',
	dateOptions: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
		currencyId: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		range: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
