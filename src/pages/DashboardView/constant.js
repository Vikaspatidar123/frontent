import moment from 'moment';

/* eslint-disable import/prefer-default-export */
export const dateConstants = [
	{ label: 'Today', value: 'today' },
	{ label: 'Yesterday', value: 'yesterday' },
	{ label: 'Last 7 Days', value: 'last7days' },
	{ label: 'Last 30 Days', value: 'last30days' },
	{ label: 'Last 90 Days', value: 'last90days' },
	{ label: 'Custom', value: 'custom' },
];

export const TABS = {
	GAME: 'game',
	PROVIDER: 'provider',
	SPORT: 'sport',
	CASINO: 'casino',
	WITHDRAW: 'withdraw',
	DEPOSIT: 'deposit',
};

export const GAME_ORDER_BY = [
	{
		label: 'Top wagered ',
		value: 'totalBetAmount',
	},
	{
		label: 'Most played ',
		value: 'totalPlayers',
	},
	{
		label: 'Top payout ',
		value: 'totalWinAmount',
	},
];

export const topPlayerOrder = (activePerformance = TABS.CASINO) => [
	...(activePerformance === TABS.CASINO
		? [
				{
					label: 'Top Casino Wagerer ',
					value: 'total_casino_bet',
				},
		  ]
		: []),
	...(activePerformance === TABS.SPORT
		? [
				{
					label: 'Top SportsBook Wagerer',
					value: 'total_sb_bet',
				},
		  ]
		: []),
	...(activePerformance === 'all'
		? [
				{
					label: 'Top Casino Wagerer ',
					value: 'total_casino_bet',
				},
				{
					label: 'Top SportsBook Wagerer',
					value: 'total_sb_bet',
				},
		  ]
		: []),
	{
		label: 'Highest Profit Players',
		value: 'profit',
	},
	{
		label: 'Top Depositor',
		value: 'total_deposit',
	},
	{
		label: 'Top Withdrawer',
		value: 'total_withdraw',
	},
];

export const TOP_PLAYER_ORDER = topPlayerOrder('all');

export const KPI_SUMMARY_NAMES = [
	{
		label: 'Wagered Amount',
		value: 'betamount',
		isAmount: true,
	},
	{
		label: 'Payout Amount',
		value: 'winamount',
		isAmount: true,
	},
	{
		label: 'Payout Count',
		value: 'wincount',
	},
	{
		label: 'Wagered Count',
		value: 'betcount',
	},
];

export const TAB_COLORS = {
	primary: 'bg-primary-subtle',
	danger: 'bg-danger-subtle',
	success: 'bg-success-subtle',
	info: 'bg-info-subtle',
	warn: 'bg-warning-subtle',
};

export const INITIAL_FILTERS = {
	fromDate: new Date(moment().subtract(7, 'days')),
	toDate: new Date(),
	categories: [
		{ value: 'casino', label: 'Casino' },
		{ value: 'sportsbook', label: 'SportsBook' },
	],
};
