import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
	addGameToCategoryStart,
	getCasinoGamesStart,
} from '../../../store/actions';
import { showToastr } from '../../../utils/helpers';
import { selectedLanguage } from '../../../constants/config';

const useAddGamesToCasinoCategory = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { categoryId } = useParams();
	const [newGamesData, setNewGamesData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [newGamepageNo, setNewGamepageNo] = useState(1);
	const [newGameItemsPerPage, setNewGameItemsPerPage] = useState(10);

	const { casinoGames, isCasinoGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	useEffect(() => {
		if (categoryId) {
			dispatch(
				getCasinoGamesStart({
					perPage: itemsPerPage,
					page: pageNo,
					casinoCategoryId: categoryId,
					notIncluded: true,
				})
			);
		}
	}, [categoryId, pageNo, itemsPerPage]);

	const formattedGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.games?.map((game) => ({
				...game,
				name: game?.name?.[selectedLanguage],
				devices: game.devices.join(', '),
				providerName: game?.casinoProvider?.name?.[selectedLanguage],
			}));
		}
		return [];
	}, [casinoGames]);

	const handleAddGame = (e, row) => {
		e.preventDefault();

		setNewGamesData((prevData) => {
			if (!prevData.find((game) => game.id === row.id)) {
				return [...prevData, row];
			}
			showToastr({
				message: 'Game already added',
				type: 'error',
			});
			return prevData;
		});
	};

	const handleRemoveGame = (e, id) => {
		e.preventDefault();

		setNewGamesData((prevData) => prevData.filter((game) => game.id !== id));
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
				addGameToCategoryStart({
					categoryId,
					gameIds: newGamesData?.map((game) => game.id),
					navigate,
				})
			);
		}
	};

	return {
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

export default useAddGamesToCasinoCategory;
