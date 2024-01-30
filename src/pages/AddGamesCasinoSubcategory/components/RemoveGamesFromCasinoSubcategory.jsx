import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import useRemoveAddedGames from '../hooks/useRemoveAddedGames';
import TableContainer from '../../../components/Common/TableContainer';

const RemoveGamesFromCasinoSubcategory = () => {
	const {
		currentPage,
		setCurrentPage,
		itemsPerPage,
		columns,
		formattedGames,
		totalGamesCount,
		isSubCategoryAddedGamesLoading,
		onChangeRowsPerPage,
		onChangeRemoveGamesRowsPerPage,
		selectedGames,
		removedGamesCurrentPage,
		setRemovedGamesCurrentPage,
		removedGamesItemsPerPage,
		removeGamecolumns,
		removeAddedGames,
	} = useRemoveAddedGames();

	return (
		<Container fluid>
			<Row>
				<Col lg="12">
					<Card>
						<div className="mx-4 pt-3 d-flex justify-content-between">
							<h5>Games you remove will appear here</h5>
							<Button
								type="button"
								className="btn btn-sm btn-success font-size-14"
								onClick={removeAddedGames}
							>
								Submit
							</Button>
						</div>
						<CardBody>
							<TableContainer
								columns={removeGamecolumns || []}
								data={selectedGames || []}
								isPagination
								customPageSize={removedGamesItemsPerPage}
								tableClass="table-bordered align-middle nowrap"
								paginationDiv="justify-content-center"
								pagination="pagination justify-content-start pagination-rounded"
								totalPageCount={selectedGames?.length || 0}
								isManualPagination
								onChangePagination={setRemovedGamesCurrentPage}
								currentPage={removedGamesCurrentPage}
								isLoading={false}
								changeRowsPerPageCallback={onChangeRemoveGamesRowsPerPage}
							/>
						</CardBody>
					</Card>
					<Card>
						<div className="mx-4 pt-3">
							<h5>Added Games</h5>
						</div>
						<CardBody>
							<TableContainer
								columns={columns || []}
								data={formattedGames || []}
								isPagination
								customPageSize={itemsPerPage}
								tableClass="table-bordered align-middle nowrap"
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
				</Col>
			</Row>
		</Container>
	);
};

export default RemoveGamesFromCasinoSubcategory;
