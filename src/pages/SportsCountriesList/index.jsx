import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsCountriesListing from './hooks/useSportsCountriesList';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const SportsCountriesListing = () => {
	// meta title
	document.title = projectName;

	const {
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportsCountriesCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		onChangeRowsPerPage,
	} = useSportsCountriesListing();

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
				<Breadcrumb title="Sports Book" breadcrumbItem="Countries" />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Countries" />
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
								/>
								<TableContainer
									columns={columns}
									data={formattedSportsCountries}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsCountriesCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsCountriesLoading}
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

export default SportsCountriesListing;
