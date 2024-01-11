/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import useWageringTemplate from './hooks/useWageringTemplate';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import useCreateWageringTemplate from './hooks/useCreateWagringTemplate';

const WageringTemplate = () => {
	// Set meta title
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
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		totalwageringTemplateDetailCount,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useWageringTemplate(filterValidation.values);

	const { buttonList } = useCreateWageringTemplate();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Wagering Template List"
						breadcrumbItem="Wagering Template"
					/>
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Wagering Templates" />
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
									data={wageringTemplateDetail?.rows || []}
									isAddOptions={false}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalwageringTemplateDetailCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={wageringTemplateDetailLoading}
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

WageringTemplate.propTypes = {
	// t: PropTypes.func,
};

WageringTemplate.defaultProps = {
	t: (string) => string,
};

export default WageringTemplate;
