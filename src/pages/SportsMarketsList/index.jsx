import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsMarketsListing from './hooks/useSportsMarketsListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const SportsMarketsList = ({ t }) => {
	document.title = projectName;

	const {
		currentPage,
		setCurrentPage,
		totalSportsMarketsCount,
		isSportsMarketsLoading,
		formattedSportsMarkets,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useSportsMarketsListing();

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
				<Breadcrumb title={t('Sports Book')} breadcrumbItem={t('Markets')} />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Markets" />
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
								/>
								<TableContainer
									isLoading={isSportsMarketsLoading}
									columns={columns}
									data={formattedSportsMarkets}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsMarketsCount}
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

SportsMarketsList.propTypes = {
	t: PropTypes.func,
};

SportsMarketsList.defaultProps = {
	t: (string) => string,
};

export default SportsMarketsList;
