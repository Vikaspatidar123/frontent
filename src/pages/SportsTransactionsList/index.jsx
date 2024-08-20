import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import useSportsTransactionsListing from './hooks/useSportsTransactionsListing';
import DepositWithdrawalInfo from '../../components/DepositWithdrawalInfo';

const SportsTransactionsList = ({ userId }) => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters(userId);

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
										!userId ? (
											<DepositWithdrawalInfo // Hide deposit withdraw info from specific player report
												currencyId={filterValidation.values?.currencyId}
												values={[
													{
														label: 'Total Wagered',
														value: sportsTransactions?.totalBetAmount || 0,
														type: 'in',
													},
													{
														label: 'Total Payout',
														value: sportsTransactions?.totalWinAmount || 0,
													},
													{
														label: 'Total Profit',
														value: (
															Number(sportsTransactions?.totalBetAmount || 0) -
															Number(sportsTransactions?.totalWinAmount || 0)
														)?.toFixed(2),
														type: 'in',
													},
												]}
											/>
										) : null
									}
									filterComponent={filterComponent}
									selectedFiltersComponent={selectedFiltersComponent}
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
