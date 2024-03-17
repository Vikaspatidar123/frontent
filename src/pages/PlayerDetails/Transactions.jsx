import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import TableContainer from '../../components/Common/TableContainer';
import useTransactionBankingListing from '../TransactionBankingList/hooks/useTransactionBankingListing';
import useTransactionFilters from './hooks/useTransactionFilters';
import Filters from '../../components/Common/Filters';
import CrudSection from '../../components/Common/CrudSection';

const Transactions = ({ userId }) => {
	const {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		transactionBanking,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	} = useTransactionBankingListing(userId);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useTransactionFilters();

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection
					buttonList={[]}
					exportComponent={exportComponent}
					title="Transactions"
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
						isLoading={isTransactionBankingLoading}
						columns={columns}
						data={formattedTransactionBanking}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={transactionBanking?.totalPages || 0}
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

Transactions.defaultProps = {
	userId: '',
};

Transactions.propTypes = {
	userId: PropTypes.string,
};

export default Transactions;
