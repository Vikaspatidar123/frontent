import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
	addGameToSubCategoryStart,
	getCasinoGamesStart,
} from '../../../store/actions';
import { showToastr } from '../../../utils/helpers';

const useCasinoAddGame = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { gameSubCategoryId } = useParams();
	const [newGamesData, setNewGamesData] = useState([]);
	const [limit, setLimit] = useState(10);
	const [pageNo, setPageNo] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [newGamepageNo, setNewGamepageNo] = useState(1);
	const [newGameItemsPerPage, setNewGameItemsPerPage] = useState(10);

	const { casinoGames, isCasinoGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	useEffect(() => {
		if (gameSubCategoryId) {
			dispatch(
				getCasinoGamesStart({
					limit,
					pageNo,
					gameSubCategoryId,
				})
			);
		}
	}, [gameSubCategoryId, limit, pageNo, itemsPerPage]);

	const formattedGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.games?.map((game) => ({
				...game,
				devices: game.devices.join(', '),
			}));
		}
		return [];
	}, [casinoGames]);

	const handleAddGame = (e, row) => {
		e.preventDefault();

		setNewGamesData((prevData) => {
			if (!prevData.find((game) => game.casinoGameId === row.casinoGameId)) {
				return [...prevData, row];
			}
			showToastr({
				message: 'Game already added',
				type: 'error',
			});
			return prevData;
		});
	};

	const handleRemoveGame = (e, casinoGameId) => {
		e.preventDefault();

		setNewGamesData((prevData) =>
			prevData.filter((game) => game.casinoGameId !== casinoGameId)
		);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const onChangeNewGameTableRowsPerPage = (value) => {
		setNewGameItemsPerPage(value);
	};

	const handleSubmitClick = () => {
		if (newGamesData.length) {
			dispatch(
				addGameToSubCategoryStart({
					gameSubCategoryId: parseInt(gameSubCategoryId, 10),
					games: newGamesData?.map((game) => game.casinoGameId),
					navigate,
				})
			);
		}
	};

	return {
		limit,
		setLimit,
		pageNo,
		setPageNo,
		itemsPerPage,
		setItemsPerPage,
		formattedGames,
		isCasinoGamesLoading,
		totalPages: casinoGames?.totalPages,
		onChangeRowsPerPage,
		handleAddGame,
		newGamesData,
		handleRemoveGame,
		newGamepageNo,
		setNewGamepageNo,
		newGameItemsPerPage,
		setNewGameItemsPerPage,
		onChangeNewGameTableRowsPerPage,
		handleSubmitClick,
	};
};

export default useCasinoAddGame;
