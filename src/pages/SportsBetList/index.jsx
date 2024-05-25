import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsBetListing from './hooks/useSportsBetListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import ModalView from '../../components/Common/Modal';

const SportsBetList = ({ t }) => {
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
		totalSportsBetCount,
		isSportsBetLoading,
		formattedSportsBet,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
		viewModal,
		setViewModal,
		formattedBetSlips,
		betSlipColumns,
	} = useSportsBetListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				{showBreadcrumb && (
					<Breadcrumb title={t('Reports')} breadcrumbItem={t('Sports Bets')} />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={[]}
								exportComponent={exportComponent}
								title="Sports Bets"
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
									isLoading={isSportsBetLoading}
									columns={columns}
									data={formattedSportsBet}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsBetCount}
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

SportsBetList.propTypes = {
	t: PropTypes.func,
};

SportsBetList.defaultProps = {
	t: (string) => string,
};

export default SportsBetList;
