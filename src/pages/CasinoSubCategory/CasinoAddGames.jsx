/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	UncontrolledTooltip,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { projectName } from '../../constants/config';

import TableContainer from '../../components/Common/TableContainer';
import CrudSection from '../../components/Common/CrudSection';
import useCasinoAddGame from './hooks/useCasinoAddGame';

import { CasinoGameId, Name, DeviceType } from './CasinoSubCategory';

const CasinoAddGames = () => {
	// meta title
	document.title = projectName;
	const { gameSubCategoryId } = useParams();

	const {
		pageNo,
		setPageNo,
		itemsPerPage,
		formattedGames,
		isCasinoGamesLoading,
		totalRecords,
		onChangeRowsPerPage,
		handleAddGame,
		newGamesData,
		handleRemoveGame,
		buttonList,
		newGameItemsPerPage,
		newGamepageNo,
		setNewGamepageNo,
		onChangeNewGameTableRowsPerPage,
	} = useCasinoAddGame();

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'casinoGameId',
				filterable: true,
				Cell: ({ cell }) => <CasinoGameId cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name cell={cell} />,
			},
			{
				Header: 'DEVICE TYPE',
				accessor: 'devices',
				filterable: true,
				Cell: ({ cell }) => <DeviceType cell={cell} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => {
					const casinoGameId = cell?.row?.original.casinoGameId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Link
									to="#"
									className="btn btn-sm btn-soft-primary"
									onClick={(e) => handleAddGame(e, cell?.row?.original)}
								>
									<i className="mdi mdi-plus-box" id={`plus-${casinoGameId}`} />
									<UncontrolledTooltip
										placement="top"
										target={`plus-${casinoGameId}`}
									>
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
				accessor: 'casinoGameId',
				filterable: true,
				Cell: ({ cell }) => <CasinoGameId cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name cell={cell} />,
			},
			{
				Header: 'DEVICE TYPE',
				accessor: 'devices',
				filterable: true,
				Cell: ({ cell }) => <DeviceType cell={cell} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				Cell: ({ cell }) => {
					const casinoGameId = cell?.row?.original.casinoGameId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Link
									to="#"
									className="btn btn-sm btn-soft-primary"
									onClick={(e) => handleRemoveGame(e, casinoGameId)}
								>
									<i
										className="mdi mdi-minus-box"
										id={`minus-${casinoGameId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`minus-${casinoGameId}`}
									>
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
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title={`Add Games: ${gameSubCategoryId}`}
							/>
							<CardBody>
								<TableContainer
									columns={newGamesColumns}
									data={newGamesData}
									isPagination
									customPageSize={newGameItemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
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
						<Card>
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedGames}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalRecords}
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
		</div>
	);
};

export default CasinoAddGames;
