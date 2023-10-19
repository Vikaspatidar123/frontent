/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useCmsListing from './hooks/useCmsListing';
import { CmsPageId, Title, Slug, Portal, Status } from './CmsListCol';

import ActionButtons from './ActionButtons';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';

const Cms = ({ t }) => {
	// Set meta title
	document.title = projectName;

	// Fetch CMS page data and manage pagination state
	const {
		formattedCmsDetails,
		isLoading,
		page,
		setPage,
		itemsPerPage,
		totalCmsCount,
		handleStatus,
		onChangeRowsPerPage,
	} = useCmsListing();

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'cmsPageId',
				filterable: true,
				Cell: ({ cell }) => <CmsPageId cell={cell} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title cell={cell} />,
			},
			{
				Header: 'SLUG',
				accessor: 'slug',
				filterable: true,
				Cell: ({ cell }) => <Slug cell={cell} />,
			},
			{
				Header: 'PORTAL',
				accessor: 'portal',
				filterable: true,
				Cell: ({ cell }) => <Portal cell={cell} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: ({ cell }) => <Status cell={cell} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons cell={cell} handleStatus={handleStatus} />
				),
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Content Management')}
					breadcrumbItem={t('Cms')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="CMS Listing" />
							<CardBody>
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
	t: PropTypes.func,
};

Cms.defaultProps = {
	t: (string) => string,
};

export default Cms;
