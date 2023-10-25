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

const Status = (cell) => (cell.value ? cell.value : '');

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
