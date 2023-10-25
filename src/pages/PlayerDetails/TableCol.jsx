/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
const KeyValueCell = (cell) => (cell.value ? cell.value : '');
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
};
