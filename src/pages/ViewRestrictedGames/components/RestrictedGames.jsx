import React from 'react';
import { Container } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import useRestrictedGamesListing from '../hooks/useRestrictedGamesListing';

const RestrictedGames = () => {
	const {
		currentPage,
		setCurrentPage,
		itemsPerPage,
		columns,
		restrictedGamesList,
		totalGamesCount,
		restrictedGamesLoading,
		onChangeRowsPerPage,
	} = useRestrictedGamesListing();

	return (
		<Container fluid>
			<TableContainer
				columns={columns || []}
				data={restrictedGamesList || []}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={totalGamesCount}
				isManualPagination
				onChangePagination={setCurrentPage}
				currentPage={currentPage}
				isLoading={restrictedGamesLoading}
				changeRowsPerPageCallback={onChangeRowsPerPage}
			/>
		</Container>
	);
};

export default RestrictedGames;
