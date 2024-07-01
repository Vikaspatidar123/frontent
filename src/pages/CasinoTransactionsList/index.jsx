import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCasinoTransactionsListing from './hooks/useCasinoTransactionsListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import DepositWithdrawalInfo from '../../components/DepositWithdrawalInfo';

const CasinoTransactionsList = ({ userId }) => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters(userId);

	const {
		currentPage,
		setCurrentPage,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		casinoTransactions,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	} = useCasinoTransactionsListing(filterValidation.values, userId);

	return (
		<div className={`${userId ? '' : 'page-content'}`}>
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Casino Transactions" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={[]}
								exportComponent={exportComponent}
								title="Casino Transactions"
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
									customTableInfo={
										!userId ? (
											<DepositWithdrawalInfo // Hide deposit withdraw info from specific player report
												totalDepositAmount={
													casinoTransactions?.totalBetAmount // Wagered
												}
												totalWithdrawAmount={
													casinoTransactions?.totalWinAmount // Payout
												}
												currencyId={filterValidation.values?.currencyId}
												labels={[
													'Total Wagered : ',
													'Total Payout : ',
													'Total Profit : ',
												]}
											/>
										) : null
									}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
CasinoTransactionsList.defaultProps = {
	userId: '',
};

CasinoTransactionsList.propTypes = {
	userId: PropTypes.string,
};

export default CasinoTransactionsList;
