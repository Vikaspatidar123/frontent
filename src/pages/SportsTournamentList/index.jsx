/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import useSportsTounamentListing from './hooks/useSportsTournamentListing';
import { projectName } from '../../constants/config';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useFilters from './hooks/useFilters';

const SportsTournamentList = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		formattedSportsTournamenList,
		isSportsTournamentListLoading,
		totalSportsTounamentListCount,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useSportsTounamentListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sportsbook" breadcrumbItem="Leagues" />
				)}
				<TableContainer
					columns={columns}
					data={formattedSportsTournamenList}
					isGlobalFilter
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={totalSportsTounamentListCount}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={!isSportsTournamentListLoading}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					filterComponent={filterComponent}
					selectedFiltersComponent={selectedFiltersComponent}
				/>
			</Container>
		</div>
	);
};

export default SportsTournamentList;
