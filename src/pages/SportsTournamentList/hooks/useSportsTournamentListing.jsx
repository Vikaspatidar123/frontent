import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsTournamentList } from '../../../store/actions';

const useSportsTounamentListing = () => {
	const { sportsTournamentList, isSportsTournamentListLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};
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
				limit: itemsPerPage,
				pageNo: page,
				providerCountryId: searchByCountry,
				providerSportId: searchBySports,
				search: searchByName,
			})
		);
	}, [page, itemsPerPage, searchByName, searchByCountry, searchBySports]);

	return {
		formattedSportsTournamenList,
		isSportsTournamentListLoading,
		totalSportsTounamentListCount: sportsTournamentList?.totalPage,
		page,
		setPage,
		itemsPerPage,
		searchByName,
		setSearchByName,
		searchByCountry,
		setSearchByCountry,
		searchBySports,
		setSearchBySports,
		onChangeRowsPerPage,
	};
};

export default useSportsTounamentListing;
