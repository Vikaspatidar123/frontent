/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionTypes,
	Amount,
	BonusMoney,
	CreatedAt,
	// Email,
	GameName,
	Id,
	Status,
} from './TableCol';
import { fetchCasinoTransactionsStart } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import { statusType } from '../CasinoTransactionsList/constants';
import Filters from '../../components/Common/Filters';
import useBetHistoryFilters from './hooks/useBetHistoryFilters';

const BetHistory = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions?.rows?.map((txn) =>
				formattedValues.push({
					...txn,
					userEmail: txn.User.email,
					amountWithCurr: `${txn.amount} ${txn.User.currencyCode}`,
					bonusAmt: `${txn.nonCashAmount} ${txn.User.currencyCode}`,
					createdAt: getDateTime(txn.createdAt),
					statusText: statusType?.[parseInt(txn.status, 10) + 1].label,
				})
			);
		}
		return formattedValues;
	}, [casinoTransactions]);

	useEffect(() => {
		dispatch(
			fetchCasinoTransactionsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
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
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			// {
			// 	Header: 'User Email',
			// 	accessor: 'userEmail',
			// 	filterable: true,
			// 	Cell: (cellProps) => <Email {...cellProps} />,
			// },
			{
				Header: 'Game Name',
				accessor: 'gameIdentifier',
				filterable: true,
				Cell: (cellProps) => <GameName {...cellProps} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: (cellProps) => <ActionTypes {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Bonus Money',
				accessor: 'bonusAmt',
				Cell: (cellProps) => <BonusMoney {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Created At',
				accessor: 'createdAt',
				Cell: (cellProps) => <CreatedAt {...cellProps} />,
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
		<Container fluid className="bg-white">
			<Card className="p-2">
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
						totalPageCount={casinoTransactions?.count}
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
