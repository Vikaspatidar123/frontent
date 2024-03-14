/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionTypes,
	Amount,
	BonusMoney,
	CreatedAt,
	Email,
	GameName,
	Id,
	Status,
} from './TableCol';
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
					casinoTransactionId: txn?.casinoTransactionId,
					userEmail: txn?.user?.email,
					gameIdentifier: txn?.gameIdentifier,
					actionType: txn?.actionType,
					amountWithCurr: `${txn?.amount} ${txn?.currencyCode}`,
					bonusAmt: `${txn?.nonCashAmount} ${txn?.currencyCode}`,
					statusText:
						txn?.status === 0
							? 'Pending'
							: txn?.status === 1
							? 'Completed'
							: txn?.status === 2
							? 'FAILED'
							: 'ROLLBACK',
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
				accessor: 'casinoTransactionId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'User Email',
				accessor: 'userEmail',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Game Name',
				accessor: 'gameIdentifier',
				filterable: true,
				Cell: ({ cell }) => <GameName value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <ActionTypes value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			{
				Header: 'Bonus Money',
				accessor: 'bonusAmt',
				Cell: ({ cell }) => <BonusMoney value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
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
						totalPageCount={formattedCasinoTransactions?.length || 0}
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
