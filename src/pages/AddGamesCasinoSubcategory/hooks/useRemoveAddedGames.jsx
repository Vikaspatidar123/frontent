/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, UncontrolledTooltip } from 'reactstrap';
import {
	getAddedGamesInSubCategoryStart,
	removeGameFromSubCategoryStart,
} from '../../../store/actions';
import { KeyValueCell, Status } from '../GamesListCol';
import { showToastr } from '../../../utils/helpers';

const useRemoveAddedGames = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { gameSubCategoryId } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [removedGamesCurrentPage, setRemovedGamesCurrentPage] = useState(1);
	const [removedGamesItemsPerPage, setRemovedGamesItemsPerPage] = useState(10);
	const [selectedGames, setSelectedGames] = useState([]);

	const { subCategoryAddedGames, isSubCategoryAddedGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	useEffect(() => {
		if (gameSubCategoryId) {
			dispatch(
				getAddedGamesInSubCategoryStart({
					casinoCategoryId: gameSubCategoryId,
					perPage: itemsPerPage,
					page: currentPage,
				})
			);
		}
	}, [gameSubCategoryId, currentPage, itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const handleAddGame = (row) => {
		setSelectedGames((prevData) => {
			if (!prevData.find((game) => game.casinoGameId === row.casinoGameId)) {
				return [...prevData, row];
			}
			showToastr({
				message: 'Provider already added',
				type: 'error',
			});
			return prevData;
		});
	};

	const handleRemoveGame = (casinoGameId) => {
		setSelectedGames((prevData) =>
			prevData.filter((game) => game.casinoGameId !== casinoGameId)
		);
	};

	const onChangeRemoveGamesRowsPerPage = (value) => {
		setRemovedGamesItemsPerPage(value);
	};

	const removeAddedGames = () => {
		const itemIds = selectedGames?.map((g) => g.casinoGameId);
		dispatch(
			removeGameFromSubCategoryStart({
				casinoGameIds: itemIds,
				navigate,
			})
		);
	};

	const formattedGames = useMemo(() => {
		if (subCategoryAddedGames?.rows?.length) {
			return subCategoryAddedGames?.rows?.map((game) => ({
				...game,
				providerName: game?.casinoProvider?.name,
				devices: game.devices.join(', '),
			}));
		}
		return [];
	}, [subCategoryAddedGames]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'casinoGameId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
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
				disableSortBy: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTIONS',
				accessor: '',
				disableSortBy: true,
				Cell: ({ cell }) => {
					const gameId = cell?.row?.original?.casinoGameId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li data-bs-toggle="tooltip" data-bs-placement="top">
								<Button
									type="button"
									className="btn btn-sm btn-soft-success"
									onClick={(e) => {
										e.preventDefault();
										handleAddGame(cell?.row?.original);
									}}
								>
									<i className="mdi mdi-plus-box" id={`plus-${gameId}`} />
									<UncontrolledTooltip
										placement="top"
										target={`plus-${gameId}`}
									>
										Add this Game
									</UncontrolledTooltip>
								</Button>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	const removeGamecolumns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'casinoGameId',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
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
				disableSortBy: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTIONS',
				accessor: '',
				disableSortBy: true,
				Cell: ({ cell }) => {
					const casinoGameId = cell?.row?.original?.casinoGameId;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
								<Button
									type="button"
									className="btn btn-sm btn-soft-danger"
									onClick={(e) => {
										e.preventDefault();
										handleRemoveGame(casinoGameId);
									}}
								>
									<i
										className="mdi mdi-minus-box"
										id={`minus-${casinoGameId}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`minus-${casinoGameId}`}
									>
										Remove this Game
									</UncontrolledTooltip>
								</Button>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		itemsPerPage,
		setItemsPerPage,
		removedGamesCurrentPage,
		setRemovedGamesCurrentPage,
		removedGamesItemsPerPage,
		setRemovedGamesItemsPerPage,
		removeGamecolumns,
		onChangeRowsPerPage,
		onChangeRemoveGamesRowsPerPage,
		selectedGames,
		removeAddedGames,
		columns,
		formattedGames,
		totalGamesCount: subCategoryAddedGames?.count || 0,
		isSubCategoryAddedGamesLoading,
	};
};

export default useRemoveAddedGames;
