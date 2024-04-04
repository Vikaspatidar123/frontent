/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import { Amount, CurrencyCode, KeyValueCell, Status } from './TableCol';
import { fetchCasinoTransactionsStart } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import Filters from '../../components/Common/Filters';
import useBetHistoryFilters from './hooks/useBetHistoryFilters';
import CrudSection from '../../components/Common/CrudSection';
import { LEDGER_TYPES, statusType } from './constants';

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
					id: txn?.id,
					walletId: txn?.walletId,
					casinoTransactionId: txn?.transactionId,
					casinoGame: txn?.casinoGame?.name,
					amount: txn?.ledger?.amount,
					currencyCode: txn?.wallet?.currency?.code,
					conversionRate: txn?.conversionRate,
					actionType: LEDGER_TYPES.find(
						(type) => type.value === txn?.ledger?.type
					)?.label,
					purpose: txn?.ledger?.purpose,
					status: statusType.find((status) => status.value === txn?.status)
						?.label,
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
				Header: 'Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'casinoTransactionId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Game Name',
				accessor: 'casinoGame',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Wallet Id',
				accessor: 'walletId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
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
