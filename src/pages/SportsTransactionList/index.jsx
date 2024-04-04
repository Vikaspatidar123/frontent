import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsTransactionListing from './hooks/useSportsTransactionListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import ModalView from '../../components/Common/Modal';

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
		exportComponent,
		viewModal,
		setViewModal,
		formattedBetSlips,
		betSlipColumns,
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
								<ModalView
									openModal={viewModal}
									toggleModal={() => setViewModal(!viewModal)}
									headerTitle="Bet Slips"
									className="modal-dialog modal-xl"
									hideFooter
								>
									<TableContainer
										isLoading={false}
										columns={betSlipColumns || []}
										data={formattedBetSlips}
										customPageSize={50}
										isShowColSettings={false}
									/>
								</ModalView>
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
