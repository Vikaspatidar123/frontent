/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { projectName } from '../../constants/config';
import {
	CasinoProviderId,
	Name,
	ThumbnailUrl,
	Status,
} from './CasinoProvidersListCol';
import ActionButtons from './ActionButtons';
import useCasinoProvidersListing from './hooks/useCasinoProvidersListing';

const columns = [
	{
		Header: 'ID',
		accessor: 'casinoProviderId',
		filterable: true,
		Cell: ({ cell }) => <CasinoProviderId cell={cell} />,
	},
	{
		Header: 'NAME',
		accessor: 'name',
		filterable: true,
		Cell: ({ cell }) => <Name cell={cell} />,
	},
	{
		Header: 'THUMBNAIL',
		accessor: 'thumbnailUrl',
		filterable: true,
		Cell: ({ cell }) => <ThumbnailUrl cell={cell} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		disableFilters: true,
		Cell: (cell) => <Status cell={cell} />,
	},
	{
		Header: 'ACTION',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const CasinoProviders = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		page,
		setPage,
		itemsPerPage,
	} = useCasinoProvidersListing();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Casino Management')}
					breadcrumbItem={t('Casino Providers')}
				/>
				<TableContainer
					columns={columns}
					data={casinoProvidersData?.rows || []}
					isGlobalFilter
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={casinoProvidersData?.count}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={!isCasinoProvidersDataLoading}
				/>
			</Container>
		</div>
	);
};

CasinoProviders.propTypes = {
	t: PropTypes.func,
};

CasinoProviders.defaultProps = {
	t: (string) => string,
};

export default CasinoProviders;
