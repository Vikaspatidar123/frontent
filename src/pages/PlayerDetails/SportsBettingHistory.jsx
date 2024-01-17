/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionTypes,
	Amount,
	CreatedAt,
	CurrencyCode,
	Email,
	// Email,
	Id,
	Purpose,
	StatusData,
} from './TableCol';
import { fetchSportsTransactionStart } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import Filters from '../../components/Common/Filters';
import useSportBetHistoryFilters from './hooks/useSportBetHistoryFilters';
import CrudSection from '../../components/Common/CrudSection';

const SportsBettingHistory = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const { sportsTransaction, loading: isSportsTransactionLoading } =
		useSelector((state) => state.SportsTransaction);

	useEffect(() => {
		dispatch(
			fetchSportsTransactionStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				email: '',
				userId,
			})
		);
	}, [currentPage, itemsPerPage]);

	const formattedSportsTransaction = useMemo(() => {
		const formattedValues = [];
		if (sportsTransaction) {
			sportsTransaction?.rows?.map((txn) =>
				formattedValues.push({
					...txn,
					email: txn?.user?.email,
					amount: txn?.amount,
					currencyCode: txn?.wallet?.currency?.code,
					createdAt: getDateTime(txn?.createdAt),
					status: txn?.transaction?.status,
				})
			);
		}
		return formattedValues;
	}, [sportsTransaction]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			// {
			// 	Header: 'Non Cash Amount',
			// 	accessor: 'nonCashAmount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <NonCashAmount value={cell.value} />,
			// },
			{
				Header: 'Currency Code',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'type',
				Cell: ({ cell }) => <ActionTypes value={cell.value} />,
			},
			{
				Header: 'Purpose',
				accessor: 'purpose',
				Cell: ({ cell }) => <Purpose value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <StatusData value={cell.value} />,
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
	} = useSportBetHistoryFilters();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection buttonList={[]} title="Sport Betting History" />
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
						isLoading={isSportsTransactionLoading}
						columns={columns}
						data={formattedSportsTransaction}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={sportsTransaction?.count}
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

export default SportsBettingHistory;
