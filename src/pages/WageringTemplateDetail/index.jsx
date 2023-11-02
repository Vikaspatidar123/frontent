/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
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

const WageringTemplate = ({ t }) => {
	// Set meta title
	document.title = projectName;

	const {
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		totalwageringTemplateDetailCount,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useWageringTemplate();

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
				<Breadcrumbs
					title={t('Wagering Template List')}
					breadcrumbItem={t('Wagering Template')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Templates" />
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
	t: PropTypes.func,
};

WageringTemplate.defaultProps = {
	t: (string) => string,
};

export default WageringTemplate;
