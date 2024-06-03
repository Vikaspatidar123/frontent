const KeyValueData = ({ value, defaultCurrency }) =>
	defaultCurrency ? `${defaultCurrency.symbol} ${value}` : value;

const Username = ({ value }) => value || '-';

export { KeyValueData, Username };
