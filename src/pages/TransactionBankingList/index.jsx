import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/Table';
import useTransactionBankingListing from './hooks/useTransactionBankingListing';
import { projectName } from '../../constants/config';
import useFilters from './hooks/useFilters';
import DepositWithdrawalInfo from '../../components/DepositWithdrawalInfo';

const TransactionBankingList = ({ userId }) => {
	// For user specific transactions
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		currentPage,
		setCurrentPage,
		transactionBanking,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		actionList,
	} = useTransactionBankingListing(filterValidation.values, userId);

	return (
		<div className={`${userId ? '' : 'page-content'}`}>
			<Container fluid>
				{showBreadcrumb && !userId && (
					<Breadcrumb title="Reports" breadcrumbItem="Transactions Banking" />
				)}
				<Row>
					<Col lg="12">
						<TableContainer
							isLoading={isTransactionBankingLoading}
							columns={columns}
							data={formattedTransactionBanking}
							isPagination
							customPageSize={itemsPerPage}
							paginationDiv="justify-content-center"
							pagination="pagination justify-content-start pagination-rounded"
							totalPageCount={transactionBanking?.totalPages || 0}
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
												label: 'Total Deposit',
												value: transactionBanking?.totalDepositAmount || 0,
												type: 'in',
											},
											{
												label: 'Total Withdrawal',
												value: transactionBanking?.totalWithdrawAmount || 0,
												colorClass: 'text-danger',
											},
										]}
									/>
								) : null
							}
							filterComponent={filterComponent}
							selectedFiltersComponent={selectedFiltersComponent}
							actionList={actionList}
							customSearchClass=""
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

TransactionBankingList.defaultProps = {
	// t: PropTypes.func,
	userId: '',
};

TransactionBankingList.propTypes = {
	userId: PropTypes.string,
};

export default TransactionBankingList;
