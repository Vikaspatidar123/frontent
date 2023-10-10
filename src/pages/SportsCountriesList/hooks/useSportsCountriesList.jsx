import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsCountries } from '../../../store/actions';

const itemsPerPage = 10;

const useSportsCountriesListing = () => {
	const { sportsCountries, isSportsCountriesLoading } = useSelector(
		(state) => state.sportsList
	);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [searchByName, setSearchByName] = useState('');
	const [searchByStatus, setSearchByStatus] = useState('');
	const dispatch = useDispatch();

	const formattedSportsCountries = useMemo(() => {
		if (sportsCountries) {
			return sportsCountries?.rows?.map((item) => ({
				...item,
				countryName: item.countryName[0].name,
				icons: '-',
			}));
		}
		return [];
	}, [sportsCountries]);

	const fetchData = () => {
		let isActive = '';
		if (searchByStatus === '1') {
			isActive = 'true';
		} else if (searchByStatus === '0') {
			isActive = 'false';
		}
		dispatch(
			getSportsCountries({
				limit,
				pageNo: page,
				searchByName,
				isActive,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, searchByName, searchByStatus]);

	return {
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportsCountriesCount: sportsCountries?.count,
		page,
		setPage,
		itemsPerPage,
		limit,
		setLimit,
		searchByName,
		setSearchByName,
		searchByStatus,
		setSearchByStatus,
	};
};

export default useSportsCountriesListing;
