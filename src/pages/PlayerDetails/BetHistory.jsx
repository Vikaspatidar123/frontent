/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { KeyValueCell, Status } from './TableCol';
import { fetchCasinoTransactionsStart } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import Filters from '../../components/Common/Filters';
import useBetHistoryFilters from './hooks/useBetHistoryFilters';
import CrudSection from '../../components/Common/CrudSection';

const BetHistory = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions?.casinoTransactions?.map((txn) =>
				formattedValues.push({
					casinoTransactionId: txn?.transactionId,
					gameId: txn?.gameId,
					amount: txn?.ledger?.amount,
					currencyCode: txn?.wallet?.currency?.code,
					conversionRate: txn?.conversionRate,
					actionType: txn?.ledger?.type,
					purpose: txn?.ledger?.purpose,
					status: txn?.status,
					createdAt: getDateTime(txn?.createdAt),
				})
			);
		}
		return formattedValues;
	}, [casinoTransactions]);

	const exportComponent = useMemo(() => [
		{
			label: '',
			isDownload: true,
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			data: formattedCasinoTransactions,
		},
	]);

	useEffect(() => {
		dispatch(
			fetchCasinoTransactionsStart({
				perPage: itemsPerPage,
				page: currentPage,
				userId,
			})
		);
	}, [currentPage, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'Transaction Id',
				accessor: 'casinoTransactionId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Game Id',
				accessor: 'gameId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Conversion Rate',
				accessor: 'conversionRate',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
		],
		[]
	);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useBetHistoryFilters();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection
					buttonList={[]}
					exportComponent={exportComponent}
					title="Casino Bet History"
				/>
				<CardBody>
					<Filters
						validation={filterValidation}
						filterFields={filterFields}
						actionButtons={actionButtons}
						isAdvanceOpen={isAdvanceOpen}
						toggleAdvance={toggleAdvance}
						isFilterChanged={isFilterChanged}
					/>
					<TableContainer
						isLoading={isCasinoTransactionsLoading}
						columns={columns}
						data={formattedCasinoTransactions}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={casinoTransactions?.totalPages || 0}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export default BetHistory;
