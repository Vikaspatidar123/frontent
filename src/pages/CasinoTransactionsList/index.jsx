import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCasinoTransactionsListing from './hooks/useCasinoTransactionsListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const CasinoTransactionsList = ({ t }) => {
	document.title = projectName;

	const {
		currentPage,
		setCurrentPage,
		totalCasinoTransactionsCount,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useCasinoTransactionsListing();

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
	} = useFilters();

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb
					title={t('Reports')}
					breadcrumbItem={t('Casino Transactions')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={[]}
								title="Casino Transactions Listing"
							/>
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
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
	t: PropTypes.func,
};

CasinoTransactionsList.defaultProps = {
	t: (string) => string,
};

export default CasinoTransactionsList;
