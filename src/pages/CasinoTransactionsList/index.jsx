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
												currencyId={filterValidation.values?.currencyId}
												values={[
													{
														label: 'Total Wagered',
														value: casinoTransactions?.totalBetAmount || 0,
														type: 'in',
													},
													{
														label: 'Total Payout',
														value: casinoTransactions?.totalWinAmount || 0,
														colorClass: 'text-danger',
													},
													{
														label: 'Total Profit',
														value: (
															Number(casinoTransactions?.totalBetAmount || 0) -
															Number(casinoTransactions?.totalWinAmount || 0)
														)?.toFixed(2),
														type: 'in',
													},
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
