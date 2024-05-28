const ProviderName = ({ cell }) => cell;

const Ggr = ({ cell, defaultCurrency }) => `${defaultCurrency.symbol} ${cell}`;

const DeltaGgr = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell}`;

const RealBet = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell}`;

const RealWin = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell}`;

const BonusWin = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell}`;
const BonusGgr = ({ cell, defaultCurrency }) =>
	`${defaultCurrency.symbol} ${cell}`;
const TotalBets = ({ cell }) => cell;
const DeltaTotalBets = ({ cell }) => cell;

export {
	ProviderName,
	Ggr,
	DeltaGgr,
	RealBet,
	BonusWin,
	RealWin,
	BonusGgr,
	TotalBets,
	DeltaTotalBets,
};
