import * as Yup from 'yup';
import { GAME_ORDER_BY } from '../DashboardView/constant';

const TABS_TYPE = [
	{ label: 'Game', value: 'game' },
	{ label: 'Provider', value: 'provider' },
];

const staticFiltersFields = () => [
	{
		name: 'gameName',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by game name',
	},
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
	gameName: '',
	currencyId: null,
	orderBy: null,
	range: '',
});

const filterValidationSchema = () =>
	Yup.object({
		gameName: Yup.string().nullable(),
		tab: Yup.string().nullable(),
		currencyId: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		range: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
