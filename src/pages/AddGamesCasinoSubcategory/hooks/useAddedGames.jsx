/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { KeyValueCell, Status } from '../GamesListCol';
import { getAddedGamesInSubCategoryStart } from '../../../store/actions';
import { selectedLanguage } from '../../../constants/config';

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
					casinoSubCategoryId: gameSubCategoryId,
					perPage: itemsPerPage,
					page: currentPage,
				})
			);
		}
	}, [gameSubCategoryId, currentPage, itemsPerPage]);

	const formattedGames = useMemo(() => {
		if (subCategoryAddedGames?.games?.length) {
			return subCategoryAddedGames?.games?.map((game) => ({
				...game,
				providerName: game?.casinoProvider?.name?.[selectedLanguage],
				name: game.name[selectedLanguage],
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
			accessor: 'id',
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
		totalGamesCount: subCategoryAddedGames?.totalPages || 0,
		isSubCategoryAddedGamesLoading,
		onChangeRowsPerPage,
	};
};

export default useAddedGames;
