/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionableType,
	Amount,
	Email,
	Id,
	Name,
	PaymentProvider,
	Status,
	TransactionId,
	UpdatedAt,
} from './WithdrawRequestsListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useWithdrawRequestsListing from './hooks/useWithdrawRequestsListing';

const WithdrawRequestsList = ({ t }) => {
	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalWithdrawRequestsCount,
		isWithdrawRequestsLoading,
		formattedWithdrawRequests,
		itemsPerPage,
	} = useWithdrawRequestsListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'userId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: (cellProps) => <Email {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amountWithCurr',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Payment Provider',
				accessor: 'paymentProvider',
				filterable: true,
				Cell: (cellProps) => <PaymentProvider {...cellProps} />,
			},
			{
				Header: 'Transaction Id',
				accessor: 'transactionId',
				Cell: (cellProps) => <TransactionId {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Actionable Type',
				accessor: 'actionableType',
				Cell: (cellProps) => <ActionableType {...cellProps} />,
			},
			{
				Header: 'Updated At',
				accessor: 'updatedAt',
				Cell: (cellProps) => <UpdatedAt {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Withdraw Requests')}
					breadcrumbItem={t('Withdraw Requests')}
				/>
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Payment Providers"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
				<TableContainer
					isLoading={isWithdrawRequestsLoading}
					columns={columns}
					data={formattedWithdrawRequests}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalWithdrawRequestsCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

WithdrawRequestsList.propTypes = {
	t: PropTypes.func,
};

WithdrawRequestsList.defaultProps = {
	t: (string) => string,
};

export default WithdrawRequestsList;
