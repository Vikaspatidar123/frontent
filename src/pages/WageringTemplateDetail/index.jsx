/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import useWageringTemplate from './hooks/useWageringTemplate';
import { WageringTemplateId, TemplateName } from './WageringTemplateListCol';
import ActionButtons from './ActionButtons';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import useCreateWageringTemplate from './hooks/useCreateWagringTemplate';
import useEditWageringTemplate from './hooks/useEditWageringTemplate';

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
	} = useWageringTemplate(filterValidation.values);

	const { handleEditClick, handleViewClick } = useEditWageringTemplate();

	const { buttonList } = useCreateWageringTemplate();

	const columns = useMemo(
		() => [
			{
				Header: 'TEMPLATE ID',
				accessor: 'wageringTemplateId',
				filterable: true,
				Cell: ({ cell }) => <WageringTemplateId cell={cell} />,
			},
			{
				Header: 'TEMPLATE NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <TemplateName cell={cell} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						cell={cell}
						handleEdit={handleEditClick}
						handleView={handleViewClick}
					/>
				),
			},
		],
		[]
	);

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
