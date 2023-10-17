/* eslint-disable react/prop-types */
import React from 'react';
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

const columns = [
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
		Cell: () => <ActionButtons />,
	},
];

const WageringTemplate = ({ t }) => {
	// Set meta title
	document.title = projectName;

	// Fetch CMS page data and manage pagination state
	const {
		wageringTemplateDetail,
		wageringTemplateDetailLoading,
		totalwageringTemplateDetailCount,
		page,
		setPage,
		itemsPerPage,
	} = useWageringTemplate();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Wagering Template List')}
					breadcrumbItem={t('wagering Template')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Templates Listing" />
							<CardBody>
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
