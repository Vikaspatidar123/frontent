import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useCmsListing from './hooks/useCmsListing';

import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import useCreateCms from './hooks/useCreateCms';

const Cms = () => {
	// Set meta title
	document.title = projectName;

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	// Fetch CMS page data and manage pagination state
	const {
		formattedCmsDetails,
		isLoading,
		page,
		setPage,
		itemsPerPage,
		totalCmsCount,
		onChangeRowsPerPage,
		columns,
	} = useCmsListing(filterValidation.values);

	const { buttonList } = useCreateCms();

	return (
		<div className="page-content">
			<Container fluid>
				{/* <Breadcrumbs
					title={t('Content Management')}
					breadcrumbItem={t('Cms')}
				/> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="CMS" />
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
									data={formattedCmsDetails}
									isAddOptions={false}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCmsCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
									isGlobalFilter
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

Cms.propTypes = {
	// t: PropTypes.func,
};

Cms.defaultProps = {
	t: (string) => string,
};

export default Cms;
