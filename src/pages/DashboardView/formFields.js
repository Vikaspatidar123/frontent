import * as Yup from 'yup';
import { getItem } from '../../network/storageUtils';
import { STORAGE_KEY } from '../../components/Common/constants';

const DASH_REPORTS = {
	reportCards: 'reportCards',
	depositWithdraw: 'depositWithdraw',
	betsChart: 'betsChart',
	ggrReport: 'ggrReport',
	playerLogin: 'playerLogin',
	activePlayers: 'activePlayers',
	demographic: 'demographic',
	kpiSummary: 'kpiSummary',
	topGames: 'topGames',
	topPlayers: 'topPlayers',
	kpiReport: 'kpiReports',
};

const dashboardElements = (hide = ['none']) => [
	{
		name: DASH_REPORTS.reportCards,
		fieldType: 'switch',
		label: 'Widgets',
		isDisabled: hide.includes(DASH_REPORTS.reportCards),
	},
	{
		name: DASH_REPORTS.depositWithdraw,
		fieldType: 'switch',
		label: 'Deposit and Withdraw Chart',
		isDisabled: hide.includes(DASH_REPORTS.depositWithdraw),
	},
	{
		name: DASH_REPORTS.betsChart,
		fieldType: 'switch',
		label: 'Bets Chart',
		isDisabled: hide.includes(DASH_REPORTS.betsChart),
	},
	{
		name: DASH_REPORTS.ggrReport,
		fieldType: 'switch',
		label: 'GGR Report',
		isDisabled: hide.includes(DASH_REPORTS.ggrReport),
	},
	{
		name: DASH_REPORTS.playerLogin,
		fieldType: 'switch',
		label: 'Logged In Players',
		isDisabled: hide.includes(DASH_REPORTS.playerLogin),
	},
	{
		name: DASH_REPORTS.activePlayers,
		fieldType: 'switch',
		label: 'Active Players Chart',
		isDisabled: hide.includes(DASH_REPORTS.activePlayers),
	},
	{
		name: DASH_REPORTS.demographic,
		fieldType: 'switch',
		label: 'Demographic Report',
		isDisabled: hide.includes(DASH_REPORTS.demographic),
	},
	{
		name: DASH_REPORTS.kpiSummary,
		fieldType: 'switch',
		label: 'KPI Summary',
		isDisabled: hide.includes(DASH_REPORTS.kpiSummary),
	},
	{
		name: DASH_REPORTS.topGames,
		fieldType: 'switch',
		label: 'Top Games',
		isDisabled: hide.includes(DASH_REPORTS.topGames),
	},
	{
		name: DASH_REPORTS.topPlayers,
		fieldType: 'switch',
		label: 'Player Performance',
		isDisabled: hide.includes(DASH_REPORTS.topPlayers),
	},
	{
		name: DASH_REPORTS.kpiReport,
		fieldType: 'switch',
		label: 'KPI Reports',
		isDisabled: hide.includes(DASH_REPORTS.kpiReport),
	},
];

const initialElement = () => {
	let dashConfig = getItem(STORAGE_KEY.DASH_CONFIG);
	if (typeof dashConfig === 'string') {
		dashConfig = JSON.parse(dashConfig);
	}
	return {
		[DASH_REPORTS.reportCards]: dashConfig?.[DASH_REPORTS.reportCards] ?? true,
		[DASH_REPORTS.depositWithdraw]:
			dashConfig?.[DASH_REPORTS.depositWithdraw] ?? true,
		[DASH_REPORTS.betsChart]: dashConfig?.[DASH_REPORTS.betsChart] ?? true,
		[DASH_REPORTS.ggrReport]: dashConfig?.[DASH_REPORTS.ggrReport] ?? true,
		[DASH_REPORTS.playerLogin]: dashConfig?.[DASH_REPORTS.playerLogin] ?? true,
		[DASH_REPORTS.activePlayers]:
			dashConfig?.[DASH_REPORTS.activePlayers] ?? true,
		[DASH_REPORTS.demographic]: dashConfig?.[DASH_REPORTS.demographic] ?? true,
		[DASH_REPORTS.kpiSummary]: dashConfig?.[DASH_REPORTS.kpiSummary] ?? true,
		[DASH_REPORTS.topGames]: dashConfig?.[DASH_REPORTS.topGames] ?? true,
		[DASH_REPORTS.topPlayers]: dashConfig?.[DASH_REPORTS.topPlayers] ?? true,
		[DASH_REPORTS.kpiReport]: dashConfig?.[DASH_REPORTS.kpiReport] ?? true,
	};
};

const validationSchema = () => Yup.object({});

export { dashboardElements, initialElement, validationSchema, DASH_REPORTS };
