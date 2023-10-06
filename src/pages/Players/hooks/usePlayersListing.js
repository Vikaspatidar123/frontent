import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersStart } from '../../../store/actions';

const itemsPerPage = 10;

const usePlayersListing = () => {
	const dispatch = useDispatch();
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
	}, [currentPage, searchText]);

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

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalPlayersCount: players?.count,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
	};
};

export default usePlayersListing;
