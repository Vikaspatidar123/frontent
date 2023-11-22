import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCasinoTransactionsListing from './hooks/useCasinoTransactionsListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const CasinoTransactionsList = () => {
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
		totalCasinoTransactionsCount,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		buttonList,
	} = useCasinoTransactionsListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Casino Transactions" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
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
									totalPageCount={totalCasinoTransactionsCount}
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

CasinoTransactionsList.propTypes = {
	// t: PropTypes.func,
};

CasinoTransactionsList.defaultProps = {
	t: (string) => string,
};

export default CasinoTransactionsList;
