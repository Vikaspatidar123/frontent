/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useTransactionBankingListing from '../TransactionBankingList/hooks/useTransactionBankingListing';

const Transactions = ({ userId }) => {
	const {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useTransactionBankingListing({ userId });

	return (
		<Container fluid className="bg-white">
			<Card className="p-2">
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
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
			</Card>
		</Container>
	);
};

export default Transactions;
