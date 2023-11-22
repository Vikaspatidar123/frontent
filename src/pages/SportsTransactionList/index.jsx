import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsTransactionListing from './hooks/useSportsTransactionListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const SportsTransactionList = ({ t }) => {
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
		totalSportsTransactionCount,
		isSportsTransactionLoading,
		formattedSportsTransaction,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useSportsTransactionListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				{showBreadcrumb && (
					<Breadcrumb
						title={t('Reports')}
						breadcrumbItem={t('Sports Transactions')}
					/>
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Sports Transactions" />
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
									isLoading={isSportsTransactionLoading}
									columns={columns}
									data={formattedSportsTransaction}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsTransactionCount}
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

SportsTransactionList.propTypes = {
	t: PropTypes.func,
};

SportsTransactionList.defaultProps = {
	t: (string) => string,
};

export default SportsTransactionList;
