const IdValue = ({ cell }) => cell;

const Name = ({ cell }) => cell;

const NUMBEROFROUNDS = ({ cell }) => cell || 0;

const NumberPlayer = ({ cell }) => cell || 0;

const TotalBetsAmount = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell ?? 0}`;

const TotalWins = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell ?? 0}`;
const GameRevenue = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell ?? 0}`;
const Payout = ({ cell }) => `${cell ?? 0} %`;

export {
	IdValue,
	Name,
	NUMBEROFROUNDS,
	NumberPlayer,
	TotalBetsAmount,
	TotalWins,
	GameRevenue,
	Payout,
};
