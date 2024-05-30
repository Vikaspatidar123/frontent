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
		label: 'Total Players',
		value: 'totalPlayers',
	},
	{
		label: 'Total Bet Amount',
		value: 'totalBetAmount',
	},
	{
		label: 'Total Win Amount',
		value: 'totalWinAmount',
	},
];

export const TOP_PLAYER_ORDER = [
	{
		label: 'Total Casino Bet',
		value: 'total_casino_bet',
	},
	{
		label: 'Total Deposit',
		value: 'total_deposit',
	},
	{
		label: 'Total SB Bet',
		value: 'total_sb_bet',
	},
	{
		label: 'Total Withdraw',
		value: 'total_withdraw',
	},
	{
		label: 'Profit',
		value: 'profit',
	},
];

export const TABS = {
	GAME: 'game',
	PROVIDER: 'provider',
	SPORT: 'sport',
	CASINO: 'casino',
};
