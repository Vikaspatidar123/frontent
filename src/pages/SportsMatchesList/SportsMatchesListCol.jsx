const Id = (cell) => (cell.value ? cell.value : '');

const Title = (cell) => (cell.value ? cell.value : '');

const Tournament = (cell) => (cell.value ? cell.value : '-');

const Sport = (cell) => (cell.value ? cell.value : '');

// const IsFeatured = (cell) => (
//   <ReactSwitch
//     uncheckedIcon={<Offsymbol />}
//     checkedIcon={<OnSymbol />}
//     className="me-1 mb-sm-8 mb-2"
//     onColor="#626ed4"
//     checked={cell.value}
//   />);

const IsFeatured = (cell) => (cell.value ? 'YES' : 'NO');

const StartDate = (cell) => (cell.value ? cell.value : '');

const Status = (cell) => (cell.value ? cell.value : '');

const Live = (cell) => (cell.value ? 'YES' : 'NO');

export { Id, Title, Tournament, Sport, IsFeatured, StartDate, Status, Live };
