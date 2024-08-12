import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import useTournaments from './hooks/useTournaments';
import CrudSection from '../../components/Common/CrudSection';
import TableContainer from '../../components/Common/Table/index';
import Filters from '../../components/Common/Filters';
import Breadcrumb from '../../components/Common/Breadcrumb';

const Tournament = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		itemsPerPage,
		currentPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalPages,
		tournamentsInfo,
		columns,
		buttonList,
		isTournamentsInfoLoading,
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useTournaments();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Tournaments" breadcrumbItem="Tournaments" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Tournaments" />
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
									customFieldCols={{ xxl: 3, xl: 3, md: 3, sm: 3 }}
								/>
								<TableContainer
									isLoading={isTournamentsInfoLoading}
									columns={columns || []}
									data={tournamentsInfo?.casinoTournaments || []}
									isPagination
									customPageSize={itemsPerPage}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPages}
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

Tournament.propTypes = {};

export default Tournament;
