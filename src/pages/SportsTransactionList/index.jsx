/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionTypes,
	Amount,
	CreatedAt,
	CurrencyCode,
	Email,
	Id,
	NonCashAmount,
	Status,
} from './SportsTransactionListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsTransactionListing from './hooks/useSportsTransactionListing';
import { projectName } from '../../constants/config';

const SportsTransactionList = ({ t }) => {
	document.title = projectName;

	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalSportsTransactionCount,
		isSportsTransactionLoading,
		formattedSportsTransaction,
		itemsPerPage,
	} = useSportsTransactionListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'transactionId',
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
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: (cellProps) => <Amount {...cellProps} />,
			},
			{
				Header: 'Non Cash Amount',
				accessor: 'nonCashAmount',
				filterable: true,
				Cell: (cellProps) => <NonCashAmount {...cellProps} />,
			},
			{
				Header: 'Currency Code',
				accessor: 'currencyCode',
				filterable: true,
				Cell: (cellProps) => <CurrencyCode {...cellProps} />,
			},
			{
				Header: 'Action Types',
				accessor: 'actionType',
				Cell: (cellProps) => <ActionTypes {...cellProps} />,
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
					title={t('Reports')}
					breadcrumbItem={t('Sports Transactions')}
				/>
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search Email"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
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
					totalPageCount={totalSportsTransactionCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

SportsTransactionList.propTypes = {
	t: PropTypes.func,
};

SportsTransactionList.defaultProps = {
	t: (string) => string,
};

export default SportsTransactionList;
