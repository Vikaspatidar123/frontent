import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSportsMatchesStart } from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';

const useSportsMatchesListing = () => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { sportsMatches, loading: isSportsMatchesLoading } = useSelector(
		(state) => state.SportsMatches
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchSportsMatchesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				search: searchText,
			})
		);
	}, [currentPage, searchText, itemsPerPage]);

	const formattedSportsMatches = useMemo(() => {
		const formattedValues = [];
		if (sportsMatches) {
			sportsMatches.rows.map((match) =>
				formattedValues.push({
					...match,
					title: `${match?.teams?.[0]?.team?.teamName?.[0]?.name} vs ${match?.teams?.[1]?.team?.teamName?.[0]?.name}`,
					tournamentName: match.tournaments.tournamentName[0].name,
					sportName: match.sportCountry.sport.sportName[0].name,
					startDate: getDateTime(match.matchDate),
				})
			);
		}
		return formattedValues;
	}, [sportsMatches]);

	return {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalSportsMatchesCount: sportsMatches?.totalPage,
		isSportsMatchesLoading,
		formattedSportsMatches,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useSportsMatchesListing;
