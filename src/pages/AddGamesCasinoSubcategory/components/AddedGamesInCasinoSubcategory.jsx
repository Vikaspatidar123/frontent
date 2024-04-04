import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import TableContainer from '../../../components/Common/Table';
import useAddedGames from '../hooks/useAddedGames';

const AddedGamesInCasinoSubcategory = () => {
	const {
		columns,
		currentPage,
		setCurrentPage,
		itemsPerPage,
		formattedGames,
		totalGamesCount,
		isSubCategoryAddedGamesLoading,
		onChangeRowsPerPage,
	} = useAddedGames();

	return (
		<Container fluid>
			<Card>
				<CardBody>
					<TableContainer
						columns={columns || []}
						data={formattedGames || []}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={totalGamesCount}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						isLoading={isSubCategoryAddedGamesLoading}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export default AddedGamesInCasinoSubcategory;
