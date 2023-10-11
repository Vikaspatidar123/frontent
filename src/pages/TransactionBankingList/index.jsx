/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionType,
	Actionee,
	ActioneeType,
	Amount,
	CreatedAt,
	Id,
	PaymentProvider,
	Status,
	TransactionId,
} from './TransactionBankingCol';
import useTransactionBankingListing from './hooks/useTransactionBankingListing';
import { projectName } from '../../constants/config';

const TransactionBankingList = ({ t }) => {
	document.title = `Transactions Banking | ${projectName}`;

	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
	} = useTransactionBankingListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'transactionBankingId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'paymentTransactionId',
				filterable: true,
				Cell: (cellProps) => <TransactionId {...cellProps} />,
			},
			{
				Header: 'Actionee',
				accessor: 'actioneeEmail',
				filterable: true,
				Cell: (cellProps) => <Actionee {...cellProps} />,
			},
			{
				Header: 'Payment Provider',
				accessor: 'paymentProvider',
				filterable: true,
				Cell: (cellProps) => <PaymentProvider {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: (cellProps) => <ActionType {...cellProps} />,
			},
			{
				Header: 'Actionee Type',
				accessor: 'actioneeType',
				Cell: (cellProps) => <ActioneeType {...cellProps} />,
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
					title={t('Transactions Banking')}
					breadcrumbItem={t('Transactions Banking')}
				/>
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Payment Provider"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
				<TableContainer
					isLoading={isTransactionBankingLoading}
					columns={columns}
					data={formattedTransactionBanking}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalTransactionBankingCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

TransactionBankingList.propTypes = {
	t: PropTypes.func,
};

TransactionBankingList.defaultProps = {
	t: (string) => string,
};

export default TransactionBankingList;
