import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import useTransactionBankingListing from './hooks/useTransactionBankingListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const TransactionBankingList = () => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		buttonList,
	} = useTransactionBankingListing('', filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Transactions Banking" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title="Transactions Banking"
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
									totalPageCount={totalTransactionBankingCount}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

TransactionBankingList.propTypes = {
	// t: PropTypes.func,
};

TransactionBankingList.defaultProps = {
	t: (string) => string,
};

export default TransactionBankingList;
