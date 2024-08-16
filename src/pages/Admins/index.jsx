import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/Table';
import { projectName, tbodyClass } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import useAdminListing from './hooks/useAdminListing';

const Admins = () => {
	// meta title
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
		isLoading,
		totalPages,
		page,
		setPage,
		itemsPerPage,
		columns,
		formattedAdminDetails,
		buttonList,
		onChangeRowsPerPage,
	} = useAdminListing(false, filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Staff Management" breadcrumbItem="Staff" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Staff" />
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
									columns={columns || []}
									data={formattedAdminDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tbodyClass={tbodyClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPages}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
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

Admins.propTypes = {
	// t: PropTypes.func,
};

Admins.defaultProps = {
	// t: (string) => string,
};

export default Admins;
