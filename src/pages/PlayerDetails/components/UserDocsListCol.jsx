const statusMapper = (value) => {
	switch (value) {
		case 0:
			return 'Pending';
		case 1:
			return 'Approved';
		case 4:
			return 'Re-requested';
		default:
			return 'Rejected';
	}
};

const Id = (cell) => (cell.value ? cell.value : '');
const Name = (cell) => (cell.value ? cell.value : '');
const DocumentPreview = (cell) => (cell.value ? cell.value : '');
const Reason = (cell) => (cell.value ? cell.value : 'NA');
const UpdatedAt = (cell) => (cell.value ? cell.value : '');
const Actionee = (cell) => (cell.value ? cell.value : 'NA');
const ActionAt = (cell) => (cell.value ? cell.value : 'NA');
const Status = (cell) => (cell.value ? statusMapper(cell.value) : 'NA');
const Action = (cell) => (cell.value ? statusMapper(cell.value) : 'NA');

export {
	Id,
	Name,
	DocumentPreview,
	Reason,
	UpdatedAt,
	Actionee,
	ActionAt,
	Status,
	Action,
};
