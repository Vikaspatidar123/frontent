import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsMarketsListing from './hooks/useSportsMarketsListing';
import { projectName } from '../../constants/config';
import useFilters from './hooks/useFilters';

const SportsMarketsList = () => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters();

	const {
		currentPage,
		setCurrentPage,
		totalSportsMarketsCount,
		isSportsMarketsLoading,
		formattedSportsMarkets,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useSportsMarketsListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Sportsbook" breadcrumbItem="Markets" />
				)}
				<TableContainer
					isLoading={isSportsMarketsLoading}
					columns={columns}
					data={formattedSportsMarkets}
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={totalSportsMarketsCount}
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

SportsMarketsList.propTypes = {
	// t: PropTypes.func,
};

SportsMarketsList.defaultProps = {
	t: (string) => string,
};

export default SportsMarketsList;
