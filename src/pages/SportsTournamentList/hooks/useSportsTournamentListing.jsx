import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsTournamentList } from '../../../store/actions';

const itemsPerPage = 10;

const useSportsTounamentListing = () => {
	const { sportsTournamentList, isSportsTournamentListLoading } = useSelector(
		(state) => state.sportsList
	);

	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [searchByName, setSearchByName] = useState('');
	const [searchByCountry, setSearchByCountry] = useState('');
	const [searchBySports, setSearchBySports] = useState('');
	const dispatch = useDispatch();

	const formattedSportsTournamenList = useMemo(() => {
		if (sportsTournamentList) {
			return sportsTournamentList?.rows?.map((item) => ({
				...item,
				tournamentName: item?.tournamentName[0]?.name,
				countryName: item?.country?.countryName[0]?.name,
				sportName: item.sports?.sportName[0].name,
			}));
		}
		return [];
	}, [sportsTournamentList]);

	useEffect(() => {
		dispatch(
			getSportsTournamentList({
				limit,
				pageNo: page,
				providerCountryId: searchByCountry,
				providerSportId: searchBySports,
				search: searchByName,
			})
		);
	}, [page, limit, searchByName, searchByCountry, searchBySports]);

	return {
		formattedSportsTournamenList,
		isSportsTournamentListLoading,
		totalSportsTounamentListCount: sportsTournamentList?.totalPage,
		page,
		setPage,
		itemsPerPage,
		limit,
		setLimit,
		searchByName,
		setSearchByName,
		searchByCountry,
		setSearchByCountry,
		searchBySports,
		setSearchBySports,
	};
};

export default useSportsTounamentListing;
