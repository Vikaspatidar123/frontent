/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Row } from 'reactstrap';
import TableContainer from '../../../components/Common/Table';
// import { getTournamentTransactionStart } from '../../../store/actions';

const KeyValueCell = ({ value }) => value || 0;

const Transactions = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const { tournamentTransactions } = useSelector((state) => state.Tournament);

	// useEffect(() => {
	// 	if (tournamentDetail?.casinoTournamentId)
	// 		dispatch(
	// 			getTournamentTransactionStart({
	// 				limit: itemsPerPage,
	// 				pageNo: currentPage,
	// 				tournamentId: tournamentDetail?.casinoTournamentId,
	// 			})
	// 		);
	// }, [itemsPerPage, currentPage, tournamentDetail?.casinoTournamentId]);

	const formattedTransactions = useMemo(() => {
		if (tournamentTransactions?.rows?.length > 0) {
			return tournamentTransactions?.rows?.map((info) => ({
				...info,
				userName: info?.User?.username,
				amount: `€ ${info?.amount}`,
				fullName: `${info?.User?.firstName} ${info?.User?.lastName}`,
				createdAt: moment(info?.createdAt).format('YYYY-MM-DD hh:mm A'),
				gameName: info?.CasinoGame?.name,
			}));
		}
		return [];
	}, [tournamentTransactions]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'TRANSACTION ID',
				accessor: 'transactionId',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'USERNAME',
				accessor: 'userName',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'FULL NAME',
				accessor: 'fullName',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'GAME NAME',
				accessor: 'gameName',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'AMOUNT',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'ACTION TYPE',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value || 0} />,
			},
			{
				Header: 'DATE',
				accessor: 'createdAt',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value || 0} />,
			},
		],
		[]
	);

	return (
		<Row lg={12}>
			<TableContainer
				columns={columns || []}
				data={formattedTransactions || []}
				isPagination
				customPageSize={itemsPerPage}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={tournamentTransactions?.count || 1}
				isManualPagination
				onChangePagination={setCurrentPage}
				currentPage={currentPage}
				changeRowsPerPageCallback={onChangeRowsPerPage}
				tableClass="table-striped table-hover "
			/>
		</Row>
	);
};

export default Transactions;
