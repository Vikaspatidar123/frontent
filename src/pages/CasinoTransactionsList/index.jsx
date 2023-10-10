/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionType,
	Amount,
	BonusMoney,
	CreatedAt,
	GameName,
	Id,
	Status,
	UserEmail,
} from './CasinoTransactionsListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCasinoTransactionsListing from './hooks/useCasinoTransactionsListing';

const CasinoTransactionsList = ({ t }) => {
	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalCasinoTransactionsCount,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
	} = useCasinoTransactionsListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'casinoTransactionId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'User Email',
				accessor: 'userEmail',
				filterable: true,
				Cell: (cellProps) => <UserEmail {...cellProps} />,
			},
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
				Cell: (cellProps) => <ActionType {...cellProps} />,
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
				accessor: 'status',
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

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Casino Transactions')}
					breadcrumbItem={t('Casino Transactions')}
				/>
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search email"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
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
					totalPageCount={totalCasinoTransactionsCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

CasinoTransactionsList.propTypes = {
	t: PropTypes.func,
};

CasinoTransactionsList.defaultProps = {
	t: (string) => string,
};

export default CasinoTransactionsList;
