import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSportsList } from '../../../store/actions';

const itemsPerPage = 10;

const useSportsListing = () => {
	const { sportsListInfo, isSportsListLoading } = useSelector(
		(state) => state.SportsList
	);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [searchByName, setSearchByName] = useState('');
	const [searchByStatus, setSearchByStatus] = useState('');
	const dispatch = useDispatch();

	const formattedSportsList = useMemo(() => {
		if (sportsListInfo) {
			return sportsListInfo?.rows?.map((item) => ({
				...item,
				sportName: item.sportName[0].name,
				icons: '-',
			}));
		}
		return [];
	}, [sportsListInfo]);

	const fetchData = () => {
		let isActive = '';
		if (searchByStatus === '1') {
			isActive = 'true';
		} else if (searchByStatus === '0') {
			isActive = 'false';
		}
		dispatch(
			getSportsList({
				limit,
				pageNo: page,
				search: searchByName,
				isActive,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, limit, searchByName, searchByStatus]);

	return {
		formattedSportsList,
		isSportsListLoading,
		totalSportsListCount: sportsListInfo?.count,
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

export default useSportsListing;
