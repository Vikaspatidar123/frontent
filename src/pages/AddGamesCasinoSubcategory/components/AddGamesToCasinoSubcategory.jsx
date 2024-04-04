/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Row,
	UncontrolledTooltip,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import TableContainer from '../../../components/Common/Table';

import { CasinoGameId, Name, DeviceType, KeyValueCell } from '../GamesListCol';
import useAddGamesToCasinoSubcategory from '../hooks/useAddGamesToCasinoSubcategory';

const AddGamesToCasinoSubcategory = () => {
	const {
		pageNo,
		setPageNo,
		itemsPerPage,
		formattedGames,
		isCasinoGamesLoading,
		totalPages,
		onChangeRowsPerPage,
		handleAddGame,
		newGamesData,
		handleRemoveGame,
		newGameItemsPerPage,
		newGamepageNo,
		setNewGamepageNo,
		onChangeNewGameTableRowsPerPage,
		handleSubmitClick,
	} = useAddGamesToCasinoSubcategory();

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <CasinoGameId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'PROVIDER NAME',
				accessor: 'providerName',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'DEVICE TYPE',
				accessor: 'devices',
				filterable: true,
				Cell: ({ cell }) => <DeviceType value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					const id = cell?.row?.original.id;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Link
									to="!#"
									className="btn btn-sm btn-soft-success"
									onClick={(e) => handleAddGame(e, cell?.row?.original)}
								>
									<i className="mdi mdi-plus-box" id={`plus-${id}`} />
									<UncontrolledTooltip placement="top" target={`plus-${id}`}>
										Add Game
									</UncontrolledTooltip>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	const newGamesColumns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <CasinoGameId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'PROVIDER NAME',
				accessor: 'providerName',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'DEVICE TYPE',
				accessor: 'devices',
				filterable: true,
				Cell: ({ cell }) => <DeviceType value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					const id = cell?.row?.original.id;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Link
									to="!#"
									className="btn btn-sm btn-soft-danger"
									onClick={(e) => handleRemoveGame(e, id)}
								>
									<i className="mdi mdi-minus-box" id={`minus-${id}`} />
									<UncontrolledTooltip placement="top" target={`minus-${id}`}>
										Remove Game
									</UncontrolledTooltip>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	return (
		<Container fluid>
			<Row>
				<Col lg="12">
					{newGamesData?.length ? (
						<Card>
							<div className="mx-4 pt-3 d-flex justify-content-between">
								<h5>Selected Games</h5>
								<Button
									type="button"
									// disabled={isGlobal}
									className="btn btn-sm btn-success font-size-14"
									onClick={handleSubmitClick}
								>
									Submit
								</Button>
							</div>
							<CardBody>
								<TableContainer
									columns={newGamesColumns || []}
									data={newGamesData || []}
									isPagination
									customPageSize={newGameItemsPerPage}
									tableClass="table-bordered align-middle nowrap"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={newGamesData?.length}
									isManualPagination
									onChangePagination={setNewGamepageNo}
									currentPage={newGamepageNo}
									isLoading={!isCasinoGamesLoading}
									changeRowsPerPageCallback={onChangeNewGameTableRowsPerPage}
								/>
							</CardBody>
						</Card>
					) : (
						<Card>
							<h4 className="text-center text-primary p-5">
								Games you add will appear here.
							</h4>
						</Card>
					)}
					<Card>
						<CardBody>
							<div className="mx-1 pt-3">
								<h5>All Games</h5>
							</div>
							<TableContainer
								columns={columns || []}
								data={formattedGames || []}
								isPagination
								customPageSize={itemsPerPage}
								tableClass="table-bordered align-middle nowrap mt-2"
								paginationDiv="justify-content-center"
								pagination="pagination justify-content-start pagination-rounded"
								totalPageCount={totalPages}
								isManualPagination
								onChangePagination={setPageNo}
								currentPage={pageNo}
								isLoading={!isCasinoGamesLoading}
								changeRowsPerPageCallback={onChangeRowsPerPage}
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default AddGamesToCasinoSubcategory;
