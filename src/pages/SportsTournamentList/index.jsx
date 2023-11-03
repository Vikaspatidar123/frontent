/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsTounamentListing from './hooks/useSportsTournamentListing';
import { projectName } from '../../constants/config';
// import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';

const SportsTournamentList = () => {
	// meta title
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
		formattedSportsTournamenList,
		isSportsTournamentListLoading,
		totalSportsTounamentListCount,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useSportsTounamentListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{/* <Breadcrumb title="Sports Book" breadcrumbItem="Tournaments" /> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Tournaments" />
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
									columns={columns}
									data={formattedSportsTournamenList}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSportsTounamentListCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isSportsTournamentListLoading}
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

export default SportsTournamentList;
