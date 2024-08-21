import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsMatchesListing from './hooks/useSportsMatchesListing';
import { projectName } from '../../constants/config';
import useFilters from './hooks/useFilters';

const SportsMatchesList = () => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		currentPage,
		setCurrentPage,
		totalSportsMatchesCount,
		isSportsMatchesLoading,
		formattedSportsMatches,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useSportsMatchesListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sportsbook" breadcrumbItem="Matches" />
				)}

				<TableContainer
					isLoading={isSportsMatchesLoading}
					columns={columns}
					data={formattedSportsMatches}
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={totalSportsMatchesCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					filterComponent={filterComponent}
					selectedFiltersComponent={selectedFiltersComponent}
				/>
			</Container>
		</div>
	);
};

SportsMatchesList.propTypes = {
	// t: PropTypes.func,
};

SportsMatchesList.defaultProps = {
	t: (string) => string,
};

export default SportsMatchesList;
