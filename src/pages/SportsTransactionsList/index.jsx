import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import useSportsTransactionsListing from './hooks/useSportsTransactionsListing';
import DepositWithdrawalInfo from '../../components/DepositWithdrawalInfo';

const SportsTransactionsList = ({ userId }) => {
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
		sportsTransactions,
		loading,
		formattedSportsTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	} = useSportsTransactionsListing(filterValidation.values, userId);

	return (
		<div className={`${userId ? '' : 'page-content'}`}>
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Sports Transactions" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={[]}
								exportComponent={exportComponent}
								title="Sports Transactions"
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
									isLoading={loading}
									columns={columns}
									data={formattedSportsTransactions}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={sportsTransactions?.totalPages || 0}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
									customTableInfo={
										<DepositWithdrawalInfo
											totalDepositAmount={
												sportsTransactions?.totalBetAmount // Wagered
											}
											totalWithdrawAmount={
												sportsTransactions?.totalWinAmount // Payout
											}
											currencyId={filterValidation.values?.currencyId}
											labels={[
												'Total Wagered : ',
												'Total Payout : ',
												'Total Profit : ',
											]}
										/>
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

SportsTransactionsList.defaultProps = {
	userId: '',
};

SportsTransactionsList.propTypes = {
	userId: PropTypes.string,
};

export default SportsTransactionsList;
