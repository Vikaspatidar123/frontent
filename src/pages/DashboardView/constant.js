/* eslint-disable import/prefer-default-export */
export const dateConstants = [
	{ label: 'Today', value: 'today' },
	{ label: 'Yesterday', value: 'yesterday' },
	// { label: 'Custom', value: 'custom' },
	{ label: 'Month To Date', value: 'monthtodate' },
	{ label: 'Last 7 Days', value: 'last7days' },
	{ label: 'Last 30 Days', value: 'last30days' },
	{ label: 'Last 90 Days', value: 'last90days' },
	{ label: 'Week To Date', value: 'weektodate' },
	{ label: 'Year To Date', value: 'yeartodate' },
	{ label: 'Previous Month', value: 'previousmonth' },
	{ label: 'Previous Year', value: 'previousyear' },
];

export const GAME_ORDER_BY = [
	{
		label: 'Top Wagered Games',
		value: 'totalBetAmount',
	},
	{
		label: 'Most Played Games',
		value: 'totalPlayers',
	},
	{
		label: 'Top Payout Games',
		value: 'totalWinAmount',
	},
];

export const TOP_PLAYER_ORDER = [
	{
		label: 'Top Casino Wagerer ',
		value: 'total_casino_bet',
	},
	{
		label: 'Top Depositor',
		value: 'total_deposit',
	},
	{
		label: 'Top SportsBook Wagerer',
		value: 'total_sb_bet',
	},
	{
		label: 'Top Withdrawer',
		value: 'total_withdraw',
	},
	{
		label: 'Highest Profit Players',
		value: 'profit',
	},
];

export const TABS = {
	GAME: 'game',
	PROVIDER: 'provider',
	SPORT: 'sport',
	CASINO: 'casino',
};
