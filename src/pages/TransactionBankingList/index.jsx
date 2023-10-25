import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import useTransactionBankingListing from './hooks/useTransactionBankingListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const TransactionBankingList = ({ t }) => {
	document.title = projectName;

	const {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useTransactionBankingListing();

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
					breadcrumbItem={t('Transactions Banking')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={[]}
								title="Transactions Banking Listing"
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
	t: PropTypes.func,
};

TransactionBankingList.defaultProps = {
	t: (string) => string,
};

export default TransactionBankingList;
