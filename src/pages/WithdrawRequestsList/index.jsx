import React from 'react';
// import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
// import Breadcrumb from '../../components/Common/Breadcrumb';
import useWithdrawRequestsListing from './hooks/useWithdrawRequestsListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const WithdrawRequestsList = () => {
	document.title = projectName;

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
		totalWithdrawRequestsCount,
		isWithdrawRequestsLoading,
		formattedWithdrawRequests,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useWithdrawRequestsListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				{/* <Breadcrumb
          title={t('Reports')}
          breadcrumbItem={t('Withdraw Requests')}
        /> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Withdraw Requests" />
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
									isLoading={isWithdrawRequestsLoading}
									columns={columns}
									data={formattedWithdrawRequests}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalWithdrawRequestsCount}
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

WithdrawRequestsList.propTypes = {
	// t: PropTypes.func,
};

WithdrawRequestsList.defaultProps = {
	t: (string) => string,
};

export default WithdrawRequestsList;
