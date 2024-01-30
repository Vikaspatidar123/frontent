/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { KeyValueCell, Status } from '../GamesListCol';
import { getAddedGamesInSubCategoryStart } from '../../../store/actions';

const useAddedGames = () => {
	const dispatch = useDispatch();
	const { gameSubCategoryId } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const { subCategoryAddedGames, isSubCategoryAddedGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	useEffect(() => {
		if (gameSubCategoryId) {
			dispatch(
				getAddedGamesInSubCategoryStart({
					casinoCategoryId: gameSubCategoryId,
					limit: itemsPerPage,
					pageNo: currentPage,
				})
			);
		}
	}, [gameSubCategoryId, currentPage, itemsPerPage]);

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

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const columns = useMemo(() => [
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
	]);

	return {
		currentPage,
		setCurrentPage,
		itemsPerPage,
		setItemsPerPage,
		columns,
		formattedGames,
		totalGamesCount: subCategoryAddedGames?.count || 0,
		isSubCategoryAddedGamesLoading,
		onChangeRowsPerPage,
	};
};

export default useAddedGames;
