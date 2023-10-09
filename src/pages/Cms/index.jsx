/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useCmsListing from './hooks/useCmsListing';
import { CmsPageId, Title, Slug, Portal, Status } from './CmsListCol';

import ActionButtons from './ActionButtons';

const columns = [
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
		Cell: () => <ActionButtons />,
	},
];

const Cms = ({ t }) => {
	// Set meta title
	document.title = 'CMS | Skote - Vite React Admin & Dashboard Template';

	// Fetch CMS page data and manage pagination state
	const {
		formattedCmsDetails,
		isLoading,
		page,
		setPage,
		itemsPerPage,
		totalCmsCount,
	} = useCmsListing();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Cms')} breadcrumbItem={t('Cms')} />
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
				/>
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
