/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
const KeyValueCell = (cell) => (cell.value ? cell.value : '');
const KeyValueCellNA = (cell) => (cell.value ? cell.value : 'NA');
const Id = (cell) => (cell.value ? cell.value : '');
const Email = (cell) => (cell.value ? cell.value : '');
const ActionTypes = (cell) => (cell.value ? cell.value : '');

const GameName = (cell) => (cell.value ? cell.value : '-');

const Amount = (cell) =>
	cell.value ? (
		<div className={cell.value.includes('-') ? 'text-danger' : 'text-success'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const BonusMoney = (cell) =>
	cell.value ? (
		<div className={cell.value.includes('-') ? 'text-danger' : 'text-success'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const Status = (cell) => {
	const status = cell.value;
	if (status === 0) {
		return <td>Pending</td>;
	}
	if (status === 1) {
		return <td>Approved</td>;
	}
	if (status === 4) {
		return <td>Re-Requested</td>;
	}
	return <td>Rejected</td>;
};

const CreatedAt = (cell) => (cell.value ? cell.value : '');

const NonCashAmount = (cell) =>
	cell.value ? (
		<div className={cell.value >= 0 ? 'text-success' : 'text-danger'}>
			{cell.value}
		</div>
	) : (
		'-'
	);

const CurrencyCode = (cell) => (cell.value ? cell.value : '');

const PromotionTitle = (cell) => (cell.value ? cell.value : '');

const Action = (cell) => (cell.value ? cell.value : '');

const Comment = (cell) =>
	cell.value ? <div className="comment-term-text">{cell.value}</div> : '';

export {
	KeyValueCell,
	Id,
	Email,
	GameName,
	ActionTypes,
	Amount,
	BonusMoney,
	Status,
	CreatedAt,
	NonCashAmount,
	CurrencyCode,
	PromotionTitle,
	Action,
	Comment,
	KeyValueCellNA,
};
