import * as Yup from 'yup';
import { GAME_ORDER_BY } from '../DashboardView/constant';

const TABS_TYPE = [
	{ label: 'Game', value: 'game' },
	{ label: 'Provider', value: 'provider' },
];

const staticFiltersFields = () => [
	{
		name: 'orderBy',
		fieldType: 'select',
		label: '',
		placeholder: 'Order By',
		optionList: GAME_ORDER_BY.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	{
		name: 'tab',
		fieldType: 'select',
		label: '',
		placeholder: 'Report of',
		optionList: TABS_TYPE.map(({ value, label }) => ({
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
	tab: 'game',
	currencyId: null,
	orderBy: null,
});

const filterValidationSchema = () =>
	Yup.object({
		tab: Yup.string().nullable(),
		currencyId: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
