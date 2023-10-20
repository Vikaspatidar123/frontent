import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsCountries, updateStatusStart } from '../../../store/actions';

const useSportsCountriesListing = () => {
	const { sportsCountries, isSportsCountriesLoading } = useSelector(
		(state) => state.SportsList
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [page, setPage] = useState(1);
	const [searchByName, setSearchByName] = useState('');
	const [searchByStatus, setSearchByStatus] = useState('');
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

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
				limit: itemsPerPage,
				pageNo: page,
				searchByName,
				isActive,
			})
		);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: status, countryId: sportCountryId } = props;
		dispatch(
			updateStatusStart({
				code: 'SPORTCONTRY',
				status: !status,
				sportCountryId,
				limit: itemsPerPage,
				pageNo: page,
				search: searchByName,
			})
		);
		setActive((prev) => !prev);
	};

	useEffect(() => {
		fetchData();
	}, [itemsPerPage, page, searchByName, searchByStatus, active]);

	return {
		formattedSportsCountries,
		isSportsCountriesLoading,
		totalSportsCountriesCount: sportsCountries?.count,
		page,
		setPage,
		itemsPerPage,
		searchByName,
		setSearchByName,
		searchByStatus,
		setSearchByStatus,
		handleStatus,
		active,
		setActive,
		onChangeRowsPerPage,
	};
};

export default useSportsCountriesListing;
