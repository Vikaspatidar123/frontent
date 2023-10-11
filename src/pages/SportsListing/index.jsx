/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSportsListing from './hooks/useSportsListing';
import { projectName } from '../../constants/config';

import { SportId, SportName, Status, Icon } from './sportsListCol';
import ActionButtons from './ActionButtons';

const columns = [
	{
		Header: 'ID',
		accessor: 'sportId',
		filterable: true,
		Cell: ({ cell }) => <SportId cell={cell} />,
	},
	{
		Header: 'NAME',
		accessor: 'sportName',
		filterable: true,
		Cell: ({ cell }) => <SportName cell={cell} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		disableFilters: true,
		Cell: ({ cell }) => <Status cell={cell} />,
	},
	{
		Header: 'ICON',
		accessor: 'icons',
		disableFilters: true,
		Cell: ({ cell }) => <Icon cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const SportsListing = () => {
	// meta title
	document.title = `Sports | ${projectName}`;

	const {
		formattedSportsList,
		isSportsListLoading,
		totalSportsListCount,
		page,
		setPage,
		itemsPerPage,
	} = useSportsListing();

	return (
		<div className="page-content">
			<Container fluid>
				<TableContainer
					columns={columns}
					data={formattedSportsList}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalSportsListCount}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={!isSportsListLoading}
				/>
			</Container>
		</div>
	);
};

export default SportsListing;
