import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersStart } from '../../../store/actions';

const usePlayersListing = () => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);

	useEffect(() => {
		dispatch(
			fetchPlayersStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText, itemsPerPage]);

	const formattedPlayers = useMemo(() => {
		const formattedValues = [];
		if (players) {
			players.rows.map((player) =>
				formattedValues.push({
					...player,
					fullName: `${player.firstName} ${player.lastName}`,
					status: player.isActive ? 'Active' : 'In-Active',
					isInternal: player.isInternalUser ? 'YES' : 'NO',
				})
			);
		}
		return formattedValues;
	}, [players]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalPlayersCount: players?.count,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default usePlayersListing;
